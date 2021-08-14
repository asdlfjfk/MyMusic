import {request} from './request'

//获取轮播图数据
export function getbanner() {
    return request({
        url:'/banner'
    })
}

//获取推荐歌单数据
export function getrecommonlist() {
    return request({
        url: '/personalized'
    })
}

//获取独家放送数据
export function getprivatecontent() {
    return request({
        url: '/personalized/privatecontent'
    })
}

//获取最新音乐数据
export function getnewsongs(limit) {
    return request({
        url: '/personalized/newsong',
        params: {
            limit
        }
    })
}

//获取推荐mv数据
export function getrecommendMV() {
    return request({
        url: '/personalized/mv',
    })
}

