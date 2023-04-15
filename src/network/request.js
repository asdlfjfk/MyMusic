import axios from 'axios'
import message from "element-ui/packages/message";

export function request(config) {
    return new Promise((resolve,reject) => {
        const instance = axios.create({
            //创建实例
            // baseURL:'https://musicapi-liard.vercel.app/',
            baseURL:'http://localhost:3000',
            timeout:5000
        })
        //请求拦截
        instance.interceptors.request.use(
            config => {
                return config
            },error => {
                console.log(error);
            });
        //响应拦截
        instance.interceptors.response.use(
            res => {
                return res
            },error => {
                message.error("请先登录哦")
                console.log(error);
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
