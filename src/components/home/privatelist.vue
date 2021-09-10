<template>
    <div id="privatelist">
        <div class="title">< 独家放送</div>
        <div class="allvideos" ref="videos">
            <div v-for="item in list">
                <div class="item" v-if="item.type === 5 || item.type === 62 || item.type === 19">
                    <div class="privateicon" >
                        <i class="el-icon-caret-right" v-if="item.type === 5 || item.type === 62"></i>
                        <i class="el-icon-document" v-if="item.type === 19"></i>
                    </div>
                    <img :src="item.picUrl" alt="" @click="videodetail(item)">
                    <div class="name" @click="videodetail(item)">{{item.name}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getprivatelist} from "network/homedata"
    export default {
        name: "privatelist",
        data(){
          return {
              page:0,
              list:[]
          }
        },
        created(){
            getprivatelist(30,this.page * 30).then(res => {
                this.list = res.data.result
            })
        },
        mounted(){
            window.addEventListener('scroll',this.Scroll,true)
        },
        destroyed() {
            window.removeEventListener('scroll', this.Scroll, true);
        },
        methods:{
            Scroll(){
                let box = this.$refs.videos
                if (parseInt(box.getBoundingClientRect().bottom) === 680) {
                    this.page += 1
                }
                else if (parseInt(box.getBoundingClientRect().bottom) === 679){
                    this.page += 1
                }
            },
            videodetail(item){
                if (item.type === 62) {
                    this.$router.push('/videopage/' +  item.videoId)
                }
                else if (item.type === 19){
                    window.location.href = item.url
                }else if (item.type === 5) {
                    this.$router.push('/mvpage/' +  item.id)
                }
            }
        },
        watch:{
            page(val){
                getprivatelist(30,val * 30).then(res => {
                    for (let video of res.data.result){
                        this.list.push(video)
                    }
                })
            }
        }
    }
</script>

<style scoped>

    #privatelist{
        height: calc(100vh - 160px);
    }

    .title{
        font-weight: 800;
        font-size: 20px;
        padding: 20px 0px 20px 40px;
        font-family: 微软雅黑;
    }

    .allvideos{
        display: flex;
        flex-wrap: wrap;
        position: relative;
        bottom: 20px;
    }

    .item{
        margin-left: 40px;
    }

    img{
        width: 350px;
        height: 130px;
        border-radius: 5px;
        cursor: pointer;
    }

    .name{
        width: 350px;
        font-size: 14px;
        color: rgb(0,0,0,.7);
        font-weight: 400;
        font-family: 微软雅黑;
        cursor: pointer;
        margin-top: 5px;
    }

    .name:hover{
        color: #000;
    }

    .privateicon{
        color: #fff;
        width: 24px;
        height: 24px;
        background-color: rgb(226,226,226,.4);
        border: 1px solid #fff;
        border-radius: 20px;
        z-index:20;
        position: relative;
        left: 10px;
        top: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>