<template>
    <div v-loading="loading">
        <div class="comment">
            <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 4, maxRows: 6}" class="textarea"
                      maxlength="140" minlength="0" show-word-limit resize="none" v-model="input" ref="inputs">
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
</template>

<script>
    import {getplaylistcomment,gethotcomment,usercomment,replycomment} from "network/homedata"
    import {formatDate} from "common/util"
    export default {
        name: "comment",
        mixins:[formatDate],
        props:{
            comments:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                input:"",
                reply:false,
                replyinfo:"",
                comment:"",
                count:0,
                commentid:"",
                res:"",
                loading:true,

                hot:[],
                pagesize:20,//每页的数据条数
                currentPage:1,//默认开始页面
            }
        },
        created(){
            //总评论条数
            this.count = this.comments[0]
            //当前歌单id
            this.commentid = this.comments[1]

            //获取精彩评论
            gethotcomment(this.commentid,20).then(res => {
                this.hot = res.data.hotComments
                this.loading = false
            })

            //默认展示第一页评论
            getplaylistcomment(this.commentid,20,(this.currentPage-1)*20).then(res => {
                this.res = res.data.comments
            })
        },
        methods:{
            //根据页数展示评论
            currentChange(currentPage){
                getplaylistcomment(this.commentid,20,(currentPage-1)*20).then(res => {
                    this.res = res.data.comments
                })
            },
            tocomment(){
                let logincookie = sessionStorage.getItem("logincookie")
                if (logincookie) {

                    if (this.reply === true) {
                        replycomment(2,2,this.id,this.replyinfo,this.comment.commentId,logincookie).then(() => {
                            this.input = ""
                            this.$message.success("评论回复成功,刷新页面查看")
                            this.reply = false
                        })
                    }else {
                        if (this.input.length > 0){
                            usercomment(1,2,this.id,this.input,logincookie).then(() => {
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
        computed:{
            id(){
                return this.$route.params.id
            }
        },
        watch:{
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
        margin-top: 14px;
        width: 1120px;
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
        margin-top: 40px;
        margin-bottom: 40px;
        bottom: 14px;
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

</style>