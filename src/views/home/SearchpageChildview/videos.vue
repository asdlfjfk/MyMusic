<template>
    <div class="searchvideos">
        <div class="searchtitle">已为您找到{{count}}个关于"{{keywords}}"的MV或视频</div>
        <div class="videolist">
            <div v-for="item in videos" class="videoitem">
                <img :src="item.coverUrl" @click="videodetail(item)">
                <div class="mvplaycount" v-if="item.playTime >= 10000">
                    <i class="el-icon-caret-right"></i>
                    {{parseInt(item.playTime/10000)}}万
                </div>
                <div class="mvplaycount" v-if="item.playTime < 10000">
                    <i class="el-icon-caret-right"></i>
                    {{item.playTime}}
                </div>
                <div class="time">{{format(item.durationms)}}</div>
                <div class="videoinfo">
                    <div class="titleline">
                        <div class="iconfont" v-if="item.type === 0">&#xe674;</div>
                        <div class="title" @click="videodetail(item)">{{item.title}}</div>
                    </div>
                    <div class="name">{{item.creator[0].userName}}</div>
                </div>
            </div>
        </div>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pagesize"
                :total="count" @current-change="currentChange">
        </el-pagination>
    </div>
</template>

<script>
    import {tosearch} from "network/homedata"
    export default {
        name: "videos",
        data(){
            return {
                page:0,
                pagesize:24,
                count:0,
                videos:[]
            }
        },
        created(){
            //防止页面刷新后搜索关键字丢失
            window.addEventListener("pagehide",()=>{
                sessionStorage.setItem("keywords",this.keywords)
            })
            window.addEventListener("pageshow",()=>{
                if(sessionStorage.getItem('keywords') === null) {
                    sessionStorage.setItem("keywords",this.keywords)
                }
                this.$store.commit('changesearchkeyword',sessionStorage.getItem("keywords"));
            })

            tosearch(this.keywords,24,this.page * 24,1014).then(res => {
                this.count = res.data.result.videoCount
                this.videos = res.data.result.videos
            })
        },
        computed:{
            keywords(){
                return this.$store.state.searchkeywords
            }
        },
        methods:{
            currentChange(currentPage){
                tosearch(this.keywords,24,(currentPage-1) * 24,1014).then(res => {
                    this.videos = res.data.result.videos
                })
            },
            videodetail(item){
                if (item.type === 0) {
                    this.$router.push('/mvpage/' +  item.vid)
                }
                else {
                    this.$router.push('/videopage/' +  item.vid)
                }
            },
            format (data) {
                let date = new Date(data)
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
                let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return m + s
            }
        },
        watch:{
            keywords(val){
                    tosearch(val,24,this.page * 24,1014).then(res => {
                        this.count = res.data.result.videoCount
                        this.videos = res.data.result.videos
                    })
            }
        },
    }
</script>

<style scoped>

    .iconfont{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        font-size:18px;font-style:normal;
        color: red;margin-right: 5px;
    }

    .videolist{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .titleline{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 20px;
        width: 280px;
        white-space: nowrap;
    }

    .title{
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 13px;
        font-family: 微软雅黑;
        font-weight: 400;
        color: rgb(0,0,0,.7);
        cursor: pointer;
    }

    .title:hover{
        color: rgb(0,0,0,.9);
    }

    .name{
        font-size: 12px;
        margin-left: 20px;
        width: 280px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        opacity: .7;
        cursor: pointer;
        color: #687dea;
    }

    img{
        width: 280px;
        height: 160px;
        border: 1px solid gainsboro;
        margin-left: 20px;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
    }

    .searchtitle{
        margin: 10px 0px 10px 20px;
        font-weight: 600;
        font-family: 微软雅黑;
        font-size: 14px;
    }

    .searchvideos >>> .el-pagination{
        position: relative;
        left: 28%;
        right: 30%;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .searchvideos >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #c62f2f;
    }

    .searchvideos >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
        color: #fff;
    }

    .searchvideos >>> .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #c62f2f;
    }

    .mvplaycount{
        color: #fff;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        bottom: 160px;
        right: 8px;
        font-family: 微软雅黑;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        font-size: 13px;
    }

    .time{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        bottom: 40px;
        right: 6px;
        font-size: 12px;
        font-weight: 400;
        color: #fff;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
    }

    .videoitem{
        width: 302px;
        height: 220px;
    }

    .videoinfo{
        position: relative;
        bottom: 30px;
    }
</style>