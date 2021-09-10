<template>
    <div class="singerlist">
        <div class="searchtitle">已为您找到关于"{{keywords}}"的{{count}}位歌手</div>
        <div v-loading="loading">
            <div v-for="(item,index) in singers" class="singerlistitem" :class="{bgc: index%2 === 0}" @click="listdetail(item.id)">
                <img :src="item.img1v1Url" alt="">
                <div class="name">{{item.name}}</div>
                <div v-if="item.accountId" class="iconfont">&#xe663;</div>
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
        name: "singers",
        data(){
            return {
                loading:true,
                page:0,
                pagesize:20,
                count:0,
                singers:[]
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

            tosearch(this.keywords,20,this.page * 20,100).then(res => {
                this.count = res.data.result.artistCount
                this.singers = res.data.result.artists
                this.loading = false
            })

        },
        methods:{
            currentChange(currentPage){
                tosearch(this.keywords,20,(currentPage - 1) * 20,100).then(res => {
                    this.singers = res.data.result.artists
                    this.loading = false
                })
            },
            listdetail(id){
                this.$router.push('/singerlist/' + id)
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
                tosearch(val,20,this.page * 20,100).then(res => {
                    this.count = res.data.result.artistCount
                    this.singers = res.data.result.artists
                    this.loading = false
                })
            }
        },
    }
</script>

<style scoped>

    .singerlist{
        width: 1200px;
        margin: 0 auto;
    }

    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        color: red;
        -moz-osx-font-smoothing: grayscale;}

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
        width: 1000px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        opacity: .7;
    }

    .creatorname{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: rgba(103, 109, 217, 0.6);
        font-size: 13px;
        font-family: 微软雅黑;
        font-weight: 400;
    }

    .alia{
        color: #b4b4b4;
    }

    .singerlistitem:hover{
        background-color: rgb(220,220,220,.4);
    }

    .singerlistitem{
        display: flex;
        align-items: center;
        cursor: pointer;
        line-height: 100px;
    }

    .singerlist >>> .el-pagination{
        position: relative;
        left: 28%;
        right: 30%;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .singerlist >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #c62f2f;
    }

    .singerlist >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
        color: #fff;
    }

    .singerlist >>> .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #c62f2f;
    }
</style>