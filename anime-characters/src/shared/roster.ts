// Who can be played. Model files are downloaded by scripts/fetch_models.py into
// public/models (see public/models/CREDITS.md for owners and terms).

export type Gender = 'female' | 'male';

export interface Avatar3D {
  id: string;
  name: string;
  kana: string;
  gender: Gender;
  role: string;
  file: string;
  /** Prop shown during the attack move. */
  weapon: 'katana' | 'wand';
  accent: string;
  credit: string;
}

export const ROSTER_3D: Avatar3D[] = [
  { id: 'hana', name: 'Hana', kana: 'ハナ', gender: 'female', role: 'Star mage', file: 'models/vrm/hana.vrm', weapon: 'wand', accent: '#8E7CE8', credit: 'VRoid AvatarSample_B, pixiv Inc.' },
  { id: 'ren', name: 'Ren', kana: 'レン', gender: 'male', role: 'Blade runner', file: 'models/vrm/ren.vrm', weapon: 'katana', accent: '#D9475C', credit: 'VRoid AvatarSample_C, pixiv Inc.' },
  { id: 'sora', name: 'Sora', kana: 'ソラ', gender: 'female', role: 'Archivist', file: 'models/vrm/sora.vrm', weapon: 'wand', accent: '#2F8F86', credit: 'VRoid AvatarSample_A, pixiv Inc.' },
  { id: 'mio', name: 'Mio', kana: 'ミオ', gender: 'female', role: 'Scout', file: 'models/vrm/mio.vrm', weapon: 'katana', accent: '#C9853A', credit: 'VRM1 sample, pixiv Inc.' },
];

export interface AvatarLive {
  id: string;
  name: string;
  kana: string;
  gender: Gender;
  model: string;
  accent: string;
  credit: string;
  /** Short lines for the talk button. */
  lines: string[];
}

export const ROSTER_LIVE: AvatarLive[] = [
  {
    id: 'hiyori', name: 'Hiyori', kana: 'ひより', gender: 'female', model: 'models/live2d/Hiyori/Hiyori.model3.json', accent: '#E07A9B',
    credit: 'Hiyori Momose, Live2D Inc.',
    lines: ['Welcome back! The cherry trees bloomed while you were away.', 'Want to go on a quest together?', 'Tap my head, I dare you.', 'I packed snacks. Strawberry daifuku, of course.'],
  },
  {
    id: 'natori', name: 'Natori', kana: 'なとり', gender: 'male', model: 'models/live2d/Natori/Natori.model3.json', accent: '#4E6BB8',
    credit: 'Natori, Live2D Inc.',
    lines: ['Good evening. Shall we review the mission briefing?', 'Stay close. The night market gets crowded.', 'I have tea ready, if you have a minute.', 'That was well done. Truly.'],
  },
];
