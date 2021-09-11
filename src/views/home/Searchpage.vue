<template>
    <div id="searchpage">
        <el-header>
            <div id="searchpagelist">
                <div class="titlebar">
                    <router-link to="songs" class="link" id="songs">
                        <div class="titleItem" :class="{active: current === 1}" @click="itemCurrent(1)">单曲</div>
                    </router-link>
                    <router-link to="singers" class="link" id="singers">
                        <div class="titleItem" :class="{active: current === 2}" @click="itemCurrent(2)">歌手</div>
                    </router-link>
                    <router-link to="albums" class="link" id="albums">
                        <div class="titleItem" :class="{active: current === 3}" @click="itemCurrent(3)">专辑</div>
                    </router-link>
                    <router-link to="searchmv" class="link" id="videos">
                        <div class="titleItem" :class="{active: current === 4}" @click="itemCurrent(4)">视频</div>
                    </router-link>
                    <router-link to="songlists" class="link" id="songlists">
                        <div class="titleItem" :class="{active: current === 5}" @click="itemCurrent(5)">歌单</div>
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
        name: "Searchpage",
        data(){
            return {
                current:1
            }
        },
        created(){
            //保存选中状态 防止页面刷新时跑动
            window.addEventListener("pagehide",()=>{
                sessionStorage.setItem("searchcurrent",JSON.stringify(this.current))
            })
            window.addEventListener("pageshow",()=>{
                if(sessionStorage.getItem('searchcurrent') === null) {
                    sessionStorage.setItem("searchcurrent",JSON.stringify(this.current))
                }
                this.current = parseInt(sessionStorage.getItem("searchcurrent"));
            })

            if (this.routepath.match(RegExp(/songs/))) {
                this.current = 1;
            }else if(this.routepath.match(RegExp(/singers/))){
                this.current = 2;
            }
            else if (this.routepath.match(RegExp(/albums/))){
                this.current = 3;
            }
            else if (this.routepath.match(RegExp(/searchmv/))){
                this.current = 4;
            }
            else if (this.routepath.match(RegExp(/songlists/))){
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
                if (val.path.match(RegExp(/songs/))){
                    this.current = 1;
                }
                else if(val.path.match(RegExp(/singers/))){
                    this.current = 2;
                }
                else if (val.path.match(RegExp(/albums/))){
                    this.current = 3;
                }
                else if (val.path.match(RegExp(/searchmv/))){
                    this.current = 4;
                }
                else if (val.path.match(RegExp(/songlists/))){
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
        height: calc(100vh - 200px);
    }

    #searchpage{
        overflow-y: hidden;
        overflow-x: hidden;

    }

    #searchpagelist{
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

    #videos,#singers,#albums,#songlists{
        margin-left: 5px;
    }
</style>