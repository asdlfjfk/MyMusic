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

    //获取独家放送列表
    export function getprivatelist(limit,offset) {
        return request({
            url: '/personalized/privatecontent/list',
            params:{
                limit,offset
            }
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
    export function  getplaylist(id,cookie) {
        return request({
            url:'/playlist/detail',
            params:{
                id,
                cookie
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
    export function getsimilarsinger(id,cookie) {
        return request({
            url:'/simi/artist',
            params:{
                id,
                cookie
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

    //新歌速递
    export function getnewsong(type) {
        return request({
            url:'/top/song',
            params:{
                type
            }
        })
    }

    //新碟上架
    export function getnewalbum(area) {
        return request({
            url:'/top/album',
            params:{
                area
            }
        })
    }

    //获取mv内容
    export function getmvdetail(mvid) {
        return request({
            url:'/mv/detail',
            params:{
                mvid
            }
        })
    }

    //获取视频内容
    export function getvideodetail(id) {
        return request({
            url:'/video/detail',
            params:{
                id
            }
        })
    }

    //获取mv评论
    export function getmvcomment(id,limit,offset) {
        return request({
            url:'/comment/mv',
            params:{
                id,
                limit,
                offset
            }
        })
    }

    //获取视频评论
    export function getvideocomment(id,limit,offset) {
        return request({
            url:'/comment/video',
            params:{
                id,
                limit,
                offset
            }
        })
    }

    //获取mv视频地址
    export function getmvurl(id) {
        return request({
            url:'/mv/url',
            params:{
                id
            }
        })
    }

    //获取视频播放地址
    export function getvideourl(id) {
        return request({
            url:'/video/url',
            params:{
                id
            }
        })
    }

    //获取相关视频
    export function getrelatedvideo(id) {
        return request({
            url:'/related/allvideo',
            params:{
                id
            }
        })
    }

    //获取视频标签列表
    export function getvideolist() {
        return request({
            url:'/video/group/list',
        })
    }

    //获取视频分类列表
    export function getvideocategorylist(cookie) {
        return request({
            url:'/video/category/list',
            params:{
                cookie
            }
        })
    }

    //获取视频标签/分类下的视频
    export function getvideogroup(id,cookie) {
        return request({
            url:'/video/group',
            params:{
                id,
                cookie
            }
        })
    }

    //获取全部视频
    export function getallvideo(cookie) {
        return request({
            url:'/video/timeline/all',
            params:{
                cookie
            }
        })
    }

    //获取全部mv
    export function getallmv(area,type,order,limit,offset) {
        return request({
            url:'/mv/all',
            params:{
                area,
                type,
                order,
                limit,
                offset
            }
        })
    }

    //获取最新mv
    export function getnewmv(area,limit) {
        return request({
            url:'/mv/first',
            params:{
                area,
                limit
            }
        })
    }

    //网易出品mv
    export function getwangyimv(limit) {
        return request({
            url:'/mv/exclusive/rcmd',
            params:{
                limit
            }
        })
    }

    //mv排行榜
    export function getmvleader(limit,area) {
        return request({
            url:'/top/mv',
            params:{
                limit,
                area
            }
        })
    }

    //热搜列表
    export function gethotsearch() {
        return request({
            url:'/search/hot/detail'
        })
    }

    //搜索
    export function tosearch(keywords,limit,offset,type) {
        return request({
            url:'/search',
            params:{
                keywords,
                limit,
                offset,
                type
            }
        })
    }

    //手机登录
    export function login(phone,password) {
        return request({
            url:'/login/cellphone',
            params:{
                phone,
                password
            }
        })
    }

    //获取用户歌单
    export function userplaylist(uid,cookie) {
        return request({
            url:'/user/playlist',
            params:{
                uid,
                cookie
            }
        })
    }