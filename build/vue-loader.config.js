module.exports = (isDev) => {
  return {
    preserveWhitepace: true,  //去掉元素间空格
    extractCSS: !isDev,  //将Vue中css单独打包出来
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      //css里class类名“-”的方式转成js驼峰命名的方式
      //使用方法：在vue文件的style标签中加入module
      camelCase: true,   
    },
    // hotReload: false,   //根据环境变量生成 -- 组件热重载
  } 
}