<template>
    <div>
        <el-header>
            <div class="head">
                <img v-if="singer" :src="singer.img1v1Url" class="headimg">
                <div class="allline">
                    <div class="line1">
                        {{singer.name}}
                    </div>
                    <div class="line2">
                        {{singer.alias[0]}}
                    </div>
                    <div class="line3">
                        收藏 个人主页
                    </div>
                    <div class="line4">
                        <div>单曲数:</div>
                        <div>专辑数:</div>
                        <div>MV数:</div>
                    </div>

                </div>
            </div>
        </el-header>

        <div id="main">
            <div class="maintitle">
                <div class="g2" :class="{active: current === 1}" @click="itemCurrent(1)">作品</div>
                <div class="g2" :class="{active: current === 2}" @click="itemCurrent(2)">专辑</div>
                <div class="g2" :class="{active: current === 3}" @click="itemCurrent(3)">mv</div>
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
                singer:{},
                hotsongs:[],
                current:1
            }
        },
        created(){
            let id = this.$route.params.id
            getsingerdetail(id).then(res => {
                this.singer = res.data.artist
                this.hotsongs = res.data.hotSongs
                console.log(res);
            })
        },
        methods:{
                itemCurrent(num){
                    switch (num) {
                        case 1:this.current = 1;
                            break;
                        case 2:this.current = 2;
                            break;
                        case 3:this.current = 3;
                            break;
                        case 4:this.current = 4;
                            break;
                        case 5:this.current = 5;
                            break;
                    }
                },
        }
    }
</script>

<style scoped>

    img{
        border: 1px solid gainsboro;
    }

    .headimg{
        width: 18%;
        height: 18%;
        border-radius: 14px;
        position: relative;
        left: 4%;
        top: 28px;
    }

    .active{
        font-size: 20px;
        color: rgba(0,0,0,.9);
        opacity: .8;
        border-bottom: 2px solid #c62f2f;
        padding: 12px;
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

    .listmain{
        margin-left: 34px;
        margin-right: 34px;
    }

    /*.allline{*/
        /*position: relative;*/
        /*align-items: flex-start;*/
        /*left: 70px;*/
        /*top: 20px;*/
    /*}*/
</style>