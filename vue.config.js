const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      fallback: {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util/'),
      },
    },
  },
  transpileDependencies: true,
});
