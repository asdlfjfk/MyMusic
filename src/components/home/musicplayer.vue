<template>
    <div id="player">
        <div class="songinfo">
            <div class="imgbox"><img :src="songdetail.picUrl" alt=""></div>
            <div class="info"><div class="songname">{{songname}}<span  v-if="songalia" class="alia">({{songalia}})</span></div><div class="singlename">{{singledetail.name}}</div></div>
        </div>

        <div>
            <div class="button">
                <div class="icon iconfont4" @click="changemodel"  v-html="icon2">
                    &#xe60a;
                </div>
                <div class="icon iconfont" @click="up(id)">
                    &#xe602;
                </div>
                <div class="icon iconfont2" @click="play" v-html="icon">
                    &#xe618;
                </div>
                <div class="icon iconfont" @click="down(id)">
                    &#xe61b;
                </div>
            </div>
            <div class="playbar">
                <span class="current">{{format(currentTime * 1000)}}</span>
                <div class="block">
                    <el-slider class="slider" :disabled="disab" v-model="currentTime" :max="alltime" @change="changeMusicduration"
                               @mousedown.native="isChange = true" @mouseup.native="isChange = false"
                               :format-tooltip="timestepToolTip">
                    </el-slider>
                </div>
                <span class="size" v-if="vip !== 1">{{format(dt)}}</span>
                <span class="size" v-if="vip === 1">{{format(sum)}}</span>
            </div>
        </div>

        <div class="right">
            <div class="icon iconfont3" @click="mute" v-html="volumeicon"></div>
            <div class="volume">
                <el-slider v-model="volume" @change="changevolume"></el-slider>
            </div>
        </div>
        <audio :src="url" id="audio" ref="audio" @timeupdate="update()" autoplay @ended="loop(id,model)"></audio>
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
                icon2:"&#xe60a;",
                songname:"",
                songdetail:{},
                songalia:"",
                singledetail:{},
                currentTime:null,
                alltime:0,
                isChange:false,
                dt:0,
                volume:50,
                volumeicon:"&#xe6d2;",
                vo:true,
                vip:"",
                disab:true,
                range:[],
                sum: 0,
                model:0
            }
        },
        computed:{
            song(){  //歌曲
                return this.$store.getters.song
            },
            songset(){  //所有歌曲
                return this.$store.getters.songset
            },
            id(){ //用于在寻找上下首歌时重新赋值寻找基点 如若不重新赋值 上下首切换将局限于三首歌内 中间为基点
                return this.$store.state.id
            },
            flag(){ //用于判断是歌手页的歌曲还是歌单页的歌曲 他们俩取值不一致
                return this.$store.state.flag
            }
        },
        watch:{
            song(val){
                this.detail = val.data.data[0]
                this.url = val.data.data[0].url
                if (val !== 0){
                    this.disab = false
                }
                getsongdetail(this.detail.id).then(res => {
                    this.songalia = res.data.songs[0].alia[0]
                    this.songdetail = res.data.songs[0].al
                    this.songname = res.data.songs[0].name
                    this.singledetail = res.data.songs[0].ar[0]
                    this.dt = res.data.songs[0].dt
                    this.vip = res.data.songs[0].fee
                    if (this.vip === 1){
                        this.range[0] = val.data.data[0].freeTrialInfo.start
                        this.range[1] = val.data.data[0].freeTrialInfo.end
                        this.sum = (this.range[1] - this.range[0])*1000
                    }
                })

                this.icon = "&#xe710;"
                this.playpause = true
            },
            volume(val){
                let audio = document.querySelector("audio");
                if (val === 0){
                    audio.volume = 0
                    this.volumeicon = "&#xe66c;"
                }else {
                    this.volumeicon = "&#xe6d2;"
                }
            },
            model(val){
                //单曲循环
                let audio = document.getElementById("audio");
                if (val === 2){
                    audio.setAttribute("loop","loop")
                }else {
                    if (audio.hasAttribute("loop")){
                        audio.removeAttribute("loop")
                    }
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
            update() {
                //当鼠标拖动进度条时 禁用timeupdate方法
                if (this.isChange === false) {
                    let audio = document.querySelector("audio");
                    this.currentTime = audio.currentTime;
                    this.alltime = audio.duration;
                }
            },

            //进度条移动时更改歌曲播放进度
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
                    this.volumeicon = "&#xe66c;"
                }
            },

            // 上一首
            up(id){
                switch (this.flag) {
                    case 1:
                        let index = null
                        for (let songindex in this.songset){
                            if (this.songset[songindex].data.songs[0].id === id) {
                                index = songindex*1 - 1
                                if (index >= 0) {
                                    if (this.songset[index].data.songs[0].noCopyrightRcmd !== null){
                                        index = songindex*1 - 2
                                        this.$store.commit('changebackid',this.songset[index].data.songs[0].id)
                                    }
                                    this.$store.commit('changebackid',this.songset[index].data.songs[0].id)
                                }
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
                        break;
                    case 2:
                        let index1 = null
                        for (let songindex in this.songset[0]){
                            if (this.songset[0][songindex].id === id) {
                                index1 = songindex*1 - 1
                                if (index1 >= 0) {
                                    if (this.songset[0][index1].noCopyrightRcmd !== null){
                                        index1 = songindex*1 - 2
                                        this.$store.commit('changebackid',this.songset[0][index1].id)
                                    }
                                    this.$store.commit('changebackid',this.songset[0][index1].id)
                                }
                            }
                        }
                        if (index1 != null && index1 >= 0){
                            let id = this.songset[0][index1].id
                            this.$store.commit('changeid',id)
                            getsongurl(this.id).then(res => {
                                this.$store.commit('changesong2',res)
                            })
                        }else{
                            this.$message.error('已经到顶了哦');
                        }
                        break;
                }
            },
            // 下一首
            down(id){
                switch (this.flag) {
                    case 1:
                        let index = null
                        for (let songindex in this.songset){
                            if (this.songset[songindex].data.songs[0].id === id) {
                                index = songindex*1 + 1
                                if (index + 1 <= this.songset.length) {
                                    if (this.songset[index].data.songs[0].noCopyrightRcmd !== null){
                                        index = songindex*1 + 2
                                        this.$store.commit('changebackid',this.songset[index].data.songs[0].id)
                                    }
                                    this.$store.commit('changebackid',this.songset[index].data.songs[0].id)
                                }
                            }
                        }
                        if (index != null && index >= 0 && index + 1 <= this.songset.length){
                            let id = this.songset[index].data.songs[0].id
                            this.$store.commit('changeid',id)
                            getsongurl(this.id).then(res => {
                                this.$store.commit('changesong2',res)
                            })
                        }else {
                            this.$message.error('已经到底了哦');
                        }
                        break;

                    case 2:
                        let index1 = null
                        for (let songindex in this.songset[0]){
                            if (this.songset[0][songindex].id === id) {
                                index1 = songindex*1 + 1
                                if (index1 + 1 <= this.songset[0].length) {
                                    if (this.songset[0][index1].noCopyrightRcmd !== null){
                                        index1 = songindex*1 + 2
                                        this.$store.commit('changebackid',this.songset[0][index1].id)
                                    }
                                    this.$store.commit('changebackid',this.songset[0][index1].id)
                                }
                            }
                        }
                        if (index1 != null && index1 >= 0 && index1 + 1 <= this.songset[0].length){
                            let id = this.songset[0][index1].id
                            this.$store.commit('changeid',id)
                            getsongurl(this.id).then(res => {
                                this.$store.commit('changesong2',res)
                            })
                        }else {
                            this.$message.error('已经到底了哦');
                        }
                        break;
                }

            },

            loop(id,model){

                switch (model) {
                    case 0: //顺序播放
                        this.down(id)
                        break;

                    case 1: //列表循环    //原理与下一首一致 到底后自动回到第一首
                        if (model === 1) {
                            if (this.flag === 1) {
                                let index = null
                                for (let songindex in this.songset){
                                    if (this.songset[songindex].data.songs[0].id === id) {
                                        index = songindex*1 + 1
                                        if (index + 1 <= this.songset.length) {
                                            if (this.songset[index].data.songs[0].noCopyrightRcmd !== null){
                                                index = songindex*1 + 2
                                                this.$store.commit('changebackid',this.songset[index].data.songs[0].id)
                                            }
                                            this.$store.commit('changebackid',this.songset[index].data.songs[0].id)
                                        }
                                    }
                                }
                                if (index != null && index >= 0 && index + 1 <= this.songset.length){
                                    let id = this.songset[index].data.songs[0].id
                                    this.$store.commit('changeid',id)
                                    getsongurl(this.id).then(res => {
                                        this.$store.commit('changesong2',res)
                                    })
                                }else {
                                    let item = this.songset[0]
                                    this.$store.commit('changebackid',item.data.songs[0].id)
                                    getsongurl(item.data.songs[0].id).then(res => {
                                        this.$store.commit('changesong',{res,item})
                                    },500)
                                }
                            }else if (this.flag === 2) {
                                let index = null
                                for (let songindex in this.songset[0]){
                                    if (this.songset[0][songindex].id === id) {
                                        index = songindex*1 + 1
                                        if (index + 1 <= this.songset[0].length) {
                                            if (this.songset[0][index].noCopyrightRcmd !== null){
                                                index = songindex*1 + 2
                                                this.$store.commit('changebackid',this.songset[0][index].id)
                                            }
                                            this.$store.commit('changebackid',this.songset[0][index].id)
                                        }
                                    }
                                }
                                if (index != null && index >= 0 && index + 1 <= this.songset[0].length){
                                    let id = this.songset[0][index].id
                                    this.$store.commit('changeid',id)
                                    getsongurl(this.id).then(res => {
                                        this.$store.commit('changesong2',res)
                                    })
                                }else {
                                    let item = this.songset[0][0]
                                    this.$store.commit('changebackid',item.id)
                                    getsongurl(item.id).then(res => {
                                        this.$store.commit('workchangesong',{res,item})
                                    },500)
                                }
                            }
                        }
                        break;
                }
            },

            changemodel(){
                this.model += 1
                if (this.model > 2){
                    this.model = 0
                }
                switch (this.model) {
                    case 0:
                        this.icon2 = "&#xe60a;"
                        this.$message.success("已切换为列表顺序播放")
                        break;
                    case 1:
                        this.icon2 = "&#xe604;"
                        this.$message.success("已切换为列表循环播放")
                        break;
                    case 2:
                        this.icon2 = "&#xe657;"
                        this.$message.success("已切换为单曲循环播放")
                        break;
                }
            }
        },
    }
</script>

<style scoped>

    .icon{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconfont{
        font-size:20px;font-style:normal;
        color: rgb(0,0,0,.7);
    }

    .iconfont2{
        font-size:40px;font-style:normal;
        padding: 0px 40px 0px 40px;
        color: rgb(0,0,0,.7);
    }

    .iconfont3{
        font-size:24px;font-style:normal;
        margin-right: 8px;
        margin-top: 0.7px;
        color: black;
        cursor: pointer;
        opacity: .8;
    }

    .iconfont4{
        font-size:24px;font-style:normal;
        position: relative;
        right: 50px;
        top: 2px;
        cursor: pointer;
    }

    .iconfont,.iconfont2:hover{
        cursor: pointer;
        color: #000;
    }

    .iconfont3:hover{
        color: #c62f2f;
    }

    .iconfont4:hover{
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
        align-items: center;
        filter:drop-shadow(0 0 2px rgb(0,0,0,.7));
    }

    .button{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        left: 43%;
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

    .alia{
        position: relative;
        left: 5px;
    }

    .songname{
        width: 300px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
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
        left: 23.4%;
        font-weight: 300;
    }

    .size{
        position: absolute;
        left: 73.1%;
        top: 47.5px;
        font-weight: 300;
    }

    .block >>>  .el-slider__button {
        background-color: #fff;
        width: 8px;
        height: 8px;
        border: 2px solid #c62f2f;
    }

    .block >>> .el-slider__bar{
        background-color: #ff4e4e;
    }

    .right{
        display: flex;
        position: absolute;
        left: 86.5%;
        align-items: center;
        top: 24px;
    }

    .volume{
        width: 100px;
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