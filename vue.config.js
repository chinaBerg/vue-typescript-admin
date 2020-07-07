module.exports = {
  devServer: {
    port: 2219,
    // proxy: {
    //   '/hermes/api/v1/': {
    //     // target: 'http://koubeiapi.dev.1datatech.cn',
    //     target: 'http://192.168.1.209:8084',
    //     changeOrigin: true
    //   },
    //   '/bms/api/v1/': {
    //     // target: 'http://koubeiapi.dev.1datatech.cn',
    //     target: 'http://192.168.1.209:8084',
    //     changeOrigin: true
    //   }
    // }
  },
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        // 让eslint在save时自动fix code
        options.fix = true
        return options
      }).end()
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ]
}
