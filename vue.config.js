const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  chainWebpack: (config) => {
    config.module.rule('markdown').test(/\.md$/).use('raw-loader').loader('raw-loader').end();
  },
  pwa: {
    name: 'Personal', // The name of your app
    themeColor: '#4DBA87', // The theme color for your app
    msTileColor: '#000000', // For Microsoft devices
    manifestOptions: {
      short_name: 'Pers', // Short name for the app (on the home screen)
      start_url: '/', // The start URL for your app
      background_color: '#ffffff', // Background color for your app
      display: 'standalone', // To make the app feel like a native app
      icons: [
        {
          src: 'img/icons/android-chrome-192x192.png', // Path to icon for mobile devices
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'img/icons/android-chrome-512x512.png', // Larger icon
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workboxOptions: {
      skipWaiting: true, // Update service worker without waiting
      clientsClaim: true, // Take control of the page as soon as it loads
    },
  },
});
