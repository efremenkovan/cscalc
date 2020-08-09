import { Rank } from '../models/Rank';
import { FaceItEloRange, FaceItRank } from '../models/FaceItRank';

export const ranks: Rank[] = [
  {
    id: 0,
    name: 'Серебро - |',
    value: {
      matchMaking: 0,
      wingman: 0,
    },
    matchMakingImage: '/assets/ranks/silver-1.jpg',
    wingmanImage: '/assets/wingman/silver-1.webp',
  },
  {
    id: 1,
    name: 'Серебро - ||',
    value: {
      matchMaking: 170,
      wingman: 125,
    },
    matchMakingImage: '/assets/ranks/silver-2.jpg',
    wingmanImage: '/assets/wingman/silver-2.webp',
  },
  {
    id: 2,
    name: 'Серебро - |||',
    value: {
      matchMaking: 170,
      wingman: 125,
    },
    matchMakingImage: '/assets/ranks/silver-3.jpg',
    wingmanImage: '/assets/wingman/silver-3.png',
  },
  {
    id: 3,
    name: 'Серебро - |V',
    value: {
      matchMaking: 170,
      wingman: 125,
    },
    matchMakingImage: '/assets/ranks/silver-4.jpg',
    wingmanImage: '/assets/wingman/silver-4.webp',
  },
  {
    id: 4,
    name: 'Серебро - Элита',
    value: {
      matchMaking: 170,
      wingman: 125,
    },
    matchMakingImage: '/assets/ranks/silver-5.jpg',
    wingmanImage: '/assets/wingman/silver-5.png',
  },
  {
    id: 5,
    name: 'Серебро - Великий Магистр',
    value: {
      matchMaking: 170,
      wingman: 125,
    },
    matchMakingImage: '/assets/ranks/silver-6.jpg',
    wingmanImage: '/assets/wingman/silver-6.webp',
  },
  {
    id: 6,
    name: 'Золотая звезда - |',
    value: {
      matchMaking: 270,
      wingman: 200,
    },
    matchMakingImage: '/assets/ranks/gn-1.jpg',
    wingmanImage: '/assets/wingman/gn-1.webp',
  },
  {
    id: 7,
    name: 'Золотая звезда - ||',
    value: {
      matchMaking: 270,
      wingman: 200,
    },
    matchMakingImage: '/assets/ranks/gn-2.jpg',
    wingmanImage: '/assets/wingman/gn-2.webp',
  },
  {
    id: 8,
    name: 'Золотая звезда - |||',
    value: {
      matchMaking: 270,
      wingman: 200,
    },
    matchMakingImage: '/assets/ranks/gn-3.jpg',
    wingmanImage: '/assets/wingman/gn-3.png',
  },
  {
    id: 9,
    name: 'Золотая звезда - Магистр',
    value: {
      matchMaking: 270,
      wingman: 200,
    },
    matchMakingImage: '/assets/ranks/gn-4.jpg',
    wingmanImage: '/assets/wingman/gn-4.webp',
  },
  {
    id: 10,
    name: 'Магистр-Хранитель - |',
    value: {
      matchMaking: 350,
      wingman: 260,
    },
    matchMakingImage: '/assets/ranks/ak-1.jpg',
    wingmanImage: '/assets/wingman/ak-1.png',
  },
  {
    id: 11,
    name: 'Магистр-Хранитель - ||',
    value: {
      matchMaking: 350,
      wingman: 260,
    },
    matchMakingImage: '/assets/ranks/ak-2.jpg',
    wingmanImage: '/assets/ranks/ak-2.png',
  },
  {
    id: 12,
    name: 'Магистр-Хранитель - Элита',
    value: {
      matchMaking: 350,
      wingman: 260,
    },
    matchMakingImage: '/assets/ranks/ak-3.jpg',
    wingmanImage: '/assets/wingman/ak-3.png',
  },
  {
    id: 13,
    name: 'Заслуженный Магистр-Хранитель',
    value: {
      matchMaking: 400,
      wingman: 335,
    },
    matchMakingImage: '/assets/ranks/bs.jpg',
    wingmanImage: '/assets/wingman/bs.webp',
  },
  {
    id: 14,
    name: 'Легендарный Беркут',
    value: {
      matchMaking: 650,
      wingman: 485,
    },
    matchMakingImage: '/assets/ranks/le.jpg',
    wingmanImage: '/assets/wingman/le.webp',
  },
  {
    id: 15,
    name: 'Легендарный Беркут-Магистр ',
    value: {
      matchMaking: 850,
      wingman: 635,
    },
    matchMakingImage: '/assets/ranks/lem.jpg',
    wingmanImage: '/assets/wingman/lem.webp',
  },
  {
    id: 16,
    name: 'Великий Магистр высшего ранга',
    value: {
      matchMaking: 1270,
      wingman: 950,
    },
    matchMakingImage: '/assets/ranks/sup.jpg',
    wingmanImage: '/assets/wingman/sup.webp',
  },
  {
    id: 17,
    name: 'Всемирная Элина',
    value: {
      matchMaking: 1790,
      wingman: 1340,
    },
    matchMakingImage: '/assets/ranks/glob.jpg',
    wingmanImage: '/assets/wingman/glob.webp',
  },
];

export const faceItRanks: FaceItRank[] = [
  {
    id: 0,
    name: '1 Уровень',
    image: '/assets/faceIt/ELO_1.webp',
    value: 122,
    from: 0,
    to: 800,
  },
  {
    id: 1,
    name: '2 Уровень',
    image: '/assets/faceIt/ELO_2.webp',
    value: 122,
    from: 801,
    to: 950,
  },
  {
    id: 2,
    name: '3 Уровень',
    image: '/assets/faceIt/ELO_3.webp',
    value: 172,
    from: 951,
    to: 1100,
  },
  {
    id: 3,
    name: '4 Уровень',
    image: '/assets/faceIt/ELO_4.webp',
    value: 172,
    from: 1101,
    to: 1250,
  },
  {
    id: 4,
    name: '5 Уровень',
    image: '/assets/faceIt/ELO_5.webp',
    value: 172,
    from: 1251,
    to: 1400,
  },
  {
    id: 5,
    name: '6 Уровень',
    image: '/assets/faceIt/ELO_6.webp',
    value: 172,
    from: 1401,
    to: 1550,
  },
  {
    id: 6,
    name: '7 Уровень',
    image: '/assets/faceIt/ELO_7.webp',
    value: 247,
    from: 1551,
    to: 1700,
  },
  {
    id: 7,
    name: '8 Уровень',
    image: '/assets/faceIt/ELO_8.webp',
    value: 247,
    from: 1701,
    to: 1850,
  },
  {
    id: 8,
    name: '9 Уровень',
    image: '/assets/faceIt/ELO_9.webp',
    value: 247,
    from: 1851,
    to: 2000,
  },
  {
    id: 9,
    name: '10 Уровень',
    image: '/assets/faceIt/ELO_10.webp',
    from: 2001,
    to: 4100,
    value: null
  },
];

export const faceItEloRanges: FaceItEloRange[] = [
  {
    from: 0,
    to: 999,
    value: 3.26
  },
  {
    from: 1000,
    to: 1799,
    value: 4.6
  },
  {
    from: 1800,
    to: 2000,
    value: 9
  },
  {
    from: 2000,
    to: 4100,
    value: 16.6
  },
];
