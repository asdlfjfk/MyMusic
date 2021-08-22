<template>
    <div class="lists">
        <div class="title"><span class="songtitle">音乐标题</span><span class="singletitle">歌手</span><span class="albumtitle">专辑</span><span class="time">时长</span></div>
        <div class="allsong">
            <div v-for="(item,index) in allsong" class="songs" id="song"
                 :class="{bgc: index%2 === 0,active: item.data.songs[0].id === playerbackid,
                 copyrights: item.data.songs[0].noCopyrightRcmd !== null}"
                 @click="addsongtoplay(item)">

                <div class="number"><span>{{PrefixZero(index + 1)}}</span></div>
                <div class="icon">
                    <span class="iconfont" v-if="item.data.songs[0].mv !== 0">&#xe62c;</span>
                    <span class="iconfont" v-if="item.data.songs[0].fee === 1">&#xe7d4;</span>
                </div>
                <div class="name"><span>{{item.data.songs[0].name}}</span></div>
                <div class="single"><span>{{item.data.songs[0].ar[0].name}}</span></div>
                <div class="album"><span>{{item.data.songs[0].al.name}}</span></div>
                <div class="length"><span>{{format(item.data.songs[0].dt)}}</span></div>

            </div>
        </div>
    </div>
</template>

<script>
    import {getsongurl} from '../../network/homedata'
    export default {
        name: "list",
        data(){
          return {
              // currentindex: ""
          }
        },
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
                if (item.data.songs[0].noCopyrightRcmd !== null) {
                    this.$message.error('因版权问题，该歌曲已下架')
                }else {
                    this.$store.commit('changebackid',item.data.songs[0].id)
                    getsongurl(item.data.songs[0].id).then(res => {
                        this.$store.commit('changesong',{res,item})
                    },500)
                }
            },
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

    .iconfont{
        font-family:"iconfont" !important;
        font-size:20px;font-style:normal;
        color: red;margin-left: 4px;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .lists{
        margin-bottom: 14px;
    }

    .allsong{
        margin-top: 16px;
    }

    .title{
        position: relative;
        width: 100%;
        font-family: 微软雅黑;
        display: flex;
        color: #000;
        opacity: .4;
    }

    .icon{
        display: flex;
        justify-content: flex-end;
        width: 50px;
        margin-left: 34px;
        position: relative;
        right: 16px;
    }

    .songtitle{
        position: relative;
        left: 15%;
    }

    .singletitle{
        position: relative;
        left: 39%;
    }

    .albumtitle{
        position: relative;
        left: 57%;
    }

    .time{
        position: relative;
        left: 75%;
    }

    .songs{
        display: flex;
        cursor: pointer;
        background-color: #fff;
        line-height: 50px;
        opacity: .55;
        width: 100%;
        font-family: 微软雅黑;
        font-size: 15px;
    }

    .number{
        width: 70px;
        opacity: .6;
        margin-left: 26px;
    }

    .name{
        width: 240px;
        position: relative;
        right: 5px;
    }

    .single{
        color: rgb(80, 125, 175);
        width: 160px;
        position: relative;
        left: 95px;
    }

    .album{
        width: 180px;
        position: relative;
        left: 175px;
    }
    .length{
        width: 40px;
        position: relative;
        left: 235px;
    }

    span{
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

    .copyrights .name{
        opacity: .2;
    }

</style>