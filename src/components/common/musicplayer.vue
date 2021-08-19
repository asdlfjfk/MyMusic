<template>
    <div id="player">
        <div class="songinfo">
            <div class="imgbox"><img :src="songdetail.picUrl" alt=""></div>
            <div class="info"><div class="songname">{{songdetail.name}}</div><div class="singlename">{{singledetail.name}}</div></div>
        </div>

        <div class="button">
            <div class="iconfont">
                &#xe602;
            </div>
            <div class="iconfont2" @click="play" v-html="icon">
                &#xe618;
            </div>
            <div class="iconfont">
                &#xe61b;
            </div>
        </div>

        <audio :src="url" id="audio" autoplay></audio>
    </div>
</template>

<script>
    import {getsongdetail} from '../../network/homedata'
    export default {
        name: "musicplayer",
        data(){
            return{
                detail:{},
                url:"",
                playpause:false,
                icon:"&#xe618;",
                songdetail:{},
                singledetail:{}
            }
        },
        computed:{
            song(){
                return this.$store.getters.song
            }
        },
        watch:{
            song(val){
                console.log(val);
                this.detail = val.data.data[0]
                this.url = val.data.data[0].url
                getsongdetail(this.detail.id).then(res => {
                    this.songdetail = res.data.songs[0].al
                    this.singledetail = res.data.songs[0].ar[0]
                })


                let audio = document.getElementById("audio")
                this.icon = "&#xe710;"
                this.playpause = true
            },
        },
        methods:{
            play(){
                this.playpause = !this.playpause
                if (this.playpause === true){
                    document.getElementById("audio").play()
                    this.icon = "&#xe710;"

                }else {
                    document.getElementById("audio").pause()
                    this.icon = "&#xe618;"
                }
            }
        },
    }
</script>

<style scoped>

    .iconfont{
        font-family:"iconfont" !important;
        font-size:20px;font-style:normal;
        color: rgb(0,0,0,.7);
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconfont2{
        font-family:"iconfont" !important;
        font-size:40px;font-style:normal;
        padding: 0px 40px 0px 40px;
        color: rgb(0,0,0,.7);
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconfont,.iconfont2:hover{
        cursor: pointer;
        color: #000;
    }

    #player{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: 10px;
    }

    .imgbox img{
        width: 60px;
        border-radius: 5px;
    }

    .button{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 44.8%;
        bottom: 6px;
    }

    .songinfo{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 10px;
        top: 1.5px;
    }

    .info{
        margin-left: 12px;
        margin-bottom: 4px;
        font-family: 微软雅黑;
    }

    .songname{
        font-size: 14px;
        position: relative;
        bottom: 5px;
        color: rgb(0,0,0,.6);
    }

    .songname:hover{
        color: #000;
        opacity: .8;
        cursor: pointer;
    }

    .singlename{
        font-size: 8px;
        position: relative;
        top: 8px;
        color: rgb(0,0,0,.5);
    }

    .singlename:hover{
        color: #000;
        opacity: .8;
        cursor: pointer;
    }
</style>