'use strict'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/cloudmusic/'
    : './',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'didi',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  devServer: {
    open: true,
    port: 5555
  }
}
