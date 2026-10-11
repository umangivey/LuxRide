#!/usr/bin/env python3
"""Download the third-party anime models this project uses into public/models/.

The models are not committed to git: they belong to pixiv (VRoid samples) and
Live2D Inc. (Cubism samples) and are fetched from their public GitHub copies under
those owners' terms. See public/models/CREDITS.md (written by this script).

    python3 scripts/fetch_models.py            # fetch anything missing
    python3 scripts/fetch_models.py --force    # re-download everything
    python3 scripts/fetch_models.py --no-optimize

VRM textures are re-encoded (opaque PNG -> JPEG, large maps capped at 2048 px) so
each avatar loads faster. Needs Pillow for that step; without it the files are kept
as downloaded.
"""

from __future__ import annotations

import io
import json
import struct
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "models"

VRM_SOURCES = {
    # file name in public/models/vrm : source URL
    "hana.vrm": "https://raw.githubusercontent.com/madjin/vrm-samples/master/vroid/stable/AvatarSample_B.vrm",
    "ren.vrm": "https://raw.githubusercontent.com/madjin/vrm-samples/master/vroid/stable/AvatarSample_C.vrm",
    "sora.vrm": "https://raw.githubusercontent.com/madjin/vrm-samples/master/vroid/stable/AvatarSample_A.vrm",
    "mio.vrm": "https://raw.githubusercontent.com/pixiv/three-vrm/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm",
}

LIVE2D_BASE = "https://raw.githubusercontent.com/Live2D/CubismWebSamples/develop/Samples/Resources"
LIVE2D_MODELS = ["Hiyori", "Natori"]

CREDITS = """# Model credits

These files are downloaded by `scripts/fetch_models.py` and are not part of this
repository. Check each owner's terms before shipping a commercial game.

## 3D (VRM)

| File | Model | Owner | Terms |
| --- | --- | --- | --- |
| hana.vrm | VRoid AvatarSample_B | pixiv Inc. (VRoid Project) | VRoid sample model conditions of use: https://vroid.pixiv.help/hc/en-us/articles/4402394424089 |
| ren.vrm | VRoid AvatarSample_C | pixiv Inc. (VRoid Project) | same as above |
| sora.vrm | VRoid AvatarSample_A | pixiv Inc. (VRoid Project) | same as above |
| mio.vrm | VRM1_Constraint_Twist_Sample | pixiv Inc. | VRM Public License 1.0: https://vrm.dev/licenses/1.0/ |

Embedded VRM metadata for the VRoid samples: avatar use by everyone, commercial use
allowed. The pixiv VRM 1.0 sample allows redistribution and modification, credit not
required.

## 2.5D (Live2D Cubism)

| Folder | Model | Owner | Terms |
| --- | --- | --- | --- |
| live2d/Hiyori | Hiyori Momose | Live2D Inc. | Free Material License: https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html |
| live2d/Natori | Natori | Live2D Inc. | same as above |

The Live2D Cubism Core runtime (npm package `@hazart-pkg/live2d-core`, bundled at build
time) is Live2D "Redistributable Code" under the Live2D Proprietary Software License. Businesses with
annual revenue of 10 million JPY or more need a Cubism SDK Release License.
"""


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": "anime-characters-fetch/1.0"})
    with urllib.request.urlopen(req, timeout=120) as r:
        return r.read()


def optimize_glb(data: bytes, max_size: int = 2048, quality: int = 88) -> bytes:
    """Re-encode embedded textures of a GLB/VRM. Keeps every extension untouched."""
    try:
        from PIL import Image
    except ImportError:
        print("  (Pillow not installed, skipping texture optimization)")
        return data

    magic, version, _length = struct.unpack("<III", data[:12])
    if magic != 0x46546C67:
        return data
    json_len, json_type = struct.unpack("<II", data[12:20])
    gltf = json.loads(data[20 : 20 + json_len])
    pos = 20 + json_len
    bin_len, _bin_type = struct.unpack("<II", data[pos : pos + 8])
    binary = data[pos + 8 : pos + 8 + bin_len]

    views = gltf["bufferViews"]
    image_views = {img["bufferView"]: i for i, img in enumerate(gltf.get("images", [])) if "bufferView" in img}

    # Rebuild the binary chunk view by view, swapping in re-encoded images.
    new_bin = bytearray()
    saved = 0
    for vi, view in enumerate(views):
        start = view.get("byteOffset", 0)
        chunk = binary[start : start + view["byteLength"]]
        if vi in image_views:
            img_index = image_views[vi]
            try:
                im = Image.open(io.BytesIO(chunk))
                im.load()
                has_alpha = im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info)
                if has_alpha and im.mode != "RGBA":
                    im = im.convert("RGBA")
                if has_alpha:
                    alpha = im.getchannel("A")
                    if alpha.getextrema()[0] == 255:
                        has_alpha = False
                if max(im.size) > max_size:
                    im.thumbnail((max_size, max_size), Image.LANCZOS)
                buf = io.BytesIO()
                if has_alpha:
                    im.save(buf, "PNG", optimize=True)
                    mime = "image/png"
                else:
                    im.convert("RGB").save(buf, "JPEG", quality=quality, optimize=True)
                    mime = "image/jpeg"
                if buf.tell() < len(chunk):
                    saved += len(chunk) - buf.tell()
                    chunk = buf.getvalue()
                    gltf["images"][img_index]["mimeType"] = mime
            except Exception as exc:  # keep the original bytes if anything goes wrong
                print(f"  texture {img_index}: kept original ({exc})")
        while len(new_bin) % 4:
            new_bin.append(0)
        view["byteOffset"] = len(new_bin)
        view["byteLength"] = len(chunk)
        new_bin.extend(chunk)
    while len(new_bin) % 4:
        new_bin.append(0)
    gltf["buffers"][0]["byteLength"] = len(new_bin)

    js = json.dumps(gltf, separators=(",", ":")).encode()
    js += b" " * ((4 - len(js) % 4) % 4)
    out = bytearray()
    total = 12 + 8 + len(js) + 8 + len(new_bin)
    out += struct.pack("<III", magic, version, total)
    out += struct.pack("<II", len(js), json_type) + js
    out += struct.pack("<II", len(new_bin), 0x004E4942) + new_bin
    print(f"  textures: saved {saved / 1e6:.1f} MB")
    return bytes(out)


def live2d_files(model3: dict) -> list[str]:
    refs = model3["FileReferences"]
    files = [refs["Moc"], *refs.get("Textures", [])]
    for key in ("Physics", "Pose", "UserData", "DisplayInfo"):
        if refs.get(key):
            files.append(refs[key])
    for exp in refs.get("Expressions", []) or []:
        files.append(exp["File"])
    for group in (refs.get("Motions") or {}).values():
        for m in group:
            files.append(m["File"])
            if m.get("Sound"):
                files.append(m["Sound"])
    return files


def main() -> int:
    force = "--force" in sys.argv
    optimize = "--no-optimize" not in sys.argv

    vrm_dir = OUT / "vrm"
    vrm_dir.mkdir(parents=True, exist_ok=True)
    for name, url in VRM_SOURCES.items():
        dest = vrm_dir / name
        if dest.exists() and not force:
            print(f"ok   {dest.relative_to(ROOT)}")
            continue
        print(f"get  {url}")
        data = fetch(url)
        if optimize:
            data = optimize_glb(data)
        dest.write_bytes(data)
        print(f"     -> {dest.relative_to(ROOT)} ({len(data) / 1e6:.1f} MB)")

    for model in LIVE2D_MODELS:
        mdir = OUT / "live2d" / model
        manifest = mdir / f"{model}.model3.json"
        if manifest.exists() and not force:
            print(f"ok   {manifest.relative_to(ROOT)}")
            continue
        mdir.mkdir(parents=True, exist_ok=True)
        raw = fetch(f"{LIVE2D_BASE}/{model}/{model}.model3.json")
        model3 = json.loads(raw)
        for rel in live2d_files(model3):
            target = mdir / rel
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(fetch(f"{LIVE2D_BASE}/{model}/{rel}"))
        manifest.write_bytes(raw)
        print(f"     -> {mdir.relative_to(ROOT)} ({len(live2d_files(model3))} files)")

    (OUT / "CREDITS.md").write_text(CREDITS)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
