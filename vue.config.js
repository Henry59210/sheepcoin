const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    proxy: {
      '/api/v1': {
        target: 'http://10.249.48.211:8082', // 这里可以跟随项目实际部署服务器来
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          '^/api/v1': '' // 自定义
        }
      },
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'utils': '@/utils',
        'component': '@/component',
        'network': '@/network'
      }
    }
  },
  // chainWebpack: config => {
  //   config
  //       .plugin('html')
  //       .tap(args => {
  //         args[0].title= '你想设置的title名字'
  //         return args
  //       })
  // }
})
