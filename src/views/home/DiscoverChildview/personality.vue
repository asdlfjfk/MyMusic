<template>
    <div id="personal">

        <!--轮播图-->
        <div class="container" v-loading="loadingcarousel">
                <el-carousel type="card" class="swiper" height="244px">
                    <el-carousel-item v-for="item in banners" :key="item.id" class="swiperitem">
                        <div class="new" ><div>{{item.typeTitle}}</div></div>
                        <img :src="item.imageUrl" @click="swiperaddsongtoplay(item)">
                    </el-carousel-item>
                </el-carousel>
        </div>

        <!--推荐歌单-->
            <div class="recommend">
                <p class="titleText" @click="linktoplaylist">推荐歌单 ></p>
            </div>

            <div class="recommonlist" v-loading="loading">
                <div v-for="item in recommonlist">

                    <div class="imgbox" @click="listdetail(item.id)">
                        <div class="imgboxcontent" v-if="item.playCount >= 10000">
                            <i class="el-icon-caret-right"></i>
                            {{parseInt(item.playCount/10000)}}万
                        </div>
                        <div class="imgboxcontent" v-if="item.playCount < 10000">
                            <i class="el-icon-caret-right"></i>
                            {{item.playCount}}
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
            <p class="titleText" @click="linktoalllist">独家放送 ></p>
        </div>

        <div class="privatecontent">
            <div v-for="item in privatecontent" class="innerprivate" @click="mvdetail(item.id)">
                <div class="privateicon">
                    <i class="el-icon-caret-right"></i>
                </div>
                <img :src="item.sPicUrl">
                <p class="privatename">{{item.name}}</p>
            </div>
        </div>


        <!--最新音乐-->
            <div class="recommend">
                <p class="titleText" @click="linktolatestmusic">最新音乐 ></p>
            </div>

            <div class="newsongs">
                <div v-for="item in newsongs" class="newsongsitem" @dblclick="addsongtoplay(item)">
                    <img :src="item.picUrl" alt="" class="newsongimg">

                    <div id="button2">
                        <i class="el-icon-caret-right" id="player3"></i>
                    </div>

                    <div class="newsongname">
                        <div class="songname">{{item.name}}</div>
                        <div class="singername">
                            <span class="iconfont" v-if="item.song.mvid" @click="mvdetail(item.song.mvid)">&#xe674;</span>
                            <img src="~assets/sq.png" class="sq" v-if="item.song.privilege.maxbr === 999000">
                            <span  @click="singerdetail(item.song.artists[0].id)">{{item.song.artists[0].name}}</span>
                        </div>
                    </div>
                </div>
            </div>





        <!--推荐MV-->
        <div class="recommendMV">
            <p class="titleText" @click="linktomv">推荐MV ></p>
        </div>

        <div class="recommendMVcontent">
            <div v-for="item in recommendMV">

                <div class="mvplaycount" v-if="item.playCount >= 10000">
                    <i class="el-icon-caret-right"></i>
                    {{parseInt(item.playCount/10000)}}万
                </div>
                <div class="mvplaycount" v-if="item.playCount < 10000">
                    <i class="el-icon-caret-right"></i>
                    {{item.playCount}}
                </div>

                <div class="recommendMvitem" @click="mvdetail(item.id)">
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
            mvdetail(id){
              this.$router.push('/mvpage/' +  id)
            },
            swiperaddsongtoplay(item){
                if (item.targetType === 1){
                    this.$store.commit('changebackid',item.targetId)  //用于歌单中存在该歌曲 显示为活跃播放状态
                    getsongurl(item.targetId).then(res => {
                        this.$store.commit('changesong2',res)
                    },500)
                }else {
                    this.$message.error('暂无权限播放此歌曲')
                }
            },
            addsongtoplay(item){
                this.$store.commit('changebackid',item.song.id)
                    getsongurl(item.song.id).then(res => {
                        this.$store.commit('changesong2',res)
                    },500)
            },
            mvdetail(id){
                this.$router.push('/mvpage/' +  id)
            },
            singerdetail(id){
                this.$router.push('/singerlist/' + id)
            },
            linktoplaylist(){
                this.$router.push('playlist')
            },
            linktolatestmusic(){
                this.$router.push('latestmusic')
            },
            linktoalllist(){
                this.$router.push('/privatelist')
            },
            linktomv(){
                this.$router.push('/video/recomv')
            }
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
            getnewsongs(30).then(res => {
                this.newsongs = res.data.result
            })
            getrecommendMV().then(res => {
                this.recommendMV.push(res.data.result[0])
                this.recommendMV.push(res.data.result[1])
                this.recommendMV.push(res.data.result[2])
                this.recommendMV.push(res.data.result[3])
            })
        }
    }
</script>

<style scoped>

    .iconfont{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        font-size:22px;font-style:normal;
        color: red;margin-left: 4px;
        position: relative;
        right: 4px;
    }

    #personal{
        width: 1200px;
        margin: 0 auto;
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
        position: relative;
        bottom: 20px;
    }

    .titleText{
        margin-top: 3%;
        font-weight: 800;
        color: rgb(0,0,0,.8);
        cursor: pointer;
        position: relative;
        left: 34px;
        top: 18px;
        z-index: 15;
        font-family: 微软雅黑;
    }

    .titleText:hover{
        color: rgb(0,0,0);
    }

    p{
        font-size: 20px;
        display: block;
    }

    .recommonlist{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        margin-bottom: 24px;
    }

    .imgbox{
        z-index: 1;
        height: 200px;
        margin-top: 5%;
        margin-left: 30px;
    }

    .imgboxcontent{
        width: 40%;
        white-space: nowrap;
        z-index: 5;
        position: relative;
        top: 4px;
        left: 110px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #fff;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        font-size: 13px;
    }

    .itemimg{
        width: 200px;
        height: 200px;
        border-radius: 5px;
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
        width: 200px;
        height: auto;
        font-size: 14px;
        margin-top: 10%;
        color: rgb(0,0,0,.6);
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        font-family: 微软雅黑;
        font-weight: 400;
        margin-left: 30px;
    }

    .name:hover{
        color: rgb(0,0,0,.9);
    }

    #player{
        font-size: 20px;
        color: #c62f2f;
        position: absolute;
        left: 15%;
        bottom: 15%;
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
        font-size: 15px;
        margin-left: 5%;
        margin-right: 2%;
        font-weight: 400;
    }

    .privatename:hover{
        opacity: 1;
        cursor: pointer;
    }

    .privateicon{
        color: #fff;
        width: 24px;
        height: 24px;
        background-color: rgb(226,226,226,.4);
        border: 1px solid #fff;
        border-radius: 20px;
        z-index:20;
        position: relative;
        left: 8%;
        top: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .privateicon >>> .el-icon-caret-right{
        position: relative;
        top: .5px;
        font-size: 16px;
        color: #fff;
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
        width: 338px;
        height: 111px;
        margin-top: 3%;
        margin-left: 30px;
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
        font-size: 14px;
        font-weight: 400;
    }

    .singername{
        display: flex;
        align-items: center;
        position: relative;
        top: 40px;
        font-size: 12px;
        font-family: 微软雅黑;
        font-weight: 400;
    }

    .sq{
        width: 24px;
        height: 26.4px;
        position: relative;
        margin-right: 4px;
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
        font-size: 24px;
        color: #c62f2f;
        position: absolute;
        left: 15%;
        bottom: 15%;
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
        bottom: 30px;
    }

    .recommendMvitem{
        width: 280px;
        height: 260px;
    }

    .recommendMvimg{
        width: 280px;
        height: 158px;
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
        bottom: 12%;
    }

    .mvname:hover{
        opacity: .8;
        cursor: pointer;
    }
    
    .mvplaycount{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        position: relative;
        top: 50px;
        right: 10px;
        font-family: 微软雅黑;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        font-size: 13px;
    }

    .recommendMvitem:hover .hot{
        transform: translateY(14%);
        transition: transform 0.8s;
        width: 280px;
        background-color: rgba(0,0,0,.5);
        opacity: 1;
        border-radius: 10px;
        z-index:5;
    }
    .hot{
        line-height: 30px;
        position: relative;
        top: 154px;
        opacity: 0;
        z-index: -5;
        overflow: hidden;
        font-size: 13px;
    }

    .recommendMvitem:hover .hotname{
        color: #fff;
        margin-left: 10px;
        font-family: 微软雅黑;
    }

    .container{
        position: relative;
        top: 14px;
    }

    .container >>> .el-carousel__indicators {
        margin-top: 14px;
    }

</style>