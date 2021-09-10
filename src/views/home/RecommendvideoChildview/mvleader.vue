<template>
    <div id="mvleader">
        <div class="line">
            <div  class="title">MV排行榜</div>
            <div class="category">
                <div class="update">最近更新时间: {{formatDate(updatetime)}}</div>
                <div v-for="(item,index) in area" class="areaitem" :class="{active: index === areacurrent2}" @click="changearea2(index)">{{item}}</div>
            </div>
        </div>
        <div class="mvleader" v-loading="loading">
            <div v-for="(item,index) in mvleader" class="leaderitem">
                <div class="number">{{PrefixZero(index + 1)}}</div>
                <div>
                    <div class="mvplaycount" v-if="item.playCount >= 10000">
                        <i class="el-icon-caret-right"></i>
                        {{parseInt(item.playCount / 10000)}}万
                    </div>
                    <div class="mvplaycount" v-if="item.playCount < 10000">
                        <i class="el-icon-caret-right"></i>
                        {{item.playCount}}
                    </div>
                    <img :src="item.cover" alt="" @click="mvdetail(item.id)">
                </div>
                <div>
                    <div class="mvname leadermvname" @click="mvdetail(item.id)">{{item.name}}</div>
                    <div class="artistname leaderartistname">{{item.artistName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getmvleader} from "network/homedata"
    import {formatDate} from "../../../common/util";

    export default {
        name: "mvleader",
        mixins:[formatDate],
        data(){
            return {
                loading:true,
                area:['内地','港台','欧美','日本','韩国'],
                areacurrent2:0,
                mvleader:[],
                updatetime:0
            }
        },
        created(){
            getmvleader(50,this.area[this.areacurrent2]).then(res => {
                this.mvleader = res.data.data
                this.loading = false
                this.updatetime = res.data.updateTime
            })
        },
        methods:{
            PrefixZero(num) { //序号不足两位往前补0
                if (parseInt(num) < 10){
                    return '0' + num
                }
                else {
                    return num
                }
            },
            mvdetail(id){
                this.$router.push('/mvpage/' +  id)
            },
            changearea2(index){
                this.areacurrent2 = index
            }
        },
        watch:{
            areacurrent2(val){
                this.loading = true
                getmvleader(50,this.area[val]).then(res => {
                    this.mvleader = res.data.data
                    this.updatetime = res.data.updateTime
                    this.loading = false
                })
            },
        }
    }
</script>

<style scoped>

    #mvleader{
        height: calc(100vh - 160px);
        width: 1200px;
        margin: 0 auto;
    }

    .title{
        font-weight: 800;
        cursor: pointer;
        z-index: 10;
        font-size: 20px;
        position: relative;
        left: 24px;
        top: 40px;
        z-index: 10;
    }

    .category{
        display: flex;
        align-items: center;
        color: rgb(0,0,0,.6);
        z-index: 10;
        position: relative;
        left: 600px;
        top: 10px;
    }

    .areaitem{
        margin-left: 20px;
        font-size: 13px;
        cursor: pointer;
    }

    .active{
        opacity: .8;
        line-height: 30px;
        background-color: #fcf4f4;
        color: #d03535;
        border-radius: 20px;
        padding: 0px 10px 0px 10px;
    }

    .update{
        font-family: 微软雅黑;
        font-size: 13px;
        position: relative;
        right: 575px;
        bottom: 30px;
        opacity: .5;
    }

    .mvleader{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0px 90px 30px 130px;
        position: relative;
        right: 40px;
    }

    .leaderitem{
        width: 400px;
        display: flex;
        align-items: center;
    }

    .number{
        font-size: 24px;
        opacity: .4;
        margin-right: 14px;
        width: 30px;
        border-bottom: 2px solid gainsboro;
    }

    .mvplaycount{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        position: relative;
        top: 42px;
        right: 24px;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        z-index: 10;
        font-size: 13px;
        font-weight: 400;
    }

    .mvname{
        width: 240px;
        font-size: 14px;
        font-weight: 400;
        color: rgb(0,0,0,.7);
        cursor: pointer;
        margin-top: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .mvname:hover{
        color: rgb(0,0,0);
    }

    .leadermvname{
        width: 161px;
        position: relative;
        bottom: 10px;
        font-size: 13px;
    }

    .leaderartistname{
        position: relative;
        top: 20px;
    }

    .artistname{
        font-size: 12px;
        font-weight: 400;
        color: rgb(0,0,0,.5);
        cursor: pointer;
    }

    .artistname:hover{
        color: rgb(0,0,0);
    }

    img{
        width: 240px;
        height: 140px;
        border-radius: 5px;
        margin: 20px 0px 0px 15px;
        position: relative;
        right: 15px;
        cursor: pointer;
        border: 1px solid gainsboro;
    }
</style>