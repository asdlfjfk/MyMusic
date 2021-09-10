<template>
    <div v-loading="loading" id="albumlist">
        <div class="head">
            <div class="imgbox">
                <img :src="detail.blurPicUrl" alt="">
            </div>
            <div class="allline">
                <div class="line1">
                    <div class="box"><div>专辑</div></div>
                    <div class="name">{{detail.name}}</div>
                    <div v-if="alias" class="alias">({{alias}})</div>
                </div>

                <div class="line2">
                    <div class="playall" @click="pushallsong"><div class="text"><i class="el-icon-caret-right"></i>播放全部</div></div>
                    <div class="button"><div class="text"><i class="el-icon-folder-add"></i>收藏</div></div>
                    <div class="button"><div class="text"><i class="el-icon-share"></i>分享({{shareCount}})</div></div>
                </div>

                <div class="line3">
                    <span class="title">歌手:</span><span class="singername">{{name}}</span>
                </div>

                <div class="line4">
                    <span class="title">时间:</span><span class="time">{{formatDate(detail.publishTime)}}</span>
                </div>
            </div>
        </div>

        <div id="main">
            <div class="maintitle">
                <div class="g2" :class="{active: current === 1}" @click="itemCurrent(1)">歌曲列表</div>
                <div class="g2" :class="{active: current === 2}" @click="itemCurrent(2)">评论({{commentCount}})</div>
                <div class="g2" :class="{active: current === 3}" @click="itemCurrent(3)">专辑详情</div>
            </div>
        </div>

        <div class="listmain">
            <list v-if="current === 1"></list>
            <comment v-if="current === 2" :comments="comments"></comment>
            <detail v-if="current === 3" :des="description"></detail>
        </div>
    </div>
</template>

<script>
    import {getsongurl} from "network/homedata";
    import {getalbum} from "network/homedata"
    const list = () => import('../../views/albumlist/list.vue')
    const comment = () => import('../../views/albumlist/comment.vue')
    const detail = () => import('../../views/albumlist/detail.vue')

    export default {
        name: "albumlist",
        components: {detail,comment,list},
        data(){
          return {
              loading:true,
              detail:{},
              shareCount:0,
              name:"",
              alias:"",
              commentCount:0,
              current:1,
              comments:[],
              description:""
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

            this.init()
        },
        activated(){
            this.init()
        },
        computed:{
            id(){
                return this.$route.params.id
            },
            keywords(){
                return this.$store.state.searchkeywords
            }
        },
        methods:{
            init(){
                getalbum(this.id).then(res => {
                    this.detail = res.data.album
                    this.shareCount = res.data.album.info.shareCount
                    this.name = res.data.album.artist.name
                    this.commentCount = res.data.album.info.commentCount
                    this.description = res.data.album.description
                    this.alias = res.data.album.alias[0]
                    this.$store.commit('cleansongset')
                    this.$store.commit('pushallsong',res.data.songs)
                    this.$store.commit('changeflag',2)
                    this.comments.push(this.detail.info.commentCount)
                    this.comments.push(this.detail.id)
                    this.loading = false
                })
            },
            //播放全部
            pushallsong(){
                let item = this.$store.state.songset[0][0]
                this.$store.commit('changebackid',item.id)
                getsongurl(item.id).then(res => {
                    this.$store.commit('workchangesong',{res,item})
                },500)
            },
            formatDate (data) {
                var date = new Date(data)
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
                return Y + M + D
            },
            itemCurrent(num){
                this.current = num
            },
        }
    }
</script>

<style scoped>

    #albumlist{
        height: calc(100vh - 160px);
    }

    .imgbox{
        position: relative;
        left: 44px;
        top: 28px;
        width:200px;
        height: 180px;
        background-color: #29281f;
        border-radius: 400px;
        z-index: 5;
        cursor: pointer;
    }

    img{
        width:180px;
        height: 180px;
        background-color: #29281f;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        z-index: 10;
        filter:drop-shadow(0 0 3px gainsboro);
    }

    .head{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .allline{
        position: relative;
        align-items: flex-start;
        left: 70px;
        bottom: 14px;
    }

    .box{
        width: 55px;
        border: 1px solid #c62f2f;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color:  #c62f2f;
        font-weight: 900;
    }

    .name{
        font-size: 24px;
        font-weight: 900;
        margin-left: 14px;
        margin-bottom: 4px;
    }

    .alias{
        font-size: 24px;
        font-weight: 900;
        margin-left: 14px;
        margin-bottom: 4px;
        opacity: .4;
    }

    .line1{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 22px;
        font-family: 微软雅黑;
        position: relative;
        top: 8px;
    }

    .line2{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 22px;
        position: relative;
        top: 20px;
        font-size: 14px;
        font-weight: 300;
    }

    .line3{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 24px;
        position: relative;
        top: 35px;
        font-size: 14px;
    }

    .line4{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 24px;
        position: relative;
        top: 40px;
        font-size: 14px;
    }

    .playall{
        width: auto;
        border-radius: 40px;
        background-color: #c62f2f;
        color: #fff;
        font-family: 微软雅黑;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        cursor: pointer;
    }

    .button{
        width: auto;
        border-radius: 40px;
        border: 1px solid rgba(0,0,0,.2);
        background-color: #fff;
        color: #000;
        font-family: 微软雅黑;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-left: 12px;
        cursor: pointer;
    }

    .playall:hover{
        background-color: #af2c2c;
    }

    .button:hover{
        background-color: rgba(220,220,220,.3);
    }

    .text{
        padding: 4px 18px 2px 4px;
        margin-left: 10px;
    }

    .title{
        opacity: .7;
    }

    .singername{
        color: rgb(80, 125, 175,.8);
        margin-left: 14px;
        cursor: pointer;
    }

    .singername:hover{
        color: rgb(80, 125, 175);
    }

    .time{
        margin-left: 14px;
        opacity: .8;
        font-size: 13px;
    }

    .active{
        font-size: 20px;
        color: rgba(0,0,0,.9);
        border-bottom: 4px solid #c62f2f;
        padding: 12px;
        font-weight: 800;
    }

    #main{
        margin-top: 40px;
        margin-left: 10px;
    }

    .maintitle{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-family: 微软雅黑;
        font-size: 14px;
        margin-left: 15px;
        color: rgba(0,0,0,.5);
    }

    .g2{
        margin-left: 14px;
        margin-right: 14px;
    }

    .g2:hover{
        color: rgba(0,0,0,.8);
        cursor: pointer;
    }

    .listmain{
        margin-left: 34px;
    }
</style>