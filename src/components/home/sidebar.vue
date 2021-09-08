<template>
    <el-aside class="sidebar" width="20%">
        <div class="innerside">
            <ul class="list">
                <p>推荐</p>
                <div>
                    <router-link to="/home" class="link">
                        <li class="item" :class="{active: current === 1}" @click="currentitem(1)">
                            <span class="iconfont">&#xe600</span>
                            <span>发现音乐</span>
                        </li>
                    </router-link>

                    <router-link to="/video" class="link">
                        <li class="item" :class="{active: current === 2}" @click="currentitem(2)">
                            <span class="iconfont">&#xe620</span>
                            <span>推荐视频</span>
                        </li>
                    </router-link>

                </div>
                <p>我的音乐</p>
                <div>
                    <router-link to="/myplaylist" class="link">
                        <li class="item" :class="{active: current === 3}" @click="currentitem(3)">
                            <span class="iconfont icon">&#xe636;</span>
                            我创建的歌单
                        </li>
                    </router-link>
                </div>
            </ul>
        </div>
    </el-aside>
</template>

<script>
    export default {
        name: "sidebar",
        data(){
            return {
                current:1,
            }
        },
        created(){
            window.addEventListener("pagehide",()=>{
                sessionStorage.setItem("sidecurrent",JSON.stringify(this.current))
            })
            window.addEventListener("pageshow",()=>{
                if(sessionStorage.getItem('sidecurrent') === null) {
                    sessionStorage.setItem("sidecurrent",JSON.stringify(this.current))
                }
                this.current = parseInt(sessionStorage.getItem("sidecurrent"));
            })
        },
        methods:{
            currentitem(num){
                switch (num) {
                    case 1:this.current = 1;
                    break;
                    case 2:this.current = 2;
                    break;
                    case 3:this.current = 3;
                    break;
                }
            }
        },
        watch:{
            $route(val){
                if (val.path.match(RegExp(/home/))){
                    this.current = 1;
                }
                else if(val.path.match(RegExp(/video/))){
                    this.current = 2;
                }
                else if (val.path.match(RegExp(/disk/))){
                    this.current = 3;
                }
            }
        }
    }
</script>

<style scoped>

    .sidebar{
        text-align: left;
        border-right: 1px solid #e6e6e6;
        text-decoration: none;
    }

    .list{
        padding: 0;
    }

    p{
        opacity: .4;
        font-size: 13px;
        display: block;
        padding: 7px;
        margin-left: 4px;
        line-height: 0px;
        font-family: 微软雅黑;
    }

    .iconfont{
        font-family:"iconfont" !important;
        margin-right: 8px;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon{
        font-size: 20px;
        position: relative;
        top: 2.5px;
    }

    span{
        font-family: 微软雅黑;
        font-size: 14px;
        margin-left: 5px;
    }

    li{
        list-style-type:none;
        display: list-item;
        font-size: 14px;
        padding: 20px;
        font-family: 微软雅黑;
        opacity: .56;
        transition: border-color .3s,background-color .3s,color .3s;
        white-space: nowrap;
    }

    .item:hover{
        background: #e6e7ea!important;
        color: #000;
        cursor: pointer;
    }

    .active {
        opacity: .8;
        color: #000;
        background: #e6e7ea!important;
    }

    .link{
        text-decoration: none;
        color: #000;
        font-weight: 400;
    }
</style>