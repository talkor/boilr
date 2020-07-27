module.exports = {
  lintOnSave: false,
  pwa: {
    name: 'Boilr',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black-translucent',
    workboxOptions: {
      exclude: [/_redirects/]
    }
  }
};
