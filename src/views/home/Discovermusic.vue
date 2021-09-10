<template>
    <div id="discovermusic">
        <el-header>
            <div id="discovermusichome">
                <div class="titlebar">
                    <router-link to="personal" class="link" id="personal">
                        <div class="titleItem" :class="{active: current === 1}" @click="itemCurrent(1)">个性推荐</div>
                    </router-link>
                    <router-link to="playlist" class="link" id="playlist">
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

        <el-main id="main">
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
        created(){
            //保存选中状态 防止页面刷新时跑动
            window.addEventListener("pagehide",()=>{
                sessionStorage.setItem("current",JSON.stringify(this.current))
            })
            window.addEventListener("pageshow",()=>{
                if(sessionStorage.getItem('current') === null) {
                    sessionStorage.setItem("current",JSON.stringify(this.current))
                }
               this.current = parseInt(sessionStorage.getItem("current"));
            })

            if (this.routepath.match(RegExp(/personal/))) {
                this.current = 1;
            }else if(this.routepath.match(RegExp(/playlist/))){
                this.current = 2;
            }
            else if (this.routepath.match(RegExp(/leader/))){
                this.current = 3;
            }
            else if (this.routepath.match(RegExp(/singer/))){
                this.current = 4;
            }
            else if (this.routepath.match(RegExp(/latestmusic/))){
                this.current = 5;
            }
        },
        methods:{
            itemCurrent(num){
                this.current = num
            }
        },
        computed:{
            routepath(){
                return this.$route.path
            }
        },
        watch:{
            $route(val){
                if (val.path.match(RegExp(/personal/))){
                    this.current = 1;
                }
                else if(val.path.match(RegExp(/playlist/))){
                    this.current = 2;
                }
                else if (val.path.match(RegExp(/leader/))){
                    this.current = 3;
                }
                else if (val.path.match(RegExp(/singer/))){
                    this.current = 4;
                }
                else if (val.path.match(RegExp(/latestmusic/))){
                    this.current = 5;
                }
            },
        }
    }
</script>

<style scoped>

    #main{
        margin: 0;
        padding: 0;
        height: calc(100vh - 200px);
    }

    #discovermusic{
        overflow-y: hidden;
        overflow-x: hidden;
    }

    #discovermusichome{
        width: 100%;
        text-align: center;
        background-color: #fff;
        position: relative;
        right: 120px;
        top: 8px;
    }

    .titlebar{
        display: flex;
        justify-content: center;
        width: 44%;
        height: 60%;
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
        opacity: .9;
        border-bottom: 4px solid #c62f2f;
        padding: 10px;
        font-weight: 800;
    }

    .link{
        text-decoration: none;
    }

    #playlist,#leader,#singer,#latestmusic{
        margin-left: 5px;
    }

</style>