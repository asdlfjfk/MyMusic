<template>
    <div id="songlist" v-loading="loading">
        <el-header>
            <div class="head">
                <img v-if="playlist" :src="playlist.coverImgUrl" class="headimg">
                <div class="allline">
                    <div class="line1">
                        <div class="box"><div>歌单</div></div>
                        <div class="name">{{playlist.name}}</div>
                    </div>

                    <div class="line2">
                        <img :src="creator.avatarUrl" alt="" class="avatar">
                        <div class="creatorname">{{creator.nickname}}</div>
                        <div class="createdate">{{createTime}}创建</div>
                    </div>

                    <div class="line3">
                        <div class="playall" @click="pushallsong"><div class="text"><i class="el-icon-caret-right"></i>播放全部</div></div>
                        <div class="button"><div class="text"><i class="el-icon-folder-add"></i>收藏({{playlist.subscribedCount}})</div></div>
                        <div class="button"><div class="text"><i class="el-icon-share"></i>分享({{playlist.shareCount}})</div></div>
                    </div>

                    <div class="line4">
                        <div>标签:
                            <span class="g"></span>
                            <span class="tag">{{tags[0]}}</span>
                            <span class="g">/</span>
                            <span class="tag">{{tags[1]}}</span>
                            <span class="g">/</span>
                            <span class="tag">{{tags[2]}}</span>
                        </div>
                    </div>

                    <div class="line5">
                        <div>歌曲: <span class="count">{{playlist.trackCount}}</span></div>
                        <div id="play">播放: <span class="count">{{parseInt(playlist.playCount/10000)}}万</span></div>
                    </div>

                    <div class="line6">
                        <div class="descrbox">简介: <div class="desr">{{playlist.description}}</div></div>
                    </div>
                </div>
            </div>
        </el-header>

        <div id="main">
            <div class="maintitle">
                <div class="g2" :class="{active: current === 1}" @click="itemCurrent(1)">歌曲列表</div>
                <div class="g2" :class="{active: current === 2}" @click="itemCurrent(2)">评论({{playlist.commentCount}})</div>
            </div>
        </div>

        <div class="listmain">
                <list v-if="current === 1 && trackids.length > 0"></list>
                <comment v-if="current === 2" :comments="comments"></comment>
        </div>
    </div>
</template>

<script>

    import {formatDate} from "common/util"
    import {getplaylist,getsongdetail,getsongurl} from "network/homedata";
    const list = () => import('../../views/songlist/list.vue')
    const comment = () => import('../../views/songlist/comment.vue')

    export default {
        name: "songlist",
        mixins:[formatDate],
        data(){
            return {
                listid:0,
                playlist:{},
                creator:{},
                createdate:"",
                createTime:0,
                tags:[],
                current:1,
                trackids:[],
                loading:true,
                ids:[],
                ids2:[],
                comments:[]
            }
        },
        components:{
            list,
            comment
        },
        created(){
            let id = this.routeid;
            this.listid = id

            this.$store.commit('cleansongset')

            new Promise((resolve) => {
                getplaylist(this.listid).then(res => {
                    this.playlist = res.data.playlist
                    this.creator = this.playlist.creator
                    this.createTime = this.formatDate(this.playlist.createTime)
                    this.tags = this.playlist.tags
                    this.trackids = this.playlist.trackIds
                    resolve(res)
                })
            }).then(() => {
                this.comments.push(this.playlist.commentCount)
                this.comments.push(this.playlist.id)
                for (let trackid of this.trackids){
                    this.ids.push(trackid.id)
                }

                //保证请求按id顺序执行
                let promise = null
                if (this.ids.length >= this.trackids.length){
                    promise = this.ids.map(item => {
                        return this.getInfo(item)  //将每个请求封装为promise
                    })

                    Promise.all(promise).then(res => {  //遍历所有请求的数据
                        let count = 0
                        for (let song of res){
                            this.$store.commit('pushallsong',song)
                            count += 1
                        }
                        if (count >= res.length){
                            this.loading = false
                        }
                    })
                }
            })
        },
        computed:{
            routeid(){
                return this.$route.params.id
            }
        },
        methods:{
            itemCurrent(num){
                switch (num) {
                    case 1:this.current = 1;
                        break;
                    case 2:this.current = 2;
                        break;
                }
            },

            //播放全部
            pushallsong(){
                    let item = this.$store.state.songset[0]
                    this.$store.commit('changebackid',item.data.songs[0].id)
                    getsongurl(item.data.songs[0].id).then(res => {
                        this.$store.commit('changesong',{res,item})
                    },500)
            },



        },getInfo(id){
            return new Promise((resolve) => {
                getsongdetail(id).then(res => {
                    resolve(res)
                })
            })
        },
    }
</script>

<style scoped>

    #songlist{
        overflow-y: scroll;
        overflow-x: hidden;
        position: relative;
        right: 6px;
    }

    .head{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        bottom: 10px;
    }

    .headimg{
        width: 20%;
        height: 20%;
        border-radius: 14px;
        position: relative;
        left: 4%;
        top: 28px;
        box-shadow: 5px 5px 5px 5px gainsboro;
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

    .allline{
        position: relative;
        align-items: flex-start;
        left: 70px;
        top: 20px;
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
        position: relative;
        bottom: 8px;
        font-family: 微软雅黑;
    }

    .line2 img{
        position: relative;
        top: 25px;
        width: 44px ;
        left: 24px;
        border-radius: 40px;
        margin-bottom: 50px;
        cursor: pointer;
    }

    .creatorname{
        margin-left: 40px;
        color: rgb(80, 125, 175);
        cursor: pointer;
    }

    .createdate{
        font-family: 微软雅黑;
        font-size: 12px;
        opacity: .6;
        margin-left: 12px;
    }

    .line3{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 22px;
        position: relative;
        bottom: 22px;
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
        padding: 3px 14px 3px 5px;
        margin-left: 8px;
    }

    .line4{
        margin-left: 22px;
        font-family: 微软雅黑;
        position: relative;
        bottom: 4px;
    }

    .tag{
        color: rgb(80, 125, 175);
        cursor: pointer;
    }

    .g{
        margin-left: 5px;
        margin-right: 5px;
    }

    .line5{
        display: flex;
        justify-content: flex-start;
        margin-left: 22px;
        font-family: 微软雅黑;
        position: relative;
        top: 3px;
    }

    .count{
        margin-left: 11px;
    }

    #play{
        margin-left: 18px;
    }

    .line6{
        position: relative;
        top: 11px;
        margin-left: 22px;
        font-family: 微软雅黑;
        display: flex;
        justify-content: flex-start;
    }

    .descrbox{
        display: flex;
        white-space: nowrap;
        width: 600px;
        align-items: center;
    }

    .desr{
        margin-left: 15px;
        text-overflow: ellipsis;
        overflow-x: hidden;
        white-space: nowrap;
        width: 800px;
        font-size: 14px;
    }

    .desr:hover{
        width: 800px;
        position: absolute;
        left: 35.8px;
        font-size: 14px;
        cursor: pointer;
        white-space: normal;
        background-color: #fff;
    }

    #main{
        margin-top: 200px;
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

    .active{
        font-size: 20px;
        color: rgba(0,0,0,.9);
        opacity: .8;
        border-bottom: 2px solid #c62f2f;
        padding: 12px;
    }

    .listmain{
        margin-left: 34px;
    }

</style>