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

//获取歌单
export function  getplaylist(id) {
    return request({
        url:'/playlist/detail',
        params:{
            id
        }
    })
}

//获取歌曲详情
export function  getsongdetail(ids) {
    return request({
        url:'/song/detail',
        params:{
            ids
        }
    })
}

//获取歌曲文件
export function getsongurl(id) {
    return request({
        url:'/song/url',
        params:{
            id
        }
    })
}

//获取歌单评论
export function getplaylistcomment(id,limit,offset) {
    return request({
        url:'/comment/playlist',
        params:{
            id,
            limit,
            offset
        }
    })
}
//用于获取精彩评论
export function gethotcomment(id,limit) {
    return request({
        url:'/comment/playlist',
        params:{
            id,
            limit
        }
    })
}

//获取热门歌单分类
export function gethotcategory() {
    return request({
        url:'/playlist/hot',
    })
}

//获取全部歌单
export function getlist(cat,limit,offset) {
    return request({
        url:'/top/playlist',
        params:{
            cat,
            limit,
            offset
        }
    })
}

//获取所有分类标签
export function getalltag() {
    return request({
        url:'playlist/catlist',
    })
}








