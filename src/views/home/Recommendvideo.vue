<template>
    <div id="recommendvideo">
        <el-header>
                <div class="titlebar">
                    <router-link to="recovideo" class="link">
                        <div class="titleItem" :class="{active: current === 1}" @click="itemCurrent(1)">视频</div>
                    </router-link>
                    <router-link to="recomv" class="link">
                        <div class="titleItem" :class="{active: current === 2}" @click="itemCurrent(2)">MV</div>
                    </router-link>
                </div>
        </el-header>
        <el-main>
            <div>
                <router-view></router-view>
            </div>
        </el-main>
    </div>
</template>

<script>
    export default {
        name: "Recommendvideo",
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
        },
        data(){
            return {
                current:2
            }
        },
        methods:{
                itemCurrent(num){
                    this.current = num
                }
        },
        watch:{
            $route(val){
                if (val.path.match(RegExp(/recovideo/))){
                    this.current = 1;
                }
                else if(val.path.match(RegExp(/recomv/))){
                    this.current = 2;
                }
            },
        }
    }
</script>

<style scoped>

    .titlebar{
        background-color: #fff;
        display: flex;
        justify-content: center;
        width: 1200px;
        height: 80px;
        position: absolute;
        top: 60px;
        z-index: 20;
    }

    .titleItem{
        color: #000;
        font-family: 微软雅黑;
        opacity: .4;
        font-size: 14px;
        padding: 16px;
        white-space: nowrap;
        position: relative;
        top: 28px;
        right: 470px;
        z-index: 25;
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
</style>