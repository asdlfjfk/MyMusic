<template>
    <div>
        <div class="playall" @click="pushallsong"><div class="text"><i class="el-icon-caret-right"></i>播放全部</div></div>
        <div class="button" @click="pushallsong"><div class="text"><i class="el-icon-folder-add"></i>收藏全部</div></div>
        <div class="allsong">
            <div v-for="(item,index) in allsong" class="songs" id="song"
                 :class="{bgc: index%2 === 0,active: item.id === playerbackid,}"
                 @dblclick="addsongtoplay(item)">

                <div class="number"><span>{{PrefixZero(index + 1)}}</span></div>
                <div><img :src="item.album.blurPicUrl" alt=""></div>
                <div class="button2">
                    <i class="el-icon-caret-right player"></i>
                </div>
                <div class="name">
                    <div class="name2">{{item.name}}</div><div v-if="item.alias.length > 0" class="alia">({{item.alias[0]}})</div>
                    <div class="allicon">
                        <span class="icon iconfont1" v-if="item.mvid" @click="mvdetail(item.mvid)">&#xe62c;</span>
                        <span class="icon iconfont" v-if="item.fee === 1">&#xe7d4;</span>
                        <span class="icon iconfont2" v-if="item.fee === 1">&#xe671;</span>
                        <span v-if="item.privilege.maxbr === 999000">
                            <img src="~assets/sq.png" alt="" class="sqicon">
                        </span>
                    </div>
                </div>

                <div class="singer"><span>{{item.artists[0].name}}</span></div>
                <div class="album"><span>{{item.album.name}}</span></div>
                <div class="length"><span>{{format(item.duration)}}</span></div>

            </div>
        </div>
    </div>
</template>

<script>
    import {getsongurl} from 'network/homedata'
    export default {
        name: "newsong",
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
                    this.$store.commit('changebackid',item.id)
                    getsongurl(item.id).then(res => {
                        this.$store.commit('workchangesong',{res,item})
                    },500)
            },
            //播放全部
            pushallsong(){
                let item = this.$store.state.songset[0][0]
                this.$store.commit('changebackid',item.id)
                getsongurl(item.id).then(res => {
                    this.$store.commit('workchangesong',{res,item})
                },500)
            },
            mvdetail(id){
                this.$router.push('/mvpage/' +  id)
            }
        },
        computed:{
            allsong(){
                return this.$store.state.songset[0]
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
        height: 24px;
        margin-left: 20px;
        border: none;
        margin-bottom: 4px;
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
        font-size:24px;font-style:normal;
        color: red;margin-left: 4px;
    }

    .allsong{
        position: relative;
        bottom: 14px;
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
        font-size: 14px;
    }

    .number{
        width: 70px;
        opacity: .6;
        margin-left: 26px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .name{
        width: 400px;
        position: relative;
        right: 5px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: flex-start;
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
    }

    .album{
        width: 180px;
        position: relative;
        left: 125px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    .length{
        width: 40px;
        position: relative;
        left: 200px;
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

    .active .name2{
        color: #c62f2f;
    }

    .active .number{
        color: #c62f2f;
    }

    img{
        width: 65px;
        height: 65px;
        border-radius: 5px;
        position: relative;
        top:10px;
        right: 15px;
        border: 1px solid gainsboro;
    }

    .name2{
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .playall{
        width: 120px;
        border-radius: 40px;
        background-color: #c62f2f;
        color: #fff;
        font-family: 微软雅黑;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        cursor: pointer;
        position: relative;
        left: 900px;
        bottom: 10px;
        font-size: 14px;
        z-index: 10;
    }

    .text{
        padding: 2px 18px 2px 4px;
        margin-left: 10px;
    }

    .button{
        width: 120px;
        border-radius: 40px;
        border: 1px solid rgba(0,0,0,.2);
        background-color: #fff;
        color: #000;
        font-family: 微软雅黑;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        cursor: pointer;
        position: relative;
        left: 1040px;
        bottom: 35px;
        font-size: 14px;
        z-index: 10;
    }

    .playall:hover{
        background-color: #af2c2c;
    }

    .button:hover{
        background-color: rgba(220,220,220,.3);
    }

    .button2{
        background-color: #e2e2e2;
        opacity: .8;
        border-radius: 40px;
        width: 30px;
        height: 30px;
        position: relative;
        right: 63px;
        z-index: 10;
        cursor: pointer;
    }

    .player{
        font-size: 20px;
        color: #c62f2f;
        position: absolute;
        left: 5px;
        bottom: 16%;
        z-index: 2;
    }
</style>