export interface AnimeCharacterData {
  id: string;
  name: string;
  series: string;
  imageUrl: string;
  animationClass: string;
  color: string;
  seriesColor: string;
}

export const animeCharacters: AnimeCharacterData[] = [
  {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    series: 'Naruto',
    imageUrl: '/assets/generated/naruto-uzumaki-avatar.dim_128x128.png',
    animationClass: 'anim-naruto',
    color: '#f97316',
    seriesColor: 'oklch(0.65 0.18 55)',
  },
  {
    id: 'sasuke',
    name: 'Sasuke Uchiha',
    series: 'Naruto',
    imageUrl: '/assets/generated/sasuke-uchiha-avatar.dim_128x128.png',
    animationClass: 'anim-sasuke',
    color: '#6366f1',
    seriesColor: 'oklch(0.65 0.18 55)',
  },
  {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    series: 'One Piece',
    imageUrl: '/assets/generated/luffy-avatar.dim_128x128.png',
    animationClass: 'anim-luffy',
    color: '#ef4444',
    seriesColor: 'oklch(0.60 0.20 25)',
  },
  {
    id: 'zoro',
    name: 'Roronoa Zoro',
    series: 'One Piece',
    imageUrl: '/assets/generated/zoro-avatar.dim_128x128.png',
    animationClass: 'anim-zoro',
    color: '#22c55e',
    seriesColor: 'oklch(0.60 0.20 25)',
  },
  {
    id: 'ichigo',
    name: 'Ichigo Kurosaki',
    series: 'Bleach',
    imageUrl: '/assets/generated/ichigo-avatar.dim_128x128.png',
    animationClass: 'anim-ichigo',
    color: '#f59e0b',
    seriesColor: 'oklch(0.55 0.15 270)',
  },
  {
    id: 'rukia',
    name: 'Rukia Kuchiki',
    series: 'Bleach',
    imageUrl: '/assets/generated/rukia-avatar.dim_128x128.png',
    animationClass: 'anim-rukia',
    color: '#a855f7',
    seriesColor: 'oklch(0.55 0.15 270)',
  },
  {
    id: 'goku',
    name: 'Son Goku',
    series: 'Dragon Ball',
    imageUrl: '/assets/generated/goku-avatar.dim_128x128.png',
    animationClass: 'anim-goku',
    color: '#3b82f6',
    seriesColor: 'oklch(0.62 0.22 35)',
  },
  {
    id: 'vegeta',
    name: 'Vegeta',
    series: 'Dragon Ball',
    imageUrl: '/assets/generated/vegeta-avatar.dim_128x128.png',
    animationClass: 'anim-vegeta',
    color: '#8b5cf6',
    seriesColor: 'oklch(0.62 0.22 35)',
  },
];

export const seriesBadgeColors: Record<string, { bg: string; text: string; border: string }> = {
  Naruto: {
    bg: 'oklch(0.65 0.18 55 / 0.2)',
    text: 'oklch(0.75 0.18 60)',
    border: 'oklch(0.65 0.18 55 / 0.4)',
  },
  'One Piece': {
    bg: 'oklch(0.55 0.20 25 / 0.2)',
    text: 'oklch(0.70 0.20 28)',
    border: 'oklch(0.55 0.20 25 / 0.4)',
  },
  Bleach: {
    bg: 'oklch(0.55 0.15 270 / 0.2)',
    text: 'oklch(0.72 0.15 275)',
    border: 'oklch(0.55 0.15 270 / 0.4)',
  },
  'Dragon Ball': {
    bg: 'oklch(0.62 0.22 35 / 0.2)',
    text: 'oklch(0.75 0.22 38)',
    border: 'oklch(0.62 0.22 35 / 0.4)',
  },
};
