const path = require('path');

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
    /** 配置Eslint在代码保存时自动fix */
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        // 让eslint在save时自动fix code
        options.fix = true
        return options
      }).end()

    const iconsPath = path.resolve(__dirname, './src/icons');
    config.module
      .rule('svgIcon')
      .test(/\.(svg)(\?.*)?$/)
      .include
      .add(iconsPath)
      .end()
      .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .tap((options) => {
          options = {
            symbolId: 'vtaicon__[name]',
          };
          return options;
        })
      .end()
      .use('svgo-loader')
        .loader('svgo-loader')
        .tap(() => {
          return {
            plugins: [
              { removeXMLNS: true },  // 删除xmlns属性（对于内联svg，默认情况下禁用）
              { convertStyleToAttrs: true },  // 将css样式转换为svg元素属性
              { removeUselessStrokeAndFill: true } // 移除不必要的fill和stroke属性
            ],
          };
        });

    config.module
      .rule('svg')
      .exclude
      .add(iconsPath)
      .end();
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ]
}
