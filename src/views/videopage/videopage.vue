<template>
    <div id="videopage">
        <div class="headline">
            <div @click="goback" class="head back">< 视频详情</div>
            <div class="head other">相关推荐</div>
        </div>

        <div class="line2">
            <div class="video">
                <video :src="url" controls="controls" autoplay></video>
                <div class="artists"><img :src="avatarUrl" alt="" class="avatar"><div class="creatname">{{artists}}</div>
                    <div class="tags">
                        <div v-for="item in videoGroup" class="tagitem">{{item.name}}</div>
                    </div>
                </div>
                <div class="name">{{name}}</div>
                <div class="time publish"><div>发布: {{formatDate(publishTime)}}</div><div class="play">播放: {{parseInt(playCount)}}次</div></div>
                <div class="descrbox"><div class="desr">{{desc}}</div></div>
                <div class="line3">
                    <div class="button"><div class="icon">&#xe6c9;赞({{praisedCount}})</div></div>
                    <div class="button"><div><i class="el-icon-folder-add"></i>收藏({{subscribeCount}})</div></div>
                    <div class="button"><div><i class="el-icon-share"></i>分享({{shareCount}})</div></div>
                </div>
            </div>
            <div class="relatedvideo">
                <div v-for="item in relatedvideo" class="relateditem">
                    <img :src="item.coverUrl" alt="" @click="videodetail(item)">
                    <div class="duration">{{format(item.durationms)}}</div>
                    <div class="text">
                        <div class="relatedtitle" @click="videodetail(item)">{{item.title}}</div>
                        <div class="relatedtitle creatorname">by {{item.creator[0].userName}}</div>
                    </div>
                    <div class="videoplaycount" v-if="item.playTime >= 10000">
                        <i class="el-icon-caret-right"></i>
                        {{parseInt(item.playTime / 10000)}}万
                    </div>
                    <div class="videoplaycount" v-if="item.playTime < 10000">
                        <i class="el-icon-caret-right"></i>
                        {{item.playTime}}
                    </div>
                </div>
            </div>
        </div>


        <div id="videocomments" v-loading="loading">
                <div class="comment">
                    <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 4, maxRows: 6}" class="textarea"
                              maxlength="140" minlength="0" show-word-limit resize="none" v-model="input">
                    </el-input>
                    <el-button @click="tocomment" plain>评论</el-button>
                </div>
                <div class="hotcomments" v-if="hot.length > 0">
                    <span class="title">精彩评论({{hot.length}})</span>
                    <div v-for="comment in hot" class="usercomment">
                        <div  class="usercommentcontent">
                            <img :src="comment.user.avatarUrl" alt="" class="avatar">
                            <div class="content">
                                <span class="username">{{comment.user.nickname}}:</span>
                                <span class="inner">{{comment.content}}</span>
                                <div v-if="comment.beReplied.length > 0">
                                    <div class="reply">
                                        <span class="username">@{{comment.beReplied[0].user.nickname}}:</span>
                                        <span class="inner">{{comment.beReplied[0].content}}</span>
                                    </div>
                                </div>
                                <div class="time">{{formatDate(comment.time)}}</div>
                            </div>
                        </div>
                        <div class="all">
                            <div class="praise">
                                <span class="icon iconfont">&#xe6c9;</span>
                                <span>{{comment.likedCount}}</span>
                            </div>
                            <div class="icon iconfont2" @click="toreply(comment)">&#xe603;</div>
                        </div>
                    </div>
                </div>


                <div class="newcomments">
                    <span class="title">最新评论({{count}})</span>
                    <div v-for="comment in res"  class="usercomment">
                        <div  class="usercommentcontent">
                            <img :src="comment.user.avatarUrl" alt="" class="avatar">

                            <div class="content">
                                <span class="username">{{comment.user.nickname}}:</span>
                                <span class="inner">{{comment.content}}</span>
                                <div v-if="comment.beReplied.length > 0">
                                    <div class="reply">
                                        <span class="username">@{{comment.beReplied[0].user.nickname}}:</span>
                                        <span class="inner">{{comment.beReplied[0].content}}</span>
                                    </div>
                                </div>
                                <div class="time">{{formatDate(comment.time)}}</div>
                            </div>
                        </div>
                        <div class="all">
                            <div class="praise">
                                <span class="icon iconfont">&#xe6c9;</span>
                                <span>{{comment.likedCount}}</span>
                            </div>
                            <div class="icon iconfont2" @click="toreply(comment)">&#xe603;</div>
                        </div>
                    </div>
                    <el-pagination
                            background
                            layout="prev, pager, next"
                            :page-size="pagesize"
                            :total="count" @current-change="currentChange">
                    </el-pagination>
                </div>
            </div>
    </div>
</template>

<script>
    import {getvideodetail,getvideocomment,getrelatedvideo,getvideourl,usercomment,replycomment} from 'network/homedata'
    import {formatDate} from "common/util"
    export default {
        name: "videopage",
        mixins:[formatDate],
        data(){
          return{
              res:[],
              hot:[],
              relatedvideo:[],

              input:"",
              reply:false,
              replyinfo:"",
              comment:"",
              count:0,
              commentid:"",
              loading:true,
              pagesize:20,//每页的数据条数
              currentPage:1,//默认开始页面

              url:"",
              artists:"",
              name:"",
              publishTime:"",
              playCount:"",
              desc:"",
              avatarUrl:"",
              videoGroup:[],
              praisedCount:0,
              shareCount:0,
              subscribeCount:0
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

            getvideodetail(this.id).then(res => {
                let data = res.data.data
                this.artists = data.creator.nickname
                this.name = data.title
                this.publishTime = data.publishTime
                this.playCount = data.playTime
                this.desc = data.description
                this.avatarUrl = data.creator.avatarUrl
                this.videoGroup = data.videoGroup
                this.praisedCount = data.praisedCount
                this.shareCount = data.shareCount
                this.subscribeCount = data.subscribeCount
            })
            getvideocomment(this.id,20,(this.currentPage - 1) * 20).then(res => {
                this.res = res.data.comments
                this.hot = res.data.hotComments
                this.count = res.data.total
                this.loading = false
            })
            getvideourl(this.id).then(res => {
                this.url = res.data.urls[0].url
            })
            getrelatedvideo(this.id).then(res => {
                this.relatedvideo = res.data.data
            })
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
            goback(){
                this.$router.go(-1)
            },
            //根据页数展示评论
            currentChange(currentPage){
                this.loading = true
                getmvcomment(this.id,20,(currentPage-1)*20).then(res => {
                    this.res = res.data.comments
                    this.loading = false
                })
            },
            videodetail(item){
                if (item.alg === 'alsmv') {
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
            },
            tocomment(){
                let logincookie = sessionStorage.getItem("logincookie")
                if (logincookie) {


                    if (this.reply === true) {
                        replycomment(2,5,this.id,this.replyinfo,this.comment.commentId,logincookie).then(() => {
                            this.input = ""
                            this.$message.success("评论回复成功,刷新页面查看")
                            this.reply = false
                        })
                    }else {


                        if (this.input.length > 0) {
                            usercomment(1, 5, this.id, this.input, logincookie).then(() => {
                                this.input = ""
                                this.$message.success("评论成功,刷新页面查看")
                            })
                        } else {
                            this.$message.error("评论内容不能为空哦")
                        }
                    }
                }else {
                    this.$message.error("请先登录再使用此功能哦")
                }
            },
            toreply(comment){
                let logincookie = sessionStorage.getItem("logincookie")
                if (logincookie) {
                    this.comment = comment
                    this.input = "回复" + comment.user.nickname + " :"
                    this.reply = true
                }else {
                    this.$message.error("请先登录再使用此功能哦")
                }
            }
        },
        //同一路由下不同id跳转 重新读取数据刷新页面
        watch:{
            '$route' () {
                getvideodetail(this.id).then(res => {
                    let data = res.data.data
                    this.artists = data.creator.nickname
                    this.name = data.title
                    this.publishTime = data.publishTime
                    this.playCount = data.playTime
                    this.desc = data.description
                    this.avatarUrl = data.creator.avatarUrl
                    this.videoGroup = data.videoGroup
                    this.praisedCount = data.praisedCount
                    this.shareCount = data.shareCount
                    this.subscribeCount = data.subscribeCount
                })
                getvideocomment(this.id,20,(this.currentPage - 1) * 20).then(res => {
                    this.res = res.data.comments
                    this.hot = res.data.hotComments
                    this.count = res.data.total
                    this.loading = false
                })
                getvideourl(this.id).then(res => {
                    this.url = res.data.urls[0].url
                })
                getrelatedvideo(this.id).then(res => {
                    this.relatedvideo = res.data.data
                })
            },
            input(val){
                if (this.reply === true){
                    let index = val.lastIndexOf(":")
                    let val2 = val.substring(index+1);
                    this.replyinfo = val2
                }
            }
        }
    }
</script>

<style scoped>

    #videopage{
        height: calc(100vh - 160px);
    }

    .headline{
        display: flex;
        justify-content: flex-start;
        position: relative;
        top: 8px;
    }

    .head{
        font-size: 18px;
        font-weight: 800;
    }

    .back{
        position: relative;
        left: 50px;
        top: 20px;
        cursor: pointer;
    }

    .other{
        position: relative;
        top: 20px;
        left: 735px;
    }

    .icon{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconfont{
        font-size:24px;font-style:normal;
    }

    .iconfont2{
        font-size:24px;font-style:normal;
        opacity: .8;
        cursor: pointer;
    }

    .comment{
        font-family: 微软雅黑;
        width: 1120px;
        position: relative;
        top: 20px;
    }

    .comment >>> .el-textarea__inner{
        font-family: 微软雅黑;
        font-size: 14px;
        opacity: .8;
    }

    .comment >>> .el-button{
        margin-top: 20px;
        position: relative;
        left: 93.7%;
        border-radius: 24px;
    }

    .comment >>> .el-button:hover{
        background-color: rgb(220,220,220,.2);
        color: #000;
        border:1px solid rgb(220,220,220,.8);
    }

    .title{
        font-family: 微软雅黑;
        font-weight: 800;
    }

    .hotcomments,.newcomments{
        font-family: 微软雅黑;
    }

    .newcomments{
        margin-top: 20px;
    }

    .newcomments >>> .el-pagination{
        position: relative;
        left: 28%;
        right: 30%;
        margin-top: 4%;
        bottom: 20px;
    }

    .newcomments >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #c62f2f;
    }

    .newcomments >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
        color: #fff;
    }

    .newcomments >>> .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #c62f2f;
    }

    .avatar{
        width: 50px;
        height: 50px;
        border-radius: 24px;
        cursor: pointer;
    }

    .username{
        color: #4D99DE;
        cursor: pointer;
        font-size: 13px;
    }


    .inner{
        margin-left: 6px;
        font-size: 13px;
    }

    .content{
        position: relative;
        top: 4px;
        left: 10px;
    }

    .usercomment{
        margin-top: 10px;
        width: 1050px;
        padding: 10px 0px 0px 0px;
        border-bottom: 1px solid gainsboro;
    }

    .usercommentcontent{
        display: flex;
        justify-content: flex-start;
    }

    .time{
        position: relative;
        margin-top: 14px;
        font-size: 12px;
        opacity: .7;
    }

    .reply{
        padding: 10px 15px 10px 15px;
        background-color: rgb(220,220,220,.4);
        border-radius: 6px;
        position: relative;
        top: 8px;
    }


    .all{
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .praise{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-right: 14px;
        opacity: .8;
    }

    #videocomments{
        position: relative;
        left: 50px;
        margin-top: 10px;
    }

    video{
        width: 750px;
        margin-top: 50px;
        margin-left: 50px;
        border-radius: 5px;
    }

    .artists{
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        font-family: 微软雅黑;
        opacity: .7;
        position: relative;
        left: 54px;
        margin: 15px 0px 15px 0px;
    }

    .name{
        font-family: 微软雅黑;
        width: 730px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 800;
        font-size: 24px;
        position: relative;
        left: 54px;
        margin-top: 5px;
    }

    .publish{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 54px;
    }

    .play{
        margin-left: 10px;
    }

    .desc{
        font-family: 微软雅黑;
        font-weight: 400;
        font-size: 13px;
        margin: 15px 85px 0px 60px;
        opacity: .8;
    }

    .line2{
        display: flex;
    }

    .relatedvideo{
        margin-top: 39px;
        margin-left: 25px;
    }

    img{
        width: 200px;
        height:112px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid gainsboro;
    }

    .relateditem{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 10px;
    }

    .text{
        height: 112px;
        width: 140px;
        position: relative;
        right: 20px;
    }

    .relatedtitle{
        font-size: 13px;
        width: 140px;
        font-family: 微软雅黑;
        font-weight: 400;
        cursor: pointer;
    }

    .creatorname{
        color: rgb(0,0,0,.6);
        position: relative;
        top: 14px;
    }
    
    .creatorname:hover{
        color: rgb(0,0,0,.8);
    }

    .creatname{
        margin-left: 10px;
        cursor: pointer;
    }

    .tags{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        left: 20px;
        flex-wrap: wrap;
    }

    .tagitem{
        margin-left: 5px;
        font-size: 12px;
        font-weight: 400;
        background-color: rgb(220,220,220,.7);
        padding: 2px 8px 2px 8px;
        border-radius: 10px;
    }

    .video{
        width: 800px;
    }

    .videoplaycount{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        position: relative;
        top: 2px;
        right: 370px;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        font-size: 12px;
        white-space: nowrap;
    }

    .duration{
        position: relative;
        top: 93px;
        right: 35px;
        font-size: 12px;
        font-weight: 400;
        color: #fff;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
    }

    .descrbox{
        display: flex;
        white-space: nowrap;
        width: 780px;
        position: relative;
        align-items: center;
        cursor: pointer;
    }

    .desr{
        text-overflow: ellipsis;
        overflow: hidden;
        width: 780px;
        font-family: 微软雅黑;
        font-weight: 400;
        font-size: 13px;
        margin: 10px 85px 0px 60px;
        opacity: .8;
    }

    .desr:hover{
        width: 750px;
        font-size: 14px;
        cursor: pointer;
        white-space: normal;
        background-color: #fff;
        z-index: 20;
    }

    .line3{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        left: 40px;
        top: 15px;
        font-size: 14px;
        font-weight: 300;
    }

    .button{
        width: 80px;
        height: 20px;
        border-radius: 40px;
        border: 1px solid rgba(0,0,0,.2);
        background-color: #fff;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-left: 12px;
        cursor: pointer;
        padding: 3px 10px 3px 10px;
        white-space: nowrap;
    }

    .button:hover{
        background-color: rgba(229, 229, 229, 0.2);
    }

</style>