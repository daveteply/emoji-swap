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
      title: 'Fun Emojis!',
      emojis: [
        {
          code: '1F60E',
          title: 'smiling face with sunglasses',
        },
        { code: '1F63A', title: 'grinning cat' },
        { code: '1F43A', title: 'wolf' },
        { code: '1F42C', title: 'dolphin' },
        { code: '1F3E1', title: 'house with garden' },
        { code: '1F9C7', title: 'waffle' },
      ],
    },
    {
      level: 2,
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
      level: 3,
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
