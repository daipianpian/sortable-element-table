const path = require('path')
const webpack = require('webpack')

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    lintOnSave: true,
    productionSourceMap: false,
    devServer:{
        port:8003,
        open:true,
        https:false,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@', resolve('./src'))
    },
    configureWebpack: {
        performance: {
            hints:false
        }
    },
    // 构建时开启多进程处理 babel 编译
    parallel: require('os').cpus().length > 1,
    // 第三方插件配置
    pluginOptions: {}
}