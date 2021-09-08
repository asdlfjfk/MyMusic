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

            <el-input class="el-input2" @keyup.enter.native="linktosearchpage(input)" v-model="input" suffix-icon="el-icon-search" placeholder="请输入歌曲名或歌手名" size="mini" @focus="hotsearchshow" @blur="hotsearchclose"></el-input>
            <div class="hotsearch" v-if="hotsearch">
                <div class="box" v-loading="loading">
                    <div class="leadertext">热搜榜</div>
                    <div v-for="(item,index) in hotsearchlist" class="item" v-loading="loading" @mousedown="linktosearchpage(item.searchWord)">
                        <div class="number" :class="{active: index + 1 === 1 || index + 1 === 2 || index + 1 === 3}">{{index + 1}}</div>
                        <div>
                            <div class="hotsearchname">
                                <div class="searchname">{{item.searchWord}}</div>
                                <div class="score">{{item.score}}</div>
                                <div class="icon iconfont2" v-if="item.iconType === 1 || index + 1 === 1 || index + 1 === 2 || index + 1 === 3">&#xe740;</div>
                                <div class="icon iconfont3" v-if="item.iconType === 2">&#xe741;</div>
                            </div>
                            <div class="content">{{item.content}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="userlogin">
                <el-avatar icon="el-icon-user-solid" :size="34" v-if="avatar.length < 1"></el-avatar>
                <el-avatar :size="34" v-if="avatar.length > 0" :src="avatar"></el-avatar>
                <span style="font-size: 12px;font-family: 微软雅黑;" v-if="logintf === false" @click="show">登录</span>
                <span style="font-size: 13px;font-family: 微软雅黑;" v-if="logintf === true">{{username}}</span>
                <span style="font-size: 12px;font-family: 微软雅黑;" v-if="logintf === true" @click="exitlogin">退出</span>
            </div>
        </div>

        <div class="login" v-if="loginshow">
            <div class="icon iconfont"><div class="icon2" @click="close">&#xe605;</div></div>
            <div class="title"><div class="titletext">登录</div></div>
            <el-input placeholder="请输入手机号" class="number" @blur="checkphone(phone)" v-model="phone"></el-input>
            <el-input placeholder="请输入密码" show-password class="password" v-model="password"  @blur="checkpassword(password)" @keyup.enter.native="login(phone,password)"></el-input>
            <el-button @click="login(phone,password)">登录</el-button>
        </div>
    </el-header>

</template>


<script>
    import {gethotsearch,login} from "network/homedata"
    export default {
        name: "navbar",
        data(){
          return {
              loading:true,
              loginshow:false,
              hotsearch:false,
              hotsearchlist:[],
              logintf:false,
              input:"",
              phone:"",
              password:"",
              avatar:"",
              username:"",
              logintoastflag:0
          }
        },
        created(){
            let logincookie = sessionStorage.getItem("logincookie")
            let phone = sessionStorage.getItem("phone")
            let password = sessionStorage.getItem("password")
            let flag = sessionStorage.getItem("toastflag")
            if (logincookie) {
                this.logintoastflag = flag
                this.login(phone,password)
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
            hotsearchshow(){
                this.hotsearch = true
            },
            hotsearchclose(){
                this.hotsearch = false
            },
            testPhone(str) {
                const reg = /^1[3|4|5|7|8|6|9][0-9]\d{8}$/;
                return reg.test(str);
            },
            checkphone(str){
                if (!str){
                    this.$message.error("手机号不能为空")
                }
                else if (!this.testPhone(str)) {
                    this.$message.error("手机号格式不正确")
                    this.phone = ""
                }
            },
            checkpassword(str){
              if (!str){
                  this.$message.error("密码不能为空")
              }
            },
            login(phone,password){
                if (phone && password){

                            login(phone,password).then(res => {
                                if (res.data.code === 502) {
                                    this.$message.error(res.data.message);
                                }
                                else {
                                    let id = res.data.profile.userId
                                    sessionStorage.setItem("logincookie",res.data.cookie)
                                    sessionStorage.setItem("phone",phone)
                                    sessionStorage.setItem("password",password)
                                    sessionStorage.setItem("userid",id)
                                    this.loginshow = false
                                    this.logintf = true
                                    this.avatar = res.data.profile.avatarUrl
                                    this.username = res.data.profile.nickname
                                    console.log(res);
                                    if (this.logintoastflag === 0){
                                        this.$message.success("登陆成功")
                                        sessionStorage.setItem("toastflag",1)
                                        this.$router.go(0)
                                    }
                                }
                            }).catch(() => {
                                this.$message.error("该账户不存在或密码错误超过次数限制")
                            })

                } else {
                    this.$message.error("手机号/密码不能为空")
                }
            },
            exitlogin(){
                this.logintf = false
                this.avatar = ""
                sessionStorage.removeItem("logincookie");
                sessionStorage.removeItem("phone");
                sessionStorage.removeItem("password");
                sessionStorage.removeItem("userid");
                this.$message.success("退出登录成功")
                this.$router.go(0)
            },
            linktosearchpage(input){
                this.hotsearch = false
                //避免多次导航到相同页
                if (this.$route.path.match(RegExp(/searchpage/))){
                    this.$store.commit('changesearchkeyword',input)
                }
                else {
                    this.$store.commit('changesearchkeyword',input)
                    this.$router.push('/searchpage')
                }
            }
        },
        watch:{
            loginshow(val){

            },
            hotsearch(val){
                if (val){
                    gethotsearch().then(res => {
                        this.hotsearchlist = res.data.data
                        this.loading = false
                    })
                }
            }
        }
    }
</script>

<style scoped>

    .icon{
        font-family:"iconfont" !important;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        font-style:normal;
        z-index: 10;
    }

    .iconfont{
        font-size: 24px;
        display: flex;
        color: rgb(0,0,0,.4);
        justify-content: flex-end;
    }

    .iconfont2{
        font-size:20px;
        color: red;
        margin-left: 10px;
    }

    .iconfont3{
        font-size:20px;
        color: limegreen;
        margin-left: 10px;
    }

    .icon2{
        cursor: pointer;
    }

    .icon2:hover{
        color: rgb(0,0,0,.8);
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

    .el-input2{
        width: 200px;
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
        top:50px;
        left: 240px;
        width: 300px;
        height: 430px;
        background-color: #fff;
        z-index: 50;
        border-radius: 14px;
        box-shadow: rgb(0,0,0,.2) 0px 0px 4px;
    }

    .box{
        position: relative;
        left: 10px;
        overflow-y: scroll;
        overflow-x: hidden;
        margin: 10px 0px 0px 10px;
        width: 265px;
        height: 400px;
    }

    .hotsearchname{
        display: flex;
        align-items: center;
        width: auto;
        font-size: 14px;
        font-family: 微软雅黑;
    }

    .content{
        font-size: 12px;
        width: auto;
        font-family: 微软雅黑;
        font-weight: 400;
        opacity: .6;
        display: flex;
        justify-content: flex-start;
        margin-right: 20px;
        text-align: left;
    }

    .item{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 20px;
        cursor: pointer;
    }

    .leadertext{
        font-family: 微软雅黑;
        margin: 20px 210px 20px 0px;
        white-space: nowrap;
        font-size: 13px;
        opacity: .7;
    }

    .number{
        font-family: 微软雅黑;
        font-weight: 400;
        margin-right:15px;
        opacity: .7;
    }

    .searchname{
        font-family: 微软雅黑;
        font-size: 13px;
        font-weight: 600;
        opacity: .8;
    }

    .score{
        font-size: 12px;
        opacity: .4;
        margin-left: 14px;
    }

    .active{
        color: red;
    }

    .login >>> .number{
        margin-top: 100px;
        margin-left: 15px;
        width: 260px;
        font-size: 13px;
    }

    .login >>> .password{
        margin-top: 20px;
        width: 260px;
        font-size: 13px;
    }

    .el-button{
        margin-top: 20px;
        width: 260px;
        background-color: #e40000;
        color: #fff;
        font-family: 微软雅黑;
    }

    .el-button:hover{
        background-color: #c40000;
        color: #fff;
    }

    .el-button:focus{
        background-color: #e40000;
        color: #fff;
    }
</style>