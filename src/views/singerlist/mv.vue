<template>
    <div id="mv" v-loading="loading">
        <div class="allmv" ref="allmv">
            <div v-for="item in mvs" class="mvitem" @click="mvdetail(item.id)">
                <img :src="item.imgurl16v9" alt="">
                <div class="name">{{item.name}}</div>

                <div class="mvplaycount" v-if="item.playCount >= 10000">
                    <i class="el-icon-caret-right"></i>
                    {{parseInt(item.playCount/10000)}}万
                </div>
                <div class="mvplaycount" v-if="item.playCount < 10000">
                    <i class="el-icon-caret-right"></i>
                    {{item.playCount}}
                </div>

                <div class="time">{{format(item.duration)}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getsingermv} from "network/homedata";

    export default {
        name: "mv",
        data(){
            return{
                loading:true,
                mvs:[],
                page:1
            }
        },
        created(){
            getsingermv(this.id,20,(this.page - 1) * 20).then(res => {
                this.mvs = res.data.mvs
                this.loading = false
            })
        },
        methods:{
            //下拉加载更多
            Scroll(){
                let box = this.$refs.allmv
                if (parseInt(box.getBoundingClientRect().bottom) === 670) {
                    this.page += 1
                }
            },
            format (data) {
                let date = new Date(data)
                let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
                let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
                return m + s
            },
            mvdetail(id){
                this.$router.push('/mvpage/' +  id)
            }
        },
        watch:{
          page(val){
              this.loading = true
              getsingermv(this.id,20,(val - 1) * 20).then(res => {
                  for (let mv of res.data.mvs){
                      this.mvs.push(mv)
                  }
                  this.loading = false
              })
          }
        },
        computed:{
            id(){
                return this.$route.params.id
            }
        },
        mounted(){
            window.addEventListener('scroll',this.Scroll,true)
        },
        destroyed() {
            window.removeEventListener('scroll', this.Scroll, true);
        },
    }
</script>

<style scoped>

    #mv{
        overflow: hidden;
    }

    .allmv{
        display: flex;
        flex-wrap: wrap;
        position: relative;
        margin-bottom: 20px;
    }

    img{
        width: 240px;
        height: 134px;
        border: 1px solid gainsboro;
        border-radius: 4px;
        margin-left: 24px;
        cursor: pointer;
    }

    .mvitem{
        height: 180px;
    }

    .name{
        width: 240px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 24px;
        color: rgb(0,0,0,.6);
        font-weight: 400;
        cursor: pointer;
        font-size: 14px;
        font-family: 微软雅黑;
        margin-top: 5px;
    }
    
    .name:hover{
        color: rgb(0,0,0,.8);
    }

    .mvplaycount{
        color: #fff;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        bottom: 160px;
        right: 8px;
        font-family: 微软雅黑;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        font-size: 13px;
    }

    .time{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        bottom: 65px;
        right: 6px;
        font-size: 12px;
        font-weight: 400;
        color: #fff;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
    }
</style>