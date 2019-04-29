const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: "web",
  entry: path.join(__dirname,'../src/index.js'),
  output: {
    filename: 'bindle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  mode: process.env.NODE_ENV || 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev),
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude: /node_modules/
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //   ]
      // },
      // {
      //   test: /\.styl(us)?$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader', // 能够编译生成sourceMap
      //       options: {
      //         sourceMap: true, // 若stylus-loader已生成source-map，则postcss-loader就不再重新生成
      //         config: {
      //           path: './postcss.config.js'
      //         }
      //       }
      //     },
      //     'stylus-loader'
      //   ]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        // 将图片转化成base64 代码，直接写在js内容里面，而不用生成新的文件，对于小图片有用，可减少http请求
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2056,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
}

console.log("正在编译...")


module.exports = config