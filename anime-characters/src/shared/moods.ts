// Facial moods shared by both modes. Each renderer maps a mood onto what its models
// support (VRM expression presets in 3D, Cubism parameters in 2.5D).

export type Mood = 'neutral' | 'happy' | 'joy' | 'wink' | 'relaxed' | 'shy' | 'surprised' | 'sad' | 'angry';

export const MOODS: { id: Mood; label: string; key: string }[] = [
  { id: 'neutral', label: 'Calm', key: '1' },
  { id: 'happy', label: 'Happy', key: '2' },
  { id: 'joy', label: 'Joy', key: '3' },
  { id: 'wink', label: 'Wink', key: '4' },
  { id: 'relaxed', label: 'Relaxed', key: '5' },
  { id: 'shy', label: 'Shy', key: '6' },
  { id: 'surprised', label: 'Surprised', key: '7' },
  { id: 'sad', label: 'Sad', key: '8' },
  { id: 'angry', label: 'Angry', key: '9' },
];
