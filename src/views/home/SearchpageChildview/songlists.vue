<template>
    <div class="playlist">
        <div class="searchtitle">已为您找到{{count}}个关于"{{keywords}}"的歌单</div>
        <div v-loading="loading">
            <div v-for="(item,index) in songlists" class="playlistitem" :class="{bgc: index%2 === 0}" @click="listdetail(item.id)">
                <img :src="item.coverImgUrl" alt="">
                <div class="name">{{item.name}}</div>
                <div class="count">{{item.trackCount}}首</div>
                <div class="creatorline">by <div class="creatorname">{{item.creator.nickname}}</div></div>
            </div>
        </div>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pagesize"
                :total="count" @current-change="currentChange">
        </el-pagination>
    </div>
</template>

<script>
    import {tosearch} from "network/homedata"
    export default {
        name: "songlists",
        data(){
          return {
              loading:true,
              page:0,
              pagesize:20,
              count:0,
              songlists:[]
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

            tosearch(this.keywords,20,this.page * 20,1000).then(res => {
                this.count = res.data.result.playlistCount
                this.songlists = res.data.result.playlists
                this.loading = false
            })

        },
        methods:{
            currentChange(currentPage){
                tosearch(this.keywords,20,(currentPage - 1) * 20,1000).then(res => {
                    this.songlists = res.data.result.playlists
                    this.loading = false
                })
            },
            listdetail(id){
                this.$router.push('/songlist/' + id)
            }
        },
        computed:{
            keywords(){
                return this.$store.state.searchkeywords
            }
        },
        watch:{
            keywords(val){
                this.loading = true
                tosearch(val,20,this.page * 20,1000).then(res => {
                    this.count = res.data.result.playlistCount
                    this.songlists = res.data.result.playlists
                    this.loading = false
                })
            }
        },
    }
</script>

<style scoped>

    .playlist{
        width: 1200px;
        margin: 0 auto;
    }

    .searchtitle{
        margin: 10px 0px 20px 20px;
        font-weight: 600;
        font-family: 微软雅黑;
        font-size: 14px;
    }

    img{
        width: 70px;
        height: 70px;
        border: 1px solid gainsboro;
        border-radius: 5px;
        margin-left: 40px;
    }

    .bgc{
        background-color: rgb(220,220,220,.2);
    }

    .name{
        margin-left: 20px;
        font-size: 14px;
        font-family: 微软雅黑;
        font-weight: 400;
        width: 500px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        opacity: .7;
    }

    .count{
        font-size: 13px;
        font-family: 微软雅黑;
        font-weight: 400;
        opacity: .5;
        width: 200px;
    }

    .creatorline{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-left: 140px;
        font-weight: 400;
        font-size: 13px;
        color: rgb(0,0,0,.3);
    }

    .creatorname{
        color: rgb(0,0,0,.6);
    }

    .creatorname:hover{
        color: rgb(0,0,0,.9);
    }

    .playlistitem:hover{
        background-color: rgb(220,220,220,.4);
    }

    .playlistitem{
        display: flex;
        align-items: center;
        cursor: pointer;
        line-height: 100px;
    }

    .playlist >>> .el-pagination{
        position: relative;
        left: 28%;
        right: 30%;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .playlist >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #c62f2f;
    }

    .playlist >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
        color: #fff;
    }

    .playlist >>> .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #c62f2f;
    }
</style>