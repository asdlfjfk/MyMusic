<template>
    <div id="recomv">
        <div class="line line1">
            <div class="title" @click="newmvtoallmv">最新MV ></div>
            <div class="category">
                <div v-for="(item,index) in area" class="areaitem" :class="{active: index === areacurrent}" @click="changearea(index)">{{item}}</div>
            </div>
        </div>
        <div class="newmv">
            <div v-for="item in newmv">
                <div class="mvplaycount">
                    <i class="el-icon-caret-right"></i>
                    {{parseInt(item.playCount / 10000)}}万
                </div>
                <img :src="item.cover" alt="" @click="mvdetail(item.id)">
                <div class="mvname" @click="mvdetail(item.id)">{{item.name}}</div>
                <div class="artistname">{{item.artistName}}</div>
            </div>
        </div>
        <div class="line line2">
            <div  class="title" @click="hotmvtoallmv">热播MV ></div>
        </div>
        <div class="newmv">
            <div v-for="item in hotmv">
                <div class="mvplaycount">
                    <i class="el-icon-caret-right"></i>
                    {{parseInt(item.playCount / 10000)}}万
                </div>
                <img :src="item.cover" alt="" @click="mvdetail(item.id)">
                <div class="mvname" @click="mvdetail(item.id)">{{item.name}}</div>
                <div class="artistname">{{item.artistName}}</div>
            </div>
        </div>
        <div class="line line3">
            <div  class="title" @click="wangyimvtoallmv">网易出品 ></div>
        </div>
        <div class="newmv">
            <div v-for="item in wangyimv">
                <div class="mvplaycount">
                    <i class="el-icon-caret-right"></i>
                    {{parseInt(item.playCount / 10000)}}万
                </div>
                <img :src="item.cover" alt="" @click="mvdetail(item.id)">
                <div class="mvname2" @click="mvdetail(item.id)">{{item.name}}</div>
            </div>
        </div>
        <div class="line line4">
            <div  class="title">MV排行榜 ></div>
            <div class="category">
                <div v-for="(item,index) in area" class="areaitem" :class="{active: index === areacurrent2}" @click="changearea2(index)">{{item}}</div>
            </div>
        </div>
        <div class="mvleader">
            <div v-for="(item,index) in mvleader" class="leaderitem">
                <div class="number">{{PrefixZero(index + 1)}}</div>
                <div>
                    <div class="mvplaycount">
                        <i class="el-icon-caret-right"></i>
                        {{parseInt(item.playCount)}}
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
    import {getnewmv,getwangyimv,getallmv,getmvleader} from "network/homedata"
    export default {
        name: "recomv",
        data(){
          return {
              area:['内地','港台','欧美','日本','韩国'],
              areacurrent:0,
              areacurrent2:0,
              newmv:[],
              wangyimv:[],
              hotmv:[],
              mvleader:[]
          }
        },
        created(){
            getnewmv(this.area[this.areacurrent],8).then(res => {
                this.newmv = res.data.data
            })
            getwangyimv(8).then(res => {
                this.wangyimv = res.data.data
            })
            getallmv('全部','全部','最热',8).then(res => {
                this.hotmv = res.data.data
            })

            getmvleader(10,this.area[this.areacurrent2]).then(res => {
                this.mvleader = res.data.data
            })
        },
        methods:{
            changearea(index){
                this.areacurrent = index
            },
            changearea2(index){
                this.areacurrent2 = index
            },
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
            newmvtoallmv(){
                this.$store.commit('changeallmvcategory',{area:1,type:0,order:2})
                this.$router.push('/allmv')
            },
            hotmvtoallmv(){
                this.$store.commit('changeallmvcategory',{area:0,type:0,order:1})
                this.$router.push('/allmv')
            },
            wangyimvtoallmv(){
                this.$store.commit('changeallmvcategory',{area:0,type:4,order:2})
                this.$router.push('/allmv')
            }
        },
        watch:{
            areacurrent(val){
                getnewmv(this.area[val],8).then(res => {
                    this.newmv = res.data.data
                })
            },
            areacurrent2(val){
                getmvleader(10,this.area[val]).then(res => {
                    this.mvleader = res.data.data
                })
            },
        }
    }
</script>

<style scoped>

    #recomv{
        overflow-x: hidden;
    }

    .line{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 20px 90px 0px 90px;
        font-family: 微软雅黑;
    }

    .category{
        display: flex;
        align-items: center;
        color: rgb(0,0,0,.6);
        z-index: 10;
    }

    .areaitem{
        margin-left: 20px;
        font-size: 13px;
        cursor: pointer;
    }

    .title{
        font-weight: 800;
        cursor: pointer;
        z-index: 10;
    }

    .active{
        opacity: .8;
        line-height: 30px;
        background-color: #fcf4f4;
        color: #d03535;
        border-radius: 20px;
        padding: 0px 10px 0px 10px;
    }

    .newmv{
        display: flex;
        flex-wrap: wrap;
        margin: 0px 40px 0px 90px;
        position: relative;
        bottom: 20px;
    }

    .mvleader{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 0px 90px 0px 130px;
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

    .artistname{
        font-size: 12px;
        font-weight: 400;
        color: rgb(0,0,0,.5);
        cursor: pointer;
    }

    .artistname:hover{
        color: rgb(0,0,0);
    }

    .mvname2{
        width: 240px;
        font-size: 14px;
        font-weight: 400;
        color: rgb(0,0,0,.7);
        cursor: pointer;
        margin-top: 5px;
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
</style>