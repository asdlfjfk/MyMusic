module.exports = {
    configureWebpack: {
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
            }
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: 'https://nicemusic-api.lxhcool.cn',
                pathRewrite: {'^/api' : ''},
                changeOrigin: true,
                secure: false
            }
        },

    }
}