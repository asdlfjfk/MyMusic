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

//排行榜
export function gettoplist() {
    return request({
        url: '/toplist',
    })
}

//榜单内容摘要
export function gettopdetail() {
    return request({
        url: '/toplist/detail',
    })
}

//获取歌手列表
export function getsingerlist(initial,type,area,offset) {
    return request({
        url: '/artist/list',
        params:{
            initial,
            type,
            area,
            offset
        }
    })
}

//获取歌手详情以及单曲
export function getsingerdetail(id) {
    return request({
        url:'/artists',
        params:{
            id
        }
    })
}

//获取歌手专辑
export function getsingeralbum(id,limit,offset) {
    return request({
        url:'/artist/album',
        params:{
            id,
            limit,
            offset
        }
    })
}

//专辑内容
export function getalbum(id) {
    return request({
        url:'/album',
        params:{
            id
        }
    })
}

//歌手mv
export function getsingermv(id,limit,offset) {
    return request({
        url:'/artist/mv',
        params:{
            id,
            limit,
            offset
        }
    })
}

//获取歌手详情背景
export function getsingerdes(id) {
    return request({
        url:'/artist/desc',
        params:{
            id
        }
    })
}

//获取相似歌手
export function getsimilarsinger(id) {
    return request({
        url:'/simi/artist',
        params:{
            id
        }
    })
}

//获取专辑评论
export function getalbumcomment(id,limit,offset) {
    return request({
        url:'/comment/album',
        params:{
            id,
            limit,
            offset
        }
    })
}

















