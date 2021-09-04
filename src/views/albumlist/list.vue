<template>
    <div class="lists">
        <div class="title"><span class="songtitle">音乐标题</span><span class="singertitle">歌手</span><span class="albumtitle">专辑</span><span class="time">时长</span></div>
        <div class="allsong">
            <div v-for="(item,index) in allsong[0]" class="songs" id="song"
                 :class="{bgc: index%2 === 0,active: item.id === playerbackid,
                 copyrights: item.noCopyrightRcmd !== null}"
                 @dblclick="addsongtoplay(item)">

                <div class="number"><span>{{PrefixZero(index + 1)}}</span></div>
                <div class="allicon">
                    <span class="icon iconfont1" v-if="item.mv !== 0" @click="mvdetail(item.mv)">&#xe62c;</span>
                    <span class="icon iconfont" v-if="item.fee === 1">&#xe7d4;</span>
                    <span class="icon iconfont2" v-if="item.fee === 1">&#xe671;</span>
                </div>
                <div class="name"><span>{{item.name}}</span><span v-if="item.alia[0]" class="alia">({{item.alia[0]}})</span></div>
                <div class="singer"><span>{{item.ar[0].name}}</span></div>
                <div class="album"><span>{{item.al.name}}</span></div>
                <div class="length"><span>{{format(item.dt)}}</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getsongurl} from 'network/homedata'
    export default {
        name: "list",
        methods:{
            format (data) {
                var date = new Date(data)
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return m + s
            },
            PrefixZero(num) { //序号不足两位往前补0
                if (parseInt(num) < 10){
                    return '0' + num
                }
                else {
                    return num
                }
            },
            addsongtoplay(item){
                if (item.noCopyrightRcmd !== null) {
                    this.$message.error('因版权问题，该歌曲已下架')
                }else {
                    this.$store.commit('changebackid',item.id)
                    getsongurl(item.id).then(res => {
                        this.$store.commit('workchangesong',{res,item})
                    },500)
                }
            },
            mvdetail(id){
                this.$router.push('/mvpage/' +  id)
            }
        },
        computed:{
            allsong(){
                return this.$store.state.songset
            },
            playerbackid(){
                return this.$store.state.playerbackid
            },
        },
    }
</script>

<style scoped>
    .allicon{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 50px;
        margin-left: 34px;
        position: relative;
        right: 16px;
        position: relative;
        top: 1px;
    }

    .icon{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconfont{
        font-size:22px;font-style:normal;
        color: red;margin-left: 4px;
    }

    .iconfont1{
        font-size:18px;font-style:normal;
        color: red;margin-left: 4px;
    }

    .iconfont2{
        font-size:26px;font-style:normal;
        color: red;margin-left: 4px;
    }

    .lists{
        margin-bottom: 14px;
    }

    .allsong{
        margin: 16px 34px 0px 34px;
    }

    .title{
        width: 100%;
        font-family: 微软雅黑;
        display: flex;
        color: #000;
        opacity: .5;
    }

    .songtitle{
        position: relative;
        left: 17%;
    }

    .singertitle{
        position: relative;
        left: 39.7%;
    }

    .albumtitle{
        position: relative;
        left: 56.8%;
    }

    .time{
        position: relative;
        left: 74%;
    }

    .songs{
        display: flex;
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
        margin-left: 26px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        z-index: 10;
    }

    .name{
        width: 240px;
        position: relative;
        right: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .alia{
        position: relative;
        left: 5px;
    }

    .singer{
        color: rgb(80, 125, 175);
        width: 160px;
        position: relative;
        left: 95px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .album{
        width: 180px;
        position: relative;
        left: 175px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .length{
        width: 40px;
        position: relative;
        left: 235px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .bgc{
        background-color: rgb(220,220,220,.2);
    }

    .songs:hover{
        background-color: rgb(220,220,220,.4);
    }

    .active .name{
        color: #c62f2f;
    }

    .active .number{
        color: #c62f2f;
    }

    .copyrights .name{
        opacity: .2;
    }
</style>