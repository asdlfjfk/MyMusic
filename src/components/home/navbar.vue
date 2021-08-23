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

            <el-input class="el-input" suffix-icon="el-icon-search" placeholder="请输入歌曲名或歌手名" size="mini"></el-input>

            <div class="userlogin">
                <el-avatar icon="el-icon-user-solid" :size="34"></el-avatar>
                <span>登录</span>
            </div>
        </div>
    </el-header>

</template>


<script>
    export default {
        name: "navbar",
        methods:{
            back(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
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
        left: 220px;
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
    }

    .userlogin span{
        font-family: 微软雅黑;
        color: #fff;
        margin-left: 8px;
        font-size: 14px;
    }
</style>