<template>
    <div v-loading="loading">
        <el-header>
            <div class="head">
                <img v-if="singer" :src="singer.img1v1Url" class="headimg">
                <div class="allline">
                    <div class="line line1">
                        <div class="name">{{singer.name}}</div>
                    </div>
                    <div class="line line2">
                        {{alias}}
                    </div>
                    <div class="line line3">
                        <div class="text"><i class="el-icon-folder-add"></i><div class="bt">收藏</div></div>
                        <div class="text text2"><i class="el-icon-user"></i><div class="bt">个人主页</div></div>
                    </div>
                    <div class="line line4">
                        <div class="size">单曲数:{{singer.musicSize}}</div>
                        <div class="size size2">专辑数:{{singer.albumSize}}</div>
                        <div class="size size2">MV数:{{singer.mvSize}}</div>
                    </div>

                </div>
            </div>
        </el-header>

        <div id="main">
            <div class="maintitle">
                <div class="g2" :class="{active: current === 1}" @click="itemCurrent(1)">作品</div>
                <div class="g2" :class="{active: current === 2}" @click="itemCurrent(2)">专辑</div>
                <div class="g2" :class="{active: current === 3}" @click="itemCurrent(3)">MV</div>
                <div class="g2" :class="{active: current === 4}" @click="itemCurrent(4)">歌手详情</div>
                <div class="g2" :class="{active: current === 5}" @click="itemCurrent(5)">相似歌手</div>
            </div>
        </div>

        <div class="listmain">
            <work v-if="current === 1"></work>
            <album v-if="current === 2"></album>
            <mv v-if="current === 3"></mv>
            <singerdetail v-if="current === 4"></singerdetail>
            <similar v-if="current === 5"></similar>
        </div>
    </div>
</template>

<script>
    import {getsingerdetail} from "network/homedata"
    const work = () => import('../../views/singerlist/work.vue')
    const album = () => import('../../views/singerlist/album.vue')
    const mv = () => import('../../views/singerlist/mv.vue')
    const singerdetail = () => import('../../views/singerlist/singerdetail.vue')
    const similar = () => import('../../views/singerlist/similar.vue')

    export default {
        name: "singerlist",
        components:{
            work,album,mv,singerdetail,similar
        },
        data(){
            return {
                loading:true,
                singer:{},
                current:1,
                alias:"",
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

            let id = this.routeid
            this.$store.commit('cleansongset')

            getsingerdetail(id).then(res => {
                this.singer = res.data.artist
                this.alias = this.singer.alias[0]
                this.$store.commit('pushallsong',res.data.hotSongs)
                this.$store.commit('changeflag',2)
                this.loading = false
            })
        },
        methods:{
                itemCurrent(num){
                    this.current = num
                },
        },
        computed:{
            routeid(){
                return this.$route.params.id
            },
            keywords(){
                return this.$store.state.searchkeywords
            }
        }
    }
</script>

<style scoped>

    img{
        border: 1px solid gainsboro;
    }

    .headimg{
        width: 180px;
        height: 180px;
        border-radius: 14px;
        position: relative;
        left: 44px;
        top: 28px;
    }

    .active{
        font-size: 20px;
        color: rgba(0,0,0,.9);
        border-bottom: 4px solid #c62f2f;
        padding: 12px;
        font-weight: 800;
    }

    #main{
        margin-top: 160px;
        margin-left: 20px;
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
        margin-left: 44px;
        margin-right: 34px;
    }

    .allline{
        position: relative;
        align-items: flex-start;
        left: 260px;
        bottom: 160px;
        font-family: 微软雅黑;
    }

    .line{
        margin-top: 10px;
    }

    .line1{
        position: relative;
        right: 14px;
    }

    .line2{
        font-weight: 300;
        opacity: .9;
    }

    .line3{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .line4{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 20px;
    }

    .name{
        font-size: 24px;
        font-weight: 900;
        margin-left: 14px;
        margin-bottom: 4px;
    }

    .text{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px 14px 3px 12px;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: 40px;
        cursor: pointer;
    }

    .text:hover{
        background-color: rgba(220,220,220,.2);
    }

    .text2{
        margin-left: 8px;
    }

    .bt{
        white-space: nowrap;
        margin-left: 5px;
        font-size: 14px;
        font-weight: 300;
    }

    .size{
        font-weight: 300;
        font-size: 14px;
    }

    .size2{
        margin-left: 24px;
    }
</style>