<template>
    <div v-loading="loading">
        <div class="title"><span>音乐标题</span><span>歌手</span><span>专辑</span><span>时长</span></div>
        <div class="allsong">
            <div v-for="(item,index) in songdetails" class="songs" id="song" :class="{bgc: index%2 === 0,active: index === currentindex}" @click="addsongtoplay(item,index)">
                <div class="number"><span id="serial">{{index + 1}}</span></div>
                <div class="name"><span>{{item.name}}</span></div>
                <div class="single"><span>{{item.ar[0].name}}</span></div>
                <div class="album"><span>{{item.al.name}}</span></div>
                <div class="length"><span>{{format(item.dt)}}</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getsongdetail} from 'network/homedata'
    import {getsongurl} from '../../network/homedata'
    export default {
        name: "list",
        props:{
            songid:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data(){
            return {
                songdetails:[],
                loading:true,
                currentindex:null
            }
        },
        created(){
            for (let songitem of this.songid){
                getsongdetail(songitem.id).then(res => {
                    this.songdetails.push(res.data.songs[0])
                })
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.loading = false
            })
        },
        methods:{
            format (data) {
                var date = new Date(data)
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return m + s
            },
            addsongtoplay(item,index){
                this.currentindex = index
                getsongurl(item.id).then(res => {
                    this.$store.commit('changesong',res)
                })
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
        justify-content: center;
        opacity: .6;
    }

    .name{
        width: 320px;
        display: flex;
        justify-content: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .single{
        color: rgb(80, 125, 175);
        width: 170px;
        display: flex;
        justify-content: center;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .album{
        width: 300px;
        display: flex;
        justify-content: center;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .length{
        width: 160px;
        display: flex;
        justify-content: center;
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