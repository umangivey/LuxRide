#!/usr/bin/env python3
"""Turn the Vite build in dist-artifact/ into a single self-contained page.

Run via `npm run artifact` (which builds with `vite build --mode artifact` first).
The page inlines the CSS and the bundled JS, keeps the Google Fonts link, and drops
the <html>/<head>/<body> wrapper so it can be hosted as a claude.ai Artifact.
Model files stay as separate files under dist-artifact/models/.
"""

from __future__ import annotations

import base64
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist-artifact"


def main() -> int:
    index = DIST / "index.html"
    if not index.exists():
        print("dist-artifact/index.html not found; run `vite build --mode artifact` first", file=sys.stderr)
        return 1
    html = index.read_text(encoding="utf-8")

    title = re.search(r"<title>.*?</title>", html, re.S).group(0)
    font_links = re.findall(r'<link[^>]+fonts\.(?:googleapis|gstatic)\.com[^>]*>', html)
    css_hrefs = re.findall(r'<link rel="stylesheet"[^>]*href="(\./assets/[^"]+\.css)"[^>]*>', html)
    js_srcs = re.findall(r'<script type="module"[^>]*src="(\./assets/[^"]+\.js)"[^>]*></script>', html)
    body = re.search(r"<body>(.*)</body>", html, re.S).group(1)
    body = re.sub(r'<script type="module"[^>]*src="[^"]+"[^>]*></script>', "", body).strip()

    css = "\n".join((DIST / href).read_text(encoding="utf-8") for href in css_hrefs)
    js = "\n".join((DIST / src).read_text(encoding="utf-8") for src in js_srcs)
    # Keep the HTML parser from ending the inline script early.
    js = js.replace("</script", "<\\/script").replace("<!--", "<\\!--")

    page = "\n".join(
        [
            title,
            *font_links,
            f"<style>\n{css}\n</style>",
            body,
            f'<script type="module">\n{js}\n</script>',
            "",
        ]
    )
    out = DIST / "artifact.html"
    out.write_text(page, encoding="utf-8")
    print(f"wrote {out.relative_to(ROOT)} ({len(page) / 1e6:.2f} MB)")

    # Artifacts only serve web file types, so ship each VRM as base64 in a .json file.
    for vrm in sorted((DIST / "models" / "vrm").glob("*.vrm")):
        target = vrm.with_name(vrm.name + ".json")
        target.write_text(json.dumps({"format": "vrm", "base64": base64.b64encode(vrm.read_bytes()).decode()}))
        print(f"  asset {target.relative_to(DIST)} ({target.stat().st_size / 1e6:.1f} MB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
