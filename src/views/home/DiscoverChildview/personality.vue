<template>
    <div id="personal">

        <!--轮播图-->
        <div class="container" v-loading="loadingcarousel">
                <el-carousel type="card" class="swiper" height="244px">
                    <el-carousel-item v-for="item in banners" :key="item.id" class="swiperitem">
                        <div class="new" ><div>新歌首发</div></div>
                        <img :src="item.imageUrl" @click="swiperaddsongtoplay(item)">
                    </el-carousel-item>
                </el-carousel>
        </div>

        <!--推荐歌单-->
        <div class="recommend">
            <span class="left"></span>
            <p class="titleText">推荐歌单</p>
            <span class="right"></span>
        </div>

        <div class="recommonlist" v-loading="loading">
            <div v-for="item in recommonlist">

                <div class="imgbox" @click="listdetail(item.id)">
                    <div class="imgboxcontent">
                        <i class="el-icon-caret-right"></i>
                        {{parseInt(item.playCount/10000)}}万
                    </div>
                    <img :src="item.picUrl" class="itemimg">
                    <div id="button">
                        <i class="el-icon-caret-right" id="player"></i>
                    </div>
                </div>

                <div class="name" @click="listdetail(item.id)">{{item.name}}</div>
            </div>
        </div>


        <!--独家放送-->
        <div class="recommend">
            <span class="left"></span>
            <p class="titleText">独家放送</p>
            <span class="right"></span>
        </div>

        <div class="privatecontent">
            <div v-for="item in privatecontent" class="innerprivate">
                <div class="privateicon">
                    <i class="el-icon-caret-right"></i>
                </div>
                <img :src="item.sPicUrl">
                <p class="privatename">{{item.name}}</p>
            </div>
        </div>


        <!--最新音乐-->
        <div class="recommend">
            <span class="left"></span>
            <p class="titleText">最新音乐</p>
            <span class="right"></span>
        </div>

        <div class="newsongs">
            <div v-for="item in newsongs" class="newsongsitem" @click="addsongtoplay(item)">
                <img :src="item.picUrl" alt="" class="newsongimg">

                <div id="button2">
                    <i class="el-icon-caret-right" id="player3"></i>
                </div>

                <div class="newsongname">
                    <div class="songname">{{item.name}}</div>
                    <div class="singername"><img src="~assets/sq.png">{{item.song.artists[0].name}}</div>
                </div>
            </div>
        </div>



        <!--推荐MV-->
        <div class="recommendMV">
            <span class="left"></span>
            <p class="titleText">推荐MV</p>
            <span class="right"></span>
        </div>

        <div class="recommendMVcontent">
            <div v-for="item in recommendMV">

                <div class="mvplaycount">
                    <i class="el-icon-caret-right"></i>
                    {{item.playCount}}
                </div>

                <div class="recommendMvitem">
                    <div class="hot"><div class="hotname">最新热门MV推荐</div></div>
                    <img :src="item.picUrl" alt="" class="recommendMvimg">
                    <div class="mvtitle">{{item.name}}</div>
                    <div class="mvname">{{item.artists[0].name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        getbanner,
        getrecommonlist,
        getprivatecontent,
        getnewsongs,
        getrecommendMV,
        getsongurl
    } from "network/homedata";
    export default {
        name: "personality",
        data(){
            return {
                loading:true,
                loadingcarousel:true,
                banners:[],
                recommonlist:[],
                privatecontent:[],
                newsongs:[],
                recommendMV:[],
            }
        },
        methods:{
            listdetail(id){
                this.$router.push('/songlist/' + id)
            },
            swiperaddsongtoplay(item){
                this.$store.commit('changebackid',item.targetId)  //用于歌单中存在该歌曲 显示为活跃播放状态
                getsongurl(item.targetId).then(res => {
                    this.$store.commit('changesong2',res)
                },500)
            },
            addsongtoplay(item){
                this.$store.commit('changebackid',item.song.id)
                    getsongurl(item.song.id).then(res => {
                        this.$store.commit('changesong2',res)
                    },500)
            },
        },
        created(){
            getbanner().then(res => {
                this.banners = res.data.banners
                this.loadingcarousel = false
            })
            getrecommonlist().then(res => {
                this.recommonlist = res.data.result
                this.loading = false
            })
            getprivatecontent().then(res => {
                this.privatecontent = res.data.result
            })
            getnewsongs(12).then(res => {
                this.newsongs = res.data.result
            })
            getrecommendMV().then(res => {
                this.recommendMV.push(res.data.result[0])
                this.recommendMV.push(res.data.result[1])
                this.recommendMV.push(res.data.result[2])
            })
        }
    }
</script>

<style scoped>

    #personal{
        padding: 14px;
        margin: 0px 10px 0px 10px;
    }

    .swiper{
        width: 100%;
        align: center;
        border-radius: 15px;
        padding: 0;
        vertical-align: center;
    }
    .swiperitem{
        border-radius: 10px;
    }

    .swiperitem img{
        width: 100%;
        height: 100%;
    }

    .new{
        background-color: #409eff;
        color: #fff;
        font-family: 微软雅黑;
        font-size: 12px;
        position: absolute;
        top: 90%;
        left: 86.4%;
        width: 80px;
        line-height: 25px;
        border-radius: 10px;
        align:center;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .recommend{
        display: flex;
        align-items: center;
        white-space: nowrap;
        line-height: 1%;
    }

    .titleText{
        margin-top: 3%;
    }

    span{
        display: block;
        height: 1px;
        background: #e6e6e6;
    }

    .left{
        width: 2%;
        margin-right: 2%;
        margin-top: 2%;
    }

    .right{
        width: 87%;
        margin-left: 2%;
        margin-top: 2%;
    }

    p{
        font-family: 微软雅黑;
        font-size: 20px;
        display: block;
    }

    .recommonlist{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
    }

    .imgbox{
        z-index: 1;
        height: 200px;
        margin-top: 5%;
    }

    .imgboxcontent{
        width: 40%;
        white-space: nowrap;
        z-index: 5;
        position: relative;
        top: 8px;
        left: 110px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #fff;
        font-family: 微软雅黑;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
    }

    .itemimg{
        width: 200px;
        height: 200px;
        border-radius: 20px;
        box-shadow: 5px 5px 5px 5px gainsboro;
        cursor: pointer;
        z-index: 1;
        position: relative;
        bottom: 10%;
        /*filter:drop-shadow(0 0 3px #000);*/
    }



    .imgbox:hover #button{
        display: inherit;
    }

    #button{
        background-color: #e2e2e2;
        opacity: .9;
        border-radius: 20px;
        width: 14%;
        height: 14%;
        position: relative;
        left: 82%;
        bottom: 30%;
        z-index: 10;
        display: none;
        cursor: pointer;
    }

    .name {
        font-family: 微软雅黑;
        width: 200px;
        height: auto;
        font-size: 14px;
        margin-top: 10%;
        color: rgb(0,0,0,.7);
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
    }

    .name:hover{
        color: rgb(0,0,0,.9);
    }

    #player{
        font-size: 20px;
        color: #c62f2f;
        position: absolute;
        left: 14%;
        bottom: 14%;
    }

    .privatecontent{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .privatecontent img{
        width: 90%;
        border-radius: 10px;
        margin-left: 5%;
        cursor: pointer;
    }

    .privatename{
        opacity: .8;
        font-size: 20px;
        margin-left: 5%;
        margin-right: 2%;
    }

    .privatename:hover{
        opacity: 1;
        cursor: pointer;
    }

    .privateicon{
        color: #fff;
        opacity: .8;
        width: 34px;
        height: 34px;
        background-color: #e2e2e2;
        border-radius: 20px;
        z-index:20;
        position: relative;
        left: 7%;
        top: 42px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .innerprivate{
        padding: 0;
        margin: 0;
        position: relative;
        bottom: 20px;
    }

    .newsongs{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        margin-left: 5%;
        padding: 0;
        position: relative;
        bottom: 20px;
    }

    .newsongsitem{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 33%;
        margin-top: 3%;
        margin-left: .3%;
    }

    .newsongsitem:hover{
        background: #e6e7ea!important;
        color: #000;
        cursor: pointer;
    }

    .newsongimg{
        width: 33%;
        border-radius: 4px;
        cursor: pointer;
    }

    .newsongname{
        width: 200px;
        flex-wrap: wrap;
        font-size: 14px;
        position: relative;
        right:20px;
        font-family: 微软雅黑;
        opacity: .7;
        margin-bottom: 18%;
        padding: 0;
    }

    .songname{
        position: relative;
        top: 34px;
    }

    .singername{
        display: flex;
        align-items: center;
        position: relative;
        top: 40px;
    }

    #button2{
        width: 34px;
        height: 34px;
        border-radius: 20px;
        background-color: rgba(226,226,226,.8);
        z-index: 10;
        position: relative;
        right: 21%;
        cursor: pointer;
    }

    #button2:hover{
        background-color: #fff;
        opacity: .9;
    }
    
    #player3{
        color: #c62f2f;
        position: absolute;
        left: 26%;
        bottom: 24%;
    }

    .recommendMV{
        display: flex;
        align-items: center;
        white-space: nowrap;
        line-height: 25px;
    }

    .recommendMVcontent{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: relative;
        bottom: 55px;
    }

    .recommendMvitem{
        width: 370px;
        height: 280px;
    }

    .recommendMvimg{
        width: 370px;
        height: 200px;
        border-radius: 10px;
        cursor: pointer;
    }

    .mvtitle{
        font-family: 微软雅黑;
        font-size: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 5%;
        opacity: .8;
    }

    .mvname{
        margin-bottom: 100px;
        font-family: 微软雅黑;
        opacity: .5;
        font-size: 13px;
        line-height: 100px;
        position: relative;
        bottom: 9%;
    }

    .mvname:hover{
        opacity: .8;
        cursor: pointer;
    }
    
    .mvplaycount{
        color: #fff;
        position: relative;
        top: 66px;
        left: 300px;
        font-family: 微软雅黑;
    }

    .recommendMvitem:hover .hot{
        transform: translateY(14%);
        transition: transform 0.8s;
        width: 370px;
        background-color: rgba(0,0,0,.5);
        opacity: 1;
        border-radius: 10px;
        z-index:5;
    }
    .hot{
        line-height: 40px;
        position: relative;
        top: 195px;
        opacity: 0;
        z-index: -5;
        overflow: hidden;
    }

    .recommendMvitem:hover .hotname{
        color: #fff;
        margin-left: 10px;
        font-family: 微软雅黑;
    }

</style>