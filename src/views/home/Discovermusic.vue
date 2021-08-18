<template>
    <div id="discovermusic">
        <el-header slot="mainbar">
            <div id="discovermusichome">
                <div class="titlebar">
                    <router-link to="personal" class="link" id="personal">
                        <div class="titleItem" :class="{active: current === 1}" @click="itemCurrent(1)">个性推荐</div>
                    </router-link>
                    <router-link to="songlist" class="link" id="songlist">
                        <div class="titleItem" :class="{active: current === 2}" @click="itemCurrent(2)">歌单</div>
                    </router-link>
                    <router-link to="leader" class="link" id="leader">
                        <div class="titleItem" :class="{active: current === 3}" @click="itemCurrent(3)">排行榜</div>
                    </router-link>
                    <router-link to="singer" class="link" id="singer">
                        <div class="titleItem" :class="{active: current === 4}" @click="itemCurrent(4)">歌手</div>
                    </router-link>
                    <router-link to="latestmusic" class="link" id="latestmusic">
                        <div class="titleItem" :class="{active: current === 5}" @click="itemCurrent(5)">最新音乐</div>
                    </router-link>
                </div>
            </div>
        </el-header>

        <el-main style="height:560px" id="main">
            <div>
                <router-view></router-view>
            </div>
        </el-main>
    </div>
</template>

<script>

    export default {
        name: "Discovermusic",
        data(){
          return {
              current:1
          }
        },
        methods:{
            itemCurrent(num){
                switch (num) {
                    case 1:this.current = 1;
                        break;
                    case 2:this.current = 2;
                        break;
                    case 3:this.current = 3;
                        break;
                    case 4:this.current = 4;
                        break;
                    case 5:this.current = 5;
                        break;
                }
            }
        },
        watch:{
            $route(val){
                if (val.path.match(RegExp(/personal/))){
                    this.current = 1;
                }
                else if(val.path.match(RegExp(/songlist/))){
                    this.current = 2;
                }
                else if (val.path.match(RegExp(/leader/))){
                    this.current = 3;
                }
                else if (val.path.match(RegExp(/singer/))){
                    this.current = 4;
                }
                else if (val.path.match(RegExp(/lealatestmusicder/))){
                    this.current = 5;
                }
            }
        }
    }
</script>

<style scoped>

    #main{
        margin: 0;
        padding: 0;
    }

    #discovermusichome{
        margin: 0 auto;
        width: 100%;
        text-align: center;
        background-color: #fff;
        position: relative;
        right: 10%;

    }

    .titlebar{
        display: flex;
        justify-content: center;
        width: 44%;
        height: 50%;
        position: absolute;
        left: 37%;
    }

    .titleItem{
        color: #000;
        font-family: 微软雅黑;
        opacity: .4;
        font-size: 14px;
        padding: 16px;
        white-space: nowrap;
    }

    .titleItem:hover{
        cursor: pointer;
        opacity: .8;
    }

    .active{
        font-size: 20px;
        opacity: .8;
        border-bottom: 2px solid #c62f2f;
        padding: 12px;
    }

    .link{
        text-decoration: none;
    }

    #songlist,#leader,#singer,#latestmusic{
        margin-left: 5px;
    }

</style>