const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/subjects/' : '/',
  chainWebpack: (config) => {
    config.module.rule('markdown').test(/\.md$/).use('raw-loader').loader('raw-loader').end();
  },
});
