import {request} from './request'

//获取轮播图数据
export function getbanner() {
    return request({
        url:'/banner'
    })
}