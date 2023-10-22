const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
  },
  configureWebpack: (config) => { //调试JS 
    config.devtool = "source-map" }, 
    css: { //查看CSS属于哪个css文件
       sourceMap: true, }, 
});
