<template>
    <div>
        <div class="comment">
            <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 4, maxRows: 6}" class="textarea"
                      maxlength="140" minlength="0" show-word-limit resize="none" v-model="input">
            </el-input>
            <el-button>评论</el-button>
        </div>
        <div class="hotcomments" v-if="hot.length > 0">
            <span class="title">精彩评论({{hot.length}})</span>
            <div v-for="comment in hot" class="usercomment">
                <div  class="usercommentcontent">
                    <img :src="comment.user.avatarUrl" alt="" class="avatar">
                    <div class="content">
                        <span class="username">{{comment.user.nickname}}:</span>
                        <span class="inner">{{comment.content}}</span>
                        <div class="time">{{formatDate(comment.time)}}</div>
                    </div>
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
                        <div class="time">{{formatDate(comment.time)}}</div>
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
    </div>
</template>

<script>
    import {getplaylistcomment,gethotcomment} from "network/homedata"

    export default {
        name: "comment",
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
                count:0,
                commentid:"",
                res:"",

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
            })

            //默认展示第一页评论
            getplaylistcomment(this.commentid,20,(this.currentPage-1)*20).then(res => {
                this.res = res.data.comments
                console.log(res);
            })
        },
        methods:{
            //根据页数展示评论
            currentChange(currentPage){
                getplaylistcomment(this.commentid,20,(currentPage-1)*20).then(res => {
                    this.res = res.data.comments
                })
            },
            formatDate (data) {
                var date = new Date(data)
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
                var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return Y + M + D + h + m + s
            }
        }
    }
</script>

<style scoped>
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

    .newcomments{
        margin-top: 20px;
    }

    .newcomments >>> .el-pagination{
        position: relative;
        left: 30%;
        right: 30%;
        margin-top: 20px;
        margin-bottom: 40px;
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
    }

    .username{
        color: #4D99DE;
        cursor: pointer;
    }


    .inner{
        margin-left: 6px;
    }

    .content{
        position: relative;
        top: 4px;
        left: 10px;
    }

    .usercomment{
        margin-top: 10px;
        width: 1050px;
        padding: 10px 0px 18px 0px;
        border-bottom: 1px solid gainsboro;
    }

    .usercommentcontent{
        display: flex;
        justify-content: flex-start;
    }

    .time{
        position: relative;
        margin-top: 10px;
        margin-bottom: 14px;
        font-size: 12px;
        opacity: .7;
    }
</style>