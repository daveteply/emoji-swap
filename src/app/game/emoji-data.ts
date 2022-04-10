export interface EmojiModel {
  code: string;
  title: string;
}
export interface EmojiLevel {
  level: number;
  title: string;
  emojis: EmojiModel[];
}

export interface EmojiLevelList {
  list: EmojiLevel[];
}

export const EmojiList: EmojiLevelList = {
  list: [
    {
      level: 1,
      title: 'Emojis!',
      emojis: [
        { code: '1F600', title: 'grinning face' },
        { code: '1F607', title: 'smiling face with halo' },
        { code: '1F60D', title: 'smiling face with heart-eyes' },
        { code: '1F92A', title: 'zany face' },
        { code: '1F923', title: 'rolling on the floor laughing' },
        { code: '1F60E', title: 'smiling face with sunglasses' },
      ],
    },
    {
      level: 2,
      title: 'More faces',
      emojis: [
        { code: '1F913', title: 'nerd face' },
        { code: '1F9D0', title: 'face with monocle' },
        { code: '1F632', title: 'astonished face' },
        { code: '1F608', title: 'smiling face with horns' },
        { code: '1F911', title: 'money-mouth face' },
        { code: '1F973', title: 'partying face' },
      ],
    },
    {
      level: 3,
      title: 'Costumes',
      emojis: [
        { code: '1F47A', title: 'goblin' },
        { code: '1F920', title: 'cowboy hat face' },
        { code: '1F921', title: 'clown face' },
        { code: '1F47B', title: 'ghost' },
        { code: '1F47D', title: 'alien' },
        { code: '1F916', title: 'robot' },
      ],
    },
    {
      level: 4,
      title: 'Ground Transport',
      emojis: [
        { code: '1F694', title: 'oncoming police car' },
        { code: '1F699', title: 'sport utility vehicle' },
        { code: '1F68D', title: 'oncoming bus' },
        { code: '26FD', title: 'fuel pump' },
        { code: '1F6A7', title: 'construction' },
        { code: '1F6A5', title: 'horizontal traffic light' },
      ],
    },
    {
      level: 5,
      title: 'Sky',
      emojis: [
        { code: '1F319', title: 'crescent moon' },
        { code: '1F31E', title: 'sun with face' },
        { code: '1F320', title: 'shooting star' },
        { code: '1FA90', title: 'ringed planet' },
        { code: '1F308', title: 'rainbow' },
        { code: '1F30C', title: 'milky way' },
      ],
    },
  ],
};
