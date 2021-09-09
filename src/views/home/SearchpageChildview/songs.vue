<template>
    <div class="searchsongs">
        <div class="searchtitle">已为您找到{{count}}首关于"{{keywords}}"的单曲</div>
        <div class="title"><span class="songtitle">音乐标题</span><span class="singertitle">歌手</span><span class="albumtitle">专辑</span><span class="time">时长</span></div>
            <div class="allsong" v-loading="loading">
                <div v-for="(item,index) in allsong" class="songs" id="song"
                     :class="{bgc: index%2 === 0,active: item.id === playerbackid,}"
                     @dblclick="addsongtoplay(item)">

                    <div class="number"><span>{{PrefixZero(index + 1)}}</span></div>
                    <div class="name">
                        <div class="name2">{{item.name}}</div><div v-if="item.alias.length > 0" class="alia">({{item.alias[0]}})</div>
                        <div class="allicon">
                            <span class="icon iconfont1" v-if="item.mvid" @click="mvdetail(item.mvid)">&#xe674;</span>
                            <span class="icon iconfont" v-if="item.fee === 1">&#xe7d4;</span>
                            <span class="icon iconfont2" v-if="item.fee === 1">&#xe671;</span>
                            <span>
                                <img src="~assets/sq.png" alt="" class="sqicon">
                            </span>
                        </div>
                    </div>
                    <div class="singer"><span @click="singerdetail(item.artists[0].id)">{{item.artists[0].name}}</span></div>
                    <div class="album"><span @click="albumdetail(item.album.id)">{{item.album.name}}</span></div>
                    <div class="length"><span>{{format(item.duration)}}</span></div>
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
    import {tosearch,getsongurl} from "network/homedata"
    export default {
        name: "songs",
        data(){
          return {
              loading:true,
              page:0,
              pagesize:100,
              count:0,
              songs:[]
          }
        },
        methods:{
            currentChange(currentPage){
                tosearch(this.keywords,100,(currentPage-1) * 100,1).then(res => {
                    this.$store.commit('cleansongset')
                    this.$store.commit('pushallsong',res.data.result.songs)
                })
            },
            addsongtoplay(item){
                this.$store.commit('changebackid',item.id)
                getsongurl(item.id).then(res => {
                    this.$store.commit('workchangesong',{res,item})
                },500)
            },
            PrefixZero(num) { //序号不足两位往前补0
                if (parseInt(num) < 10){
                    return '0' + num
                }
                else {
                    return num
                }
            },
            format (data) {
                var date = new Date(data)
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return m + s
            },
            mvdetail(id){
                this.$router.push('/mvpage/' +  id)
            },
            singerdetail(id){
                this.$router.push('/singerlist/' + id)
            },
            albumdetail(id){
                this.$router.push('/albumlist/' + id)
            }
        },
        created(){
            tosearch(this.keywords,100,this.page * 100,1).then(res => {
                this.count = res.data.result.songCount
                this.$store.commit('cleansongset')
                this.$store.commit('pushallsong',res.data.result.songs)
                this.$store.commit('changeflag',2)
                this.loading = false
            })
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
        },
        computed:{
            keywords(){
                return this.$store.state.searchkeywords
            },
            allsong(){
                return this.$store.state.songset[0]
            },
            playerbackid(){
                return this.$store.state.playerbackid
            }
        },
        watch:{
            keywords(val){
                this.loading = true
                tosearch(val,100,this.page * 100,1).then(res => {
                    this.$store.commit('cleansongset')
                    this.count = res.data.result.songCount
                    this.$store.commit('pushallsong',res.data.result.songs)
                    this.loading = false
                })
            }
        },
        activated(){
            //防止与最新音乐页面歌曲混乱
            this.loading = true
            tosearch(this.keywords,100,this.page * 100,1).then(res => {
                this.count = res.data.result.songCount
                this.$store.commit('cleansongset')
                this.$store.commit('pushallsong',res.data.result.songs)
                this.$store.commit('changeflag',2)
                this.loading = false
            })
        }
    }
</script>

<style scoped>

    .title{
        width: 100%;
        font-family: 微软雅黑;
        display: flex;
        color: #000;
        opacity: .5;
        font-size: 14px;
    }

    .songtitle{
        position: relative;
        left: 10%;
    }

    .singertitle{
        position: relative;
        left: 42%;
    }

    .albumtitle{
        position: relative;
        left: 58.5%;
    }

    .time{
        position: relative;
        left: 78.5%;
    }

    .searchtitle{
        margin: 10px 0px 20px 20px;
        font-weight: 600;
        font-family: 微软雅黑;
        font-size: 14px;
    }

    .allicon{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-left: 5px;
        position: relative;
        top: 1px;
    }

    .icon{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .sqicon{
        width: 24px;
        height: 26.4px;
        position: relative;
        top: 8.2px;
        margin-left: 5px;
    }

    .iconfont{
        font-size:22px;font-style:normal;
        color: red;margin-left: 4px;
    }

    .iconfont1{
        font-size:22px;font-style:normal;
        color: red;margin-left: 4px;
        position: relative;
    }

    .iconfont2{
        font-size:26px;font-style:normal;
        color: red;margin-left: 4px;
    }

    .allsong{
        position: relative;
        top: 14px;
        font-family: 微软雅黑;
        z-index: 1;
    }

    .songs{
        display: flex;
        align-items: center;
        cursor: pointer;
        background-color: #fff;
        line-height: 50px;
        opacity: .8;
        width: 100%;
        font-weight: 300;
        mso-bidi-font-weight:200;
        font-size: 15px;
    }

    .number{
        width: 70px;
        opacity: .6;
        margin-left: 46px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        right: 20px;
        font-size: 13px;
    }

    .name{
        width: 400px;
        position: relative;
        left: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 13px;
    }

    .alia{
        position: relative;
        left: 5px;
    }

    .singer{
        color: rgb(80, 125, 175);
        width: 160px;
        position: relative;
        left: 55px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 13px;
    }

    .album{
        width: 180px;
        position: relative;
        left: 125px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 13px;
    }
    .length{
        width: 40px;
        position: relative;
        left: 220px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 13px;
    }

    .bgc{
        background-color: rgb(220,220,220,.2);
    }

    .songs:hover{
        background-color: rgb(220,220,220,.4);
    }

    .active .name2{
        color: #c62f2f;
    }

    .active .number{
        color: #c62f2f;
    }

    .name2{
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .searchsongs >>> .el-pagination{
        position: relative;
        left: 28%;
        right: 30%;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .searchsongs >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #c62f2f;
    }

    .searchsongs >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
        color: #fff;
    }

    .searchsongs >>> .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #c62f2f;
    }

</style>