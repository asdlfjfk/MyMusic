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
                target: 'http://localhost:8080',
                pathRewrite: {'^/api' : ''},
                changeOrigin: true,
                secure: false
            }
        },
    }
}