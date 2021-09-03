<template>
    <el-header id="header">
        <div class="nav">
            <div class="img">
                <img src="../../assets/music.png" class="img2">
            </div>

            <span id="title">余音绕梁</span>

            <div id="back" @click="back">
                <i class="el-icon-arrow-left" style="cursor: pointer;"></i>
            </div>
            <div id="go" @click="go">
                <i class="el-icon-arrow-right" style="cursor: pointer;"></i>
            </div>

            <el-input class="el-input" suffix-icon="el-icon-search" placeholder="请输入歌曲名或歌手名" size="mini" @focus="hotsearchshow" @blur="hotsearchclose"></el-input>
            <div class="hotsearch" v-if="hotsearch"></div>

            <div class="userlogin" @click="show">
                <el-avatar icon="el-icon-user-solid" :size="34"></el-avatar>
                <span>登录</span>
            </div>
        </div>

        <div class="login" v-if="loginshow" @mousedown="move">
            <div class="iconfont" ><div class="icon" @click="close">&#xe605;</div></div>
            <div class="title"><div class="titletext">扫码登录</div></div>
        </div>
    </el-header>

</template>


<script>
    import {getloginkey} from "network/homedata"
    export default {
        name: "navbar",
        data(){
          return {
              loginshow:false,
              hotsearch:false
          }
        },
        methods:{
            back(){
                this.$router.go(-1)
            },
            go(){
                this.$router.go(+1)
            },
            show(){
                this.loginshow = !this.loginshow
            },
            close(){
                this.loginshow = false
            },
            move(e){
                //拖拽效果
                let odiv = e.target;        //获取目标元素

                //算出鼠标相对元素的位置
                let disX = e.clientX - odiv.offsetLeft;
                let disY = e.clientY - odiv.offsetTop;
                document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                    //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    let left = e.clientX - disX;
                    let top = e.clientY - disY;

                    //绑定元素位置到positionX和positionY上面
                    this.positionX = top;
                    this.positionY = left;

                    //移动当前元素
                    odiv.style.left = left + 'px';
                    odiv.style.top = top + 'px';
                };
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
            },
            hotsearchshow(){
                this.hotsearch = true
            },
            hotsearchclose(){
                this.hotsearch = false
            }
        },
        watch:{
            loginshow(val){
                if (val){
                    console.log(111);
                    getloginkey().then(res => {
                        console.log(res);
                    })
                }
            }
        }
    }
</script>

<style scoped>

    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        font-size: 24px;
        display: flex;
        color: rgb(0,0,0,.4);
        justify-content: flex-end;
    }

    .icon{
        cursor: pointer;
    }

    .icon:hover{
        color: #000;
    }

    #header{
        background-color: #c62f2f;
        width: 100%;
        text-align: center;
    }

    .nav{
        height:50px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        background-color: #c62f2f;
        padding: 5px;
        position: relative;
    }

    .img{
        padding: 0;
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background-color: red;
        display: flex;
        position: absolute;
        left: 20px;
    }

    .img2{
        padding: 5px;
        justify-content: space-evenly;
    }

    #title{
        font-family: 微软雅黑;
        width: 100px;
        color: #fff;
        font-size: 20px;
        position: absolute;
        left: 65px;
    }

    #back{
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        color: #fff;
        background: rgba(77,71,71,.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: absolute;
        left: 200px;
    }

    #go{
        width: 25px;
        height: 25px;
        text-align: center;
        line-height: 25px;
        color: #fff;
        background: rgba(77,71,71,.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        position: absolute;
        left: 240px;
    }

    .el-icon-arrow-left{
        font-family: element-icons !important;
        position: absolute;
    }

    .el-input{
        width: 200px;
        margin-right: 200px;
        position: absolute;
        left: 290px;
        opacity: .5;
    }

    .userlogin{
        display: flex;
        align-items: center;
        position: absolute;
        right: 70px;
        cursor: pointer;
    }

    .userlogin span{
        font-family: 微软雅黑;
        color: #fff;
        margin-left: 8px;
        font-size: 14px;
    }

    .login{
        background-color: #fff;
        position: absolute;
        width: 300px;
        height: 500px;
        border: 1px solid gainsboro;
        top: 140px;
        right: 300px;
        bottom: 50px;
        left: 740px;
        z-index: 50;
        box-shadow: rgb(0,0,0,.4) 0px 0px 24px;
    }

    .title{
        display: flex;
        justify-content: center;
        position: relative;
        top: 50px;
    }

    .titletext{
        font-family: 微软雅黑;
        font-size: 24px;
    }

    .hotsearch{
        position: absolute;
        left: 240px;
        top: 50px;
        width: 300px;
        height: 400px;
        background-color: #fff;
        z-index: 50;
        border-radius: 14px;
        box-shadow: rgb(0,0,0,.2) 0px 0px 4px;
    }
</style>