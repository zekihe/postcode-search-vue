const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
//text 非javascript代码打包成一个单独的静态资源文件，有可能做缓存
//webpack4安装的时候
//第一步 npm i extract-text-webpack-plugin@next
//第二步 contenthash 改成 chunkhash 
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({ // 使用vue框架时 必须要用这个插件
    'process.env':{
      NODE_ENV: isDev ? '"development"' : '"production"' // 注意单引号内的双引号 
    }
  }),
  new HTMLWebpackPlugin({
    title: 'VuetodoList',
    template: 'src/index.html'
  })
]

console.log("=======当前环境状态=======", isDev)
console.log("正在编译...")

const devServer = {
  port: 8010,
  // host: '0.0.0.0',
  overlay: {
    errors: true, // 页面不刷新 仅更新组件数据 webpack会自动添加 HMR 插件。所以模块热更新最终还是 HMR 这个插件起的作用。
  },
  // historyFallback: {

  // },
  hot: true,
  open: true
}
let config;

if(isDev){
  config = merge(baseConfig,{
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader', // 能够编译生成sourceMap
              options: {
                sourceMap: true, // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
                config: {
                  path: 'postcss.config.js'
                },
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer: devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]),
    devtool: '#cheap-module-eval-source-map',
  })
}else {
  config = merge(baseConfig,{
    entry: {
      app: path.join(__dirname,'../src/index.js'),
      vendor: ['vue']
    },
    output: {
      //[chunkhash:8]单独打包的时候使用chunkhash，每个模块都有一个新的hash值
      //[hash:8]整个应用的hash  
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader', // 能够编译生成sourceMap
                options: {
                  sourceMap: true, // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
                  config: {
                    path: 'postcss.config.js'
                  }
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('style.[chunkhash:8].css')
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2, 
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      },
      runtimeChunk: true   //js单独打包到一个文件里，每个模块都生成一个id
    },
  })
}

module.exports = config