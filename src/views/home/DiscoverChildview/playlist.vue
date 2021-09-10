<template>
    <div id="playlist">
        <div class="nav">
            <button v-html="tag2" @click="showcategory"></button>
            <div class="titlelist">
                <span v-for="item in category" @click="changeOtherlist(item.name)"
                      :class="{active: item.name === tag}">{{item.name}}
                </span>
            </div>
        </div>

        <div class="playlist" v-loading="loading">
            <div v-if="show === true" class="category">
                <div class="line1"><div class="all" @click="changeOtherlist(text)" :class="{active2: text === tag}">全部歌单</div></div>
                <div class="line2">
                    <div class="cate"><div class="icon2">&#xe632;</div><div class="catename">{{categories[0]}}</div></div>
                    <div class="taginner">
                        <div v-for="item in sub" v-if="item.category === 0" class="tagname" @click="changeOtherlist(item.name)" >
                            <div :class="{active3: item.name === tag}" class="inner">
                                {{item.name}}
                                <div v-if="item.hot === true" class="icon iconfont2">&#xe740;</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line2">
                    <div class="cate"><div class="icon2">&#xe90a;</div><div class="catename">{{categories[1]}}</div></div>
                    <div class="taginner">
                        <div v-for="item in sub" v-if="item.category === 1" class="tagname" @click="changeOtherlist(item.name)">
                            <div :class="{active3: item.name === tag}" class="inner">
                                {{item.name}}
                                <div v-if="item.hot === true" class="icon iconfont2">&#xe740;</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line2">
                    <div class="cate"><div class="icon2">&#xe623;</div><div class="catename">{{categories[2]}}</div>
                    </div>
                    <div class="taginner">
                        <div v-for="item in sub" v-if="item.category === 2" class="tagname" @click="changeOtherlist(item.name)">
                            <div :class="{active3: item.name === tag}" class="inner">
                                {{item.name}}
                                <div v-if="item.hot === true" class="icon iconfont2">&#xe740;</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line2">
                    <div class="cate"><div class="icon2">&#xe63a;</div><div class="catename">{{categories[3]}}</div>
                    </div>
                    <div class="taginner">
                        <div v-for="item in sub" v-if="item.category === 3" class="tagname" @click="changeOtherlist(item.name)">
                            <div :class="{active3: item.name === tag}" class="inner">
                                {{item.name}}
                                <div v-if="item.hot === true" class="icon iconfont2">&#xe740;</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line2">
                    <div class="cate"><div class="icon2">&#xe640;</div><div class="catename">{{categories[4]}}</div>
                    </div>
                    <div class="taginner">
                        <div v-for="item in sub" v-if="item.category === 4" class="tagname" @click="changeOtherlist(item.name)">
                            <div :class="{active3: item.name === tag}" class="inner">
                                {{item.name}}
                                <div v-if="item.hot === true" class="icon iconfont2">&#xe740;</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="line2"></div>
            </div>
            <div v-for="item in playlist">
                <div class="imgbox" @click="listdetail(item.id)">
                    <div class="imgboxcontent" v-if="item.playCount >= 10000">
                        <i class="el-icon-caret-right"></i>
                        {{parseInt(item.playCount/10000)}}万
                    </div>
                    <div class="imgboxcontent" v-if="item.playCount < 10000">
                        <i class="el-icon-caret-right"></i>
                        {{item.playCount}}
                    </div>
                    <img :src="item.coverImgUrl">
                    <div class="creator">
                        <div class="icon iconfont1">&#xe635;</div>
                        <div class="creatorname">
                            <div class="nickname">{{item.creator.nickname}}</div>
                            <div class="level" v-if="item.creator.avatarDetail != null">
                                <div v-if="item.creator.avatarDetail.userType === 10 || item.creator.avatarDetail.userType === 2" class="icon iconfont2">&#xe60d;</div>
                                <div v-if="item.creator.avatarDetail.userType === 200" class="icon iconfont3">&#xe645;</div>
                                <div v-if="item.creator.avatarDetail.userType === 4" class="icon iconfont4">&#xeb25;</div>
                            </div>
                        </div>
                    </div>
                    <div id="button">
                        <i class="el-icon-caret-right" id="player"></i>
                    </div>
                </div>
                <div class="name" @click="listdetail(item.id)">{{item.name}}</div>
            </div>
        </div>

        <div class="page">
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="50"
                    :total="count" @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {gethotcategory,getlist,getalltag} from "network/homedata"
    export default {
        name: "playlist",
        data(){
            return{
                loading:true,
                count:0,
                category:[],
                currentPage:1,
                playlist:[],
                //用于传参
                text:"全部",
                //用于动态控制
                tag:"全部",
                //用于显示
                tag2:"全部 >",
                show:false,
                categories:[],
                sub:[]
            }
        },
        created(){
            //分类栏
            gethotcategory().then(res => {
                this.category = res.data.tags
            })

            //全部歌曲
            getlist(this.tag,50,(this.currentPage-1)*50).then(res => {
                this.playlist = res.data.playlists
                this.count = res.data.total
                this.loading = false
            })

            //分类标签
            getalltag().then(res => {
                this.categories = res.data.categories
                this.sub = res.data.sub
            })
        },
        watch:{
          tag(val){
              this.loading = true
              getlist(val,50,(this.currentPage-1)*50).then(res => {
                  this.playlist = res.data.playlists
                  this.count = res.data.total
                  this.loading = false
              })
          }
        },
        methods:{
            //其他页
            currentChange(currentPage){
                getlist(this.tag,50,(currentPage-1)*50).then(res => {
                    this.playlist = res.data.playlists
                })
            },
            changeOtherlist(cat){
                this.show = false
                this.tag = cat
                this.tag2 = this.tag + " >"
            },
            listdetail(id){
                this.$router.push('/songlist/' + id)
            },
            showcategory(){
                this.show = !this.show
            }
        }
    }
</script>

<style scoped>

    #playlist{
        width: 1200px;
        margin: 0 auto;
    }

    .icon{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        font-size:16px;font-style:normal;
    }

    .icon2{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        font-size:30px;font-style:normal;
        opacity: .5;
    }

    .iconfont2{
        color: #ff3707;
    }

    .iconfont3{
        color: yellow;

    }

    .iconfont4{
        color: #ff4200;
    }

    .nav{
        display: flex;
        align-items: center;
        margin-top: 10px;
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
        margin-left: 26px;
    }

    button:hover{
        background-color: rgb(220,220,220,.3);
    }

    .titlelist{
        margin-left: 260px;
        display: flex;
        align-items: center;
    }

    span{
        margin-left: 20px;
        font-size: 13px;
        color: rgb(0,0,0,.4);
        font-family: 微软雅黑;
        cursor: pointer;
        padding: 0px 10px 0px 10px;
    }

    span:hover{
        color: #d03535;
        opacity: .8;
    }

    .page >>> .el-pagination{
        position: relative;
        left: 31%;
        right: 30%;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .page >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #c62f2f;
    }

    .page >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
        color: #fff;
    }

    .page >>> .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #c62f2f;
    }

    .playlist{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        position: relative;
        right: 5px;
        z-index: 1;
    }

    img{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        box-shadow: 5px 5px 5px 5px gainsboro;
        cursor: pointer;
    }

    .imgbox{
        height: 200px;
        width: 200px;
        margin-left: 30px;
    }

    .imgboxcontent{
        width: 40%;
        white-space: nowrap;
        z-index: 5;
        position: relative;
        top: 24px;
        left: 110px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #fff;
        font-family: 微软雅黑;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        font-size: 13px;
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

    #player{
        font-size: 20px;
        color: #c62f2f;
        position: absolute;
        left: 14%;
        bottom: 14%;
    }

    .active{
        opacity: .8;
        line-height: 30px;
        background-color: #fcf4f4;
        color: #d03535;
        border-radius: 20px;
    }

    .name {
        font-family: 微软雅黑;
        width: 200px;
        height: auto;
        font-size: 14px;
        margin-top: 18%;
        margin-left: 34px;
        color: rgb(0,0,0,.7);
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
    }

    .name:hover{
        color: rgb(0,0,0,.9);
    }

    .creator{
        display: flex;
        justify-content: flex-start;
        font-family: 微软雅黑;
        position: relative;
        bottom: 34px;
        left: 14px;
        color: #fff;
        cursor: pointer;
    }

    .creatorname{
        display: flex;
        justify-content: flex-start;
        width: 140px;
        margin-left: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        bottom: 1px;
        font-size: 14px;
    }

    .iconfont1,.nickname{
        text-shadow: rgb(0 0 0) 0 0 2px;
    }

    .level{
        position: relative;
        top:3px;
        left: 5px;
    }

    .category{
        font-family: 微软雅黑;
        font-size: 14px;
        overflow: hidden;
        position: absolute;
        left: 30px;
        top: 20px;
        border: 1px solid gainsboro;
        width: 60%;
        z-index: 20;
        background: #fff;
        padding-top: 20px;
        border-radius: 10px;
    }

    .line1{
        border-bottom: 1px solid gainsboro;
        font-family: 微软雅黑;
        font-size: 15px;
    }

    .line2{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        font-size: 14px;
        padding: 34px 0px 0px 34px;
    }

    .all{
        padding: 10px 20px 10px 20px;
        margin-bottom: 20px;
        margin-left: 20px;
        width: 60px;
        cursor: pointer;
        color: rgb(0,0,0,.6);
    }

    .all:hover{
        color: #d03535;
    }

    .active2{
        font-size: 15px;
        background-color: #fcf4f4;
        color: #d03535;
        border-radius: 24px;
    }

    .cate{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        position: relative;
        top: 6px;
    }

    .catename{
        opacity: .5;
        white-space: nowrap;
        /*margin-left: 10px;*/
    }

    .taginner{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        position: relative;
        top: 1.4px;
        margin-left: 40px;
    }

    .tagname{
        display: flex;
        opacity: .7;
        cursor: pointer;
        width: 100px;
        text-overflow: ellipsis;
        margin-left: 10px;
        line-height: 44px;
    }

    .tagname:hover{
        color: #d03535;
    }

    .inner{
        padding: 0px 10px 0px 10px;
        display: flex;
        align-items: center;
    }

    .active3{
        background-color: #fcf4f4;
        color: #d03535;
        border-radius: 24px;
    }

</style>