'use strict'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
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
    //   // 代理列表
    //   proxy: {
    //     '/api': {
    //       target: 'http://121.40.228.138:3000', // 要代理的域名
    //       changeOrigin: true, // 允许跨域
    //       pathRewrite: {
    //         '^/api': '' // 这个是定义要访问的路径，名字随便写
    //       }
    //     }
    //   }
  }
}
