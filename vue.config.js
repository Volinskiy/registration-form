module.exports = {
  lintOnSave: false,
  devServer: { port: 8080 },
  configureWebpack: {
    devtool: 'source-map'
  },
  css: {
    sourceMap: false,
  },
};
