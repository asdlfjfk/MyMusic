<template>
    <div id="recovideo">
        <div class="nav">
            <button v-html="tag2" @click="showcategory"></button>
            <div class="titlelist">
                <span v-for="item in category" @click="changeOtherlist(item)"
                      :class="{active: item.name === tag}">{{item.name}}
                </span>
            </div>
        </div>

        <div class="videos">
            <div v-if="show === true" class="category">
                <div v-for="item in allcategory" class="cateitem" @click="changeOtherlist(item)">
                    <div class="catename" :class="{active2: item.name === tag}">{{item.name}}</div>
                </div>
            </div>
            <div v-for="item in videos">
                <div class="mvplaycount" v-if="item.data.playTime && item.data.playTime >= 10000">
                    <i class="el-icon-caret-right"></i>
                    {{parseInt(item.data.playTime / 10000)}}万
                </div>
                <div class="mvplaycount" v-if="item.data.playTime && item.data.playTime < 10000">
                    <i class="el-icon-caret-right"></i>
                    {{item.data.playTime}}
                </div>

                <div class="mvplaycount" v-if="item.data.playCount && item.data.playCount >= 10000">
                    <i class="el-icon-caret-right"></i>
                    {{parseInt(item.data.playCount / 10000)}}万
                </div>
                <div class="mvplaycount" v-if="item.data.playCount && item.data.playCount < 10000">
                    <i class="el-icon-caret-right"></i>
                    {{item.data.playCount}}
                </div>
                <img :src="item.data.coverUrl" @click="videodetail(item.data)">
                <div class="mvname" @click="videodetail(item.data)" v-if="item.data.title">{{item.data.title}}</div>
                <div class="mvname" @click="videodetail(item.data)" v-if="item.data.name">{{item.data.name}}</div>
                <div class="artistname" v-if="item.data.creator">{{item.data.creator.nickname}}</div>
                <div class="artistname" v-if="item.data.artists">{{item.data.artists[0].name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getvideolist,getvideocategorylist,getvideogroup,getallvideo} from "network/homedata"
    export default {
        name: "recovideo",
        data(){
          return {
              videos:[],
              category:[],
              allcategory:[],
              page:0,
              show:false,
              tag:"热门",
              //用于显示
              tag2:"热门 >",
          }
        },
        created(){
            let logincookie = sessionStorage.getItem("logincookie")
            if (logincookie) {
                getallvideo(logincookie).then(res => {
                    this.videos = res.data.datas
                })
                getvideocategorylist(logincookie).then(res => {
                    this.category = res.data.data
                })
                getvideolist().then(res => {
                    this.allcategory = res.data.data
                })
            }
            else {
                this.$message.error("请先登陆哦")
            }
        },
        methods:{
            changeOtherlist(item){
                let logincookie = sessionStorage.getItem("logincookie")
                this.show = false
                this.tag = item.name
                this.tag2 = this.tag + " >"
                getvideogroup(item.id,logincookie).then(res => {
                    this.videos = res.data.datas
                })
            },
            showcategory(){
                this.show = !this.show
            },
            videodetail(item){
                if (item.id) {
                    this.$router.push('/mvpage/' +  item.id)
                }
                else {
                    this.$router.push('/videopage/' +  item.vid)
                }
            }
        }
    }
</script>

<style scoped>
    .nav{
        display: flex;
        align-items: center;
        position: relative;
        top: 15px;
        z-index: 20;
    }

    button{
        width: 120px;
        height: 35px;
        border-radius: 24px;
        font-size: 15px;
        border: 1.5px solid gainsboro;
        background-color: #fff;
        font-family: 微软雅黑;
        cursor: pointer;
        margin-left: 44px;
    }

    button:hover{
        background-color: rgb(220,220,220,.3);
    }

    span{
        margin-left: 20px;
        font-size: 13px;
        padding: 0px 10px 0px 10px;
        color: rgb(0,0,0,.4);
        font-family: 微软雅黑;
        cursor: pointer;
    }

    span:hover{
        color: #d03535;
        opacity: .8;
    }

    .titlelist{
        margin-left: 340px;
        display: flex;
        align-items: center;
    }

    .active{
        opacity: .8;
        line-height: 30px;
        background-color: #fcf4f4;
        color: #d03535;
        border-radius: 20px;
    }

    .active2{
        background-color: #f9f1f1;
        color: red;
        opacity: .8;
        border-radius: 10px;
    }

    img{
        width: 240px;
        height: 140px;
        border-radius: 5px;
        margin: 20px 0px 0px 15px;
        cursor: pointer;
        border: 1px solid gainsboro;
    }

    .videos{
        display: flex;
        flex-wrap: wrap;
        margin-left: 66px;
    }

    .category{
        font-family: 微软雅黑;
        font-size: 14px;
        overflow: hidden;
        position: absolute;
        left: 370px;
        top: 200px;
        border: 1px solid gainsboro;
        width: 53%;
        z-index: 20;
        background: #fff;
        padding:10px 10px 10px 10px;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        cursor: pointer;
    }

    .cateitem{
        padding: 7px 10px 7px 10px;
        width: 60px;
        white-space: nowrap;
    }

    .catename{
        padding: 3px 10px 3px 10px;
        text-align: center;
        opacity: .6;
        font-family: 微软雅黑;
        font-size: 12px;
        font-weight: 400;
    }

    .catename:hover{
        color: red;
    }

    .mvplaycount{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        position: relative;
        top: 42px;
        right: 8px;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        z-index: 10;
        font-size: 13px;
        font-weight: 400;
    }

    .mvname{
        width: 240px;
        font-size: 14px;
        font-weight: 400;
        color: rgb(0,0,0,.7);
        cursor: pointer;
        margin-top: 5px;
        margin-left: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .mvname:hover{
        color: rgb(0,0,0);
    }

    .artistname{
        font-size: 12px;
        margin-left: 15px;
        font-weight: 400;
        color: rgb(0,0,0,.5);
        cursor: pointer;
    }

    .artistname:hover{
        color: rgb(0,0,0);
    }
</style>