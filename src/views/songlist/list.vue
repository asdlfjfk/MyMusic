<template>
    <div>
        <div class="title"><span>音乐标题</span><span>歌手</span><span>专辑</span><span>时长</span></div>
        <div class="allsong">
            <div v-for="(item,index) in allsong" class="songs" id="song"
                 :class="{bgc: index%2 === 0,active: index === index2}"
                 @click="addsongtoplay(item,index)">
                <div class="number"><span>{{PrefixZero((index + 1),2)}}</span></div>
                <div class="name"><span class="name2">{{item.data.songs[0].name}}</span></div>
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
        methods:{
            format (data) {
                var date = new Date(data)
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return m + s
            },
            PrefixZero(num, n) { //序号不足两位往前补0
                return (Array(n).join(0) + num).slice(-n);
            },
            addsongtoplay(item,index){
                this.$store.commit('changeindex',index)
                getsongurl(item.data.songs[0].id).then(res => {
                    this.$store.commit('changesong',{res,item})
                })
            },
        },
        computed:{
            allsong(){
                return this.$store.state.songset
            },
            index2(){
                return this.$store.state.index
            }
        },
    }
</script>

<style scoped>
    .title{
        position: relative;
        width: 100%;
        font-family: 微软雅黑;
        display: flex;
        justify-content: space-evenly;
        color: #000;
        opacity: .4;
    }

    .allsong{
        margin-top: 16px;
    }

    .songs{
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        background-color: #fff;
        line-height: 50px;
        opacity: .55;
        position: relative;
        width: 100%;
        font-family: 微软雅黑;
    }

    .number{
        width: 70px;
        display: flex;
        justify-content: flex-start;
        opacity: .6;
        margin-left: 26px;
    }

    .name{
        width: 140px;
        display: flex;
        justify-content: flex-start;
        margin-left: 103px;
    }

    .single{
        color: rgb(80, 125, 175);
        width: 170px;
        display: flex;
        justify-content: flex-start;
        margin-left: 123px;
    }

    .album{
        width: 140px;
        display: flex;
        justify-content: flex-start;
        margin-left: 60px;
    }
    .length{
        width: 160px;
        display: flex;
        justify-content: flex-start;
        margin-left: 88px;
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
</style>