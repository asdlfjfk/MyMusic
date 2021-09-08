<template>
    <div>
        <div class="singer">
            <div class="singerlist">
                <div v-for="item in artists" class="singeritem" @click="listdetail(item.id)">
                    <img :src="item.img1v1Url">
                    <div class="singername" @click="listdetail(item.id)"><div class="name">{{item.name}}</div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getsimilarsinger} from "network/homedata"
    export default {
        name: "similar",
        data(){
            return {
                artists: []
            }
        },
        methods:{
            listdetail(id){
                this.$router.push('/singerlist/' + id)
            }
        },
        created(){
            if (this.logincookie){
                getsimilarsinger(this.id,this.logincookie).then(res => {
                    this.artists = res.data.artists
                })
            } else {
                this.$message.error("请先登录哦")
            }
        },
        computed:{
            id(){
                return this.$route.params.id
            },
            logincookie(){
                return sessionStorage.getItem("logincookie")
            }
        },
        watch:{
            '$route'(){
                let logincookie = sessionStorage.getItem("logincookie")
                if (logincookie){
                    getsimilarsinger(this.id,logincookie).then(res => {
                        this.artists = res.data.artists
                    })
                } else {
                    this.$message.error("请先登录哦")
                }
            }
        }
    }
</script>

<style scoped>
    .singer{
        position: relative;
        right: 40px;
    }

    .singerlist{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 44px;
    }

    .singeritem{
        margin-left: 45px;
        margin-top: 15px;
    }

    img{
        width: 180px;
        height: 180px;
        border-radius: 5px;
        border: 1px solid rgb(220,220,220,.5);
        cursor: pointer;
    }

    .singername{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-family: 微软雅黑;
        color: rgb(0,0,0,.6);
        cursor: pointer;
        position: relative;
        top: 2px;
        width: 180px;
        white-space: nowrap;
    }

    .singername:hover{
        color: rgb(0,0,0,.8);
    }

    .name{
        width: 164px;
        overflow: hidden;
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>