const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: { //开发环境下需要的配置
    // https: false,
    proxy: { //只是在开发环境下用的，因为生产环境中一般是放在同一个服务器下，不存在跨域问题，生产环境下为了解决跨域才会用这个
      '/api/v1': {
        target: 'http://10.144.211.163', // 这里可以跟随项目实际部署服务器来
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          '^/api/v1': '', // 自定义
        },
      },
      '/authservice': {
        target: 'http://10.144.211.163:8082', // 这里可以跟随项目实际部署服务器来
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          '^/authservice': '',
        },
      },
      '/sheepservice': {
        target: 'http://10.144.211.163:8080', // 这里可以跟随项目实际部署服务器来
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          '^/sheepservice': '',
        },
      },
      '/paymentservice': {
        target: 'http://10.144.211.163:8083', // 这里可以跟随项目实际部署服务器来
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        ws: true,
        pathRewrite: {
          '^/paymentservice': ''
        },
      }
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
