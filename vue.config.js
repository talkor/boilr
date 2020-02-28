module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/variables.scss";'
      }
    }
  },
  pwa: {
    name: 'Boilr',
    themeColor: '#4DBA87'
  }
};
