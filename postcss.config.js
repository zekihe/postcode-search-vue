const autoprefixer = require('autoprefixer')
// postcss后处理css文件。已经将stylus文件编译成css之后，
//再通过postcss去优化css代码（通过一系列的组件去实现，如autoPrefixer）
module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        // 加这个后可以出现额外的兼容性前缀
          "> 0.01%",
          "defaults",
          "not ie < 11",
          "last 2 versions",
          "> 1%",
          "iOS 7",
          "last 3 iOS versions"
      ]
    })
  ]
}