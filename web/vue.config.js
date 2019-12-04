const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.BASE_URL || '/',
  outputDir: 'dist',
  lintOnSave: true,
  runtimeCompiler: true, // 是否包含编译器
  productionSourceMap: false,
  transpileDependencies: [
    'element-ui-verify/dist', 'element-ui/packages/upload/src'
  ],

  configureWebpack: config => {
    // 配置代码压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        // 生产环境自动删除console
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true,
            },
          },
          sourceMap: false,
          parallel: true,
        })
      )
    }
  },

  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
    // 增加打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{
          analyzerMode: 'static',
        }])
    }
    // config.optimization.minimize(false)

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    // config.module.rules.delete('svg')
    svgRule.test(/\.svg$/)
      .include
      .add(resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 设置一些别名
    config.resolve.alias
      .set('@g', resolve('src/global'))
      .set('@bc', resolve('src/baseComponent'))
      .set('@common', resolve('src/modules/common/views'))
  },

  css: {
    extract: true,
    // loaderOptions: {
    //   sass: {
    //
    //   }
    // }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
