<template>
    <div id="myplaylist">
        <div class="title">我创建的歌单</div>
        <div v-if="userplaylist.length > 0" class="allplaylist">
            <div v-for="item in userplaylist" class="playlistitem">
                <img :src="item.coverImgUrl" alt="" @click="listdetail(item.id)">
                <div class="name" @click="listdetail(item.id)">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {userplaylist} from "network/homedata"
    export default {
        name: "MyCloudDisk",
        data(){
          return {
              userplaylist:[]
          }
        },
        created(){
            let logincookie = sessionStorage.getItem("logincookie")
            if (logincookie){
                let userid = sessionStorage.getItem("userid")
                userplaylist(userid,logincookie).then(res => {
                    this.userplaylist = res.data.playlist
                })
            }
        },
        methods:{
            listdetail(id){
                this.$router.push('/songlist/' + id)
            }
        },
        activated(){
            let logincookie = sessionStorage.getItem("logincookie")
            if (!logincookie) {
                this.$message.error("请先登录哦")
            }
        }
    }
</script>

<style scoped>

    #myplaylist{
        height: calc(100vh - 160px);
    }

    .allplaylist{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .playlistitem{
        margin-left: 30px;
    }

    .title{
        font-weight: 800;
        font-size: 20px;
        font-family: 微软雅黑;
        padding: 20px 0px 20px 30px;
    }

    img{
        width: 200px;
        border-radius: 5px;
        cursor: pointer;
    }

    .name {
        width: 200px;
        height: auto;
        font-size: 13px;
        margin-top: 7px;
        color: rgb(0,0,0,.6);
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
        font-family: 微软雅黑;
        font-weight: 400;
    }

    .name:hover{
        color: rgb(0,0,0,.9);
    }
</style>