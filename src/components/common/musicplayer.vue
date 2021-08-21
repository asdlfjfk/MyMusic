<template>
    <div id="player">
        <div class="songinfo">
            <div class="imgbox"><img :src="songdetail.picUrl" alt=""></div>
            <div class="info"><div class="songname">{{songname}}</div><div class="singlename">{{singledetail.name}}</div></div>
        </div>

        <div>
            <div class="button">
                <div class="iconfont" @click="up(id)">
                    &#xe602;
                </div>
                <div class="iconfont2" @click="play" v-html="icon">
                    &#xe618;
                </div>
                <div class="iconfont" @click="down(id)">
                    &#xe61b;
                </div>
            </div>
            <div class="playbar">
                <span class="current">{{format(currentTime * 1000)}}</span>
                <div class="block">
                    <el-slider id="slider" v-model="currentTime" :max="format2(this.alltime)" @change="changeMusicduration"
                               @mousedown.native="isChange = true" @mouseup.native="isChange = false"
                               :format-tooltip="timestepToolTip">
                    </el-slider>
                </div>
                <span class="size">{{format(dt)}}</span>
            </div>
        </div>

        <div class="right">
            <div class="iconfont3" @click="mute" v-html="volumeicon"></div>
            <div class="volume">
                <el-slider v-model="volume" @change="changevolume"></el-slider>
            </div>
        </div>
        <audio :src="url" ref="audio" @timeupdate="update()" autoplay></audio>
    </div>
</template>

<script>
    import {getsongdetail,getsongurl} from '../../network/homedata'
    export default {
        name: "musicplayer",
        data(){
            return{
                detail:{},
                url:"",
                playpause:false,
                icon:"&#xe618;",
                songname:"",
                songdetail:{},
                singledetail:{},
                currentTime:null,
                alltime:"",
                isChange:false,
                dt:null,
                volume:50,
                volumeicon:"&#xe6d2;",
                vo:true,
            }
        },
        computed:{
            song(){
                return this.$store.getters.song
            },
            songset(){
                return this.$store.getters.songset
            },
            id(){
                return this.$store.state.id
            }
        },
        watch:{
            song(val){
                this.detail = val.data.data[0]
                this.url = val.data.data[0].url
                getsongdetail(this.detail.id).then(res => {
                    this.songdetail = res.data.songs[0].al
                    this.songname = res.data.songs[0].name
                    this.singledetail = res.data.songs[0].ar[0]
                    this.dt = res.data.songs[0].dt
                })

                this.icon = "&#xe710;"
                this.playpause = true
            },
            // songset(val){
            //     const allsong = val[0].data.data;
            //     for (let song of allsong){
            //
            //     }
            // },
            volume(val){
                let audio = document.querySelector("audio");
                if (val === 0){
                    audio.volume = 0
                    this.volumeicon = "&#xe623;"
                }else {
                    this.volumeicon = "&#xe6d2;"
                }
            }
        },
        methods:{
            play(){
                if (this.$store.getters.song != 0){
                    this.playpause = !this.playpause
                    if (this.playpause === true){
                        this.$refs.audio.play()
                        this.icon = "&#xe710;"

                    }else {
                        this.$refs.audio.pause()
                        this.icon = "&#xe618;"
                    }
                } else {
                    this.$message.error('当前没有可播放的歌曲哦');
                    this.icon = "&#xe618;"
                }
            },
            format (data) {
                var date = new Date(data)
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return m + s
            },
            //获取歌曲总秒数
            format2(data){
                var date = new Date(data)
                var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
                var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return m*60 + s
            },
            update() {
                //当鼠标拖动进度条时 禁用timeupdate方法
                if (this.isChange === false) {
                    let audio = document.querySelector("audio");
                    this.currentTime = audio.currentTime;
                    this.alltime = audio.duration * 1000;
                }
            },

            //进度条拖动时更改歌曲播放进度
            changeMusicduration(){
                let audio = document.querySelector("audio");
                audio.currentTime = this.currentTime
                this.isChange = false
            },

            //格式化进度条拖动时显示的进度
            timestepToolTip(){
                return this.format(this.currentTime * 1000)
            },

            changevolume(){
                let audio = document.querySelector("audio");
                audio.volume = this.volume / 100
            },

            mute(){
                this.vo = !this.vo
                let audio = document.querySelector("audio");
                if (this.vo === true){
                    audio.volume = 0.5
                    this.volume = 50
                    this.volumeicon = "&#xe6d2;"
                }else {
                    audio.volume = 0
                    this.volume = 0
                    this.volumeicon = "&#xe623;"
                }
            },

            // 上一首
            up(id){
                let index = null
                for (let songindex in this.songset){
                    if (this.songset[songindex].data.songs[0].id === id) {
                        index = songindex*1 - 1
                        this.$store.commit('changeindex',index)
                    }
                }
                if (index != null && index >= 0){
                    let id = this.songset[index].data.songs[0].id
                    this.$store.commit('changeid',id)
                    getsongurl(this.id).then(res => {
                        this.$store.commit('changesong2',res)
                    })
                }else{
                    this.$message.error('已经到顶了哦');
                }
            },
            // 下一首
            down(id){
                let index = null
                for (let songindex in this.songset){
                    if (this.songset[songindex].data.songs[0].id === id) {
                        index = songindex*1 + 1
                        this.$store.commit('changeindex',index)
                    }
                }
                try {
                    if (index != null && index >= 0){
                        let id = this.songset[index].data.songs[0].id
                        this.$store.commit('changeid',id)
                        getsongurl(this.id).then(res => {
                            this.$store.commit('changesong2',res)
                        })
                    }
                }catch(e)
                {
                    this.$message.error('已经到底了哦');
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

    .iconfont3{
        font-family:"iconfont" !important;
        font-size:24px;font-style:normal;
        margin-right: 8px;
        margin-top: 0.7px;
        color: rgb(0,0,0,.7);
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconfont,.iconfont2:hover{
        cursor: pointer;
        color: #000;
    }

    .iconfont3:hover{
        cursor: pointer;
        color:  #c62f2f;
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
        cursor: pointer;
        filter:drop-shadow(0 0 2px rgb(0,0,0,.7));
    }

    .button{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 44.8%;
        bottom: 8px;
    }

    .songinfo{
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 10px;
        bottom: .5px;
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

    .block{
        width: 700px;
        position: absolute;
        top: 40px;
        left: 410px;
    }

    .current{
        position: absolute;
        top: 47.5px;
        left: 23.2%;
    }

    .size{
        position: absolute;
        left: 73.1%;
        top: 47.5px;
    }

    .block >>>  .el-slider__button {
        background-color: #fff;
        width: 12px;
        height: 12px;
        border: 2px solid #c62f2f;
    }

    .block >>> .el-slider__bar{
        background-color: #ff4e4e;
    }

    .right{
        display: flex;
        position: absolute;
        left: 80%;
        align-items: center;
        top: 24px;
    }

    .volume{
        width: 100px;
        margin-left: 8px;
    }

    .volume >>>  .el-slider__button {
        background-color: #ff4e4e;
        width: 3px;
        height: 3px;
        border: 2px solid #ff4e4e;
    }

    .volume >>> .el-slider__bar{
        background-color: #ff4e4e;
    }

    .volume >>> .el-slider__runway{
        height: 5px;
    }
</style>