module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@components": "./components",
            "@navigation": "./navigation",
            "@assets": "./assets",
          },
        },
      ],
    ],
  };
};
