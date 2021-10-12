import axios from 'axios'

export function request(config) {
    return new Promise((resolve,reject) => {
        const instance = axios.create({
            //创建实例
            baseURL:'https://musicapi-liard.vercel.app/',
            timeout:100000
        })
        //请求拦截
        instance.interceptors.request.use(
            config => {
                // console.log(config);
                return config
            },error => {
                console.log(err);
            });
        //响应拦截
        instance.interceptors.response.use(
            res => {
                return res
            },error => {
                console.log(err);
            })
        //发送网络请求
        return instance(config)
            .then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
    })
}
