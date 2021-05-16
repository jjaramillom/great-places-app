module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.ios.js', '.android.js'],
        alias: {
          '@app': './src',
        },
      },
    ],
  ],
};
