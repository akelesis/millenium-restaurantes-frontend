module.exports = {
  pwa: {
    name: "Millenium Restaurantes",
    themeColor: "#1e43be",
    msTileColor: "#000000",
    icons: [
      {
        'src': 'assets/logo-millenium-erp.png',
        'sizes': '192x192',
        'type': 'image/png'
      }
    ],
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "public/service-worker.js",
      exclude: /\.js/
    }
  }
};
