module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
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
