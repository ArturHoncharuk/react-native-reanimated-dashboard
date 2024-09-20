export const presets = ['module:@react-native/babel-preset'];

export const plugins = [
  [
    'react-native-reanimated/plugin',
    'module-resolver',
    {
      extensions: [
        '.ios.js',
        '.android.js',
        '.ios.jsx',
        '.android.jsx',
        '.js',
        '.jsx',
        '.json',
        '.ts',
        '.tsx',
      ],
      root: ['.'],
      alias: {
        '@': './src',
      },
    },
  ],
];
