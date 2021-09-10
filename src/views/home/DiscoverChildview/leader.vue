<template>
    <div id="leaderboard" v-loading="loading">
        <div class="title">官方榜</div>
        <div class="allline" v-loading="loadingimg">
            <div v-for="item in leaderlist[0]" class="leaderline">
                <div class="imgbox2" @click="listdetail(item.id)">
                    <img :src="item.coverImgUrl" alt="" class="leaderimg">
                    <div class="button2">
                        <i class="el-icon-caret-right player"></i>
                    </div>
                </div>
                <div class="time">{{formatDate(item.updateTime)}}更新</div>
            </div>


            <div class="list">
                <!--飙升榜-->
                <div v-for="item in list1" class="list1">
                    <div v-for="(track,index) in item.tracks" class="line" :class="{bgc: index%2 === 0}" @dblclick="toast">
                        <div class="number">{{index + 1}}</div>
                        <div class="songname">{{track.first}}</div>
                        <div class="singername">{{track.second}}</div>
                    </div>
                    <div class="look" @click="listdetail(item.id)">查看全部 ></div>
                </div>

                <!--新歌榜-->
                <div v-for="item in list2"  class="list2">
                    <div v-for="(track,index) in item.tracks"  class="line" :class="{bgc: index%2 === 0}" @dblclick="toast">
                        <div class="number">{{index + 1}}</div>
                        <div class="songname">{{track.first}}</div>
                        <div class="singername">{{track.second}}</div>
                    </div>
                    <div class="look" @click="listdetail(item.id)">查看全部 ></div>
                </div>

                <!--原创榜-->
                <div v-for="item in list3"  class="list3">
                    <div v-for="(track,index) in item.tracks"  class="line" :class="{bgc: index%2 === 0}" @dblclick="toast">
                        <div class="number">{{index + 1}}</div>
                        <div class="songname">{{track.first}}</div>
                        <div class="singername">{{track.second}}</div>
                    </div>
                    <div class="look" @click="listdetail(item.id)">查看全部 ></div>
                </div>

                <!--热歌榜-->
                <div v-for="item in list4"  class="list4">
                    <div v-for="(track,index) in item.tracks"  class="line" :class="{bgc: index%2 === 0}" @dblclick="toast">
                        <div class="number">{{index + 1}}</div>
                        <div class="songname">{{track.first}}</div>
                        <div class="singername">{{track.second}}</div>
                    </div>
                    <div class="look" @click="listdetail(item.id)">查看全部 ></div>
                </div>
            </div>
        </div>


        <div class="title title2">全球榜</div>
        <div class="worldlist" v-loading="loadingimg">
            <div v-for="item in otherlist[0]" class="listitem">
                <div class="imgbox" @click="listdetail(item.id)">
                    <div class="imgboxcontent" v-if="item.playCount >= 10000">
                        <i class="el-icon-caret-right"></i>
                        {{parseInt(item.playCount/10000)}}万
                    </div>
                    <div class="imgboxcontent" v-if="item.playCount < 10000">
                        <i class="el-icon-caret-right"></i>
                        {{item.playCount}}
                    </div>
                    <img :src="item.coverImgUrl" alt="">
                    <div class="button">
                        <i class="el-icon-caret-right player"></i>
                    </div>
                </div>
                <div class="name" @click="listdetail(item.id)">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {gettoplist,gettopdetail} from "network/homedata";
    export default {
        name: "leader",
        data(){
          return {
              leaderlist:[],
              otherlist:[],
              list1:[],
              list2:[],
              list3:[],
              list4:[],

              loadingimg:true,
              loading:true
          }
        },
        created(){
                gettoplist().then(res => {
                    this.leaderlist.push(res.data.list.slice(0,4))
                    this.otherlist.push(res.data.list.slice(4,-1))
                    this.loadingimg = false
                })

                gettopdetail().then(res => {
                    this.list1 = res.data.list.slice(0,1)
                    this.list2 = res.data.list.slice(1,2)
                    this.list3 = res.data.list.slice(2,3)
                    this.list4 = res.data.list.slice(3,4)
                    this.loading = false
                })
        },
        methods:{
            listdetail(id){
                this.$router.push('/songlist/' + id)
            },
            formatDate (data) {
                var date = new Date(data)
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月'
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '日'
                return M + D
            },
            toast(){
                this.$message.warning("当前歌曲请进入对应歌单播放哦~")
            }
        }
    }
</script>

<style scoped>

    #leaderboard{
        position: relative;
        right: 12px;
        height: 2420px;
    }

    .title {
        font-family: 微软雅黑;
        font-size: 20px;
        font-weight: 600;
        margin-left: 99px;
        margin-top: 20px;
        position: relative;
    }

    .title2{
        position: relative;
        bottom: 28%;
    }

    .allline{
        position: relative;
        top: 10px;
    }

    .leaderline{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 44px;
        margin-left: 95px;
    }

    .leaderimg {
        width: 160px;
        height: 160px;
    }

    img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        cursor: pointer;
    }

    .worldlist{
        display: flex;
        flex-wrap: wrap;
        margin-left: 80px;
        position: relative;
        bottom: 27.5%;
    }

    .listitem{
        margin-left: 15px;
        position: relative;
        bottom: 10px;
    }

    .time{
        position: relative;
        right: 119px;
        opacity: .8;
        top: 30px;
        font-size: 8px;
        font-family: 微软雅黑;
        color: #fff;
        cursor: pointer;
        z-index: 20;
    }

    .imgbox{
        z-index: 1;
        height: 200px;
    }

    .imgbox2{
        z-index: 1;
        height: 160px;
    }

    .imgboxcontent{
        width: 40%;
        white-space: nowrap;
        z-index: 5;
        position: relative;
        top: 24px;
        left: 112px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #fff;
        font-family: 微软雅黑;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        font-size: 13px;
    }

    .imgbox:hover .button{
        display: inherit;
    }

    .imgbox2:hover .button2{
        display: inherit;
    }

    .button{
        background-color: #e2e2e2;
        opacity: .9;
        border-radius: 20px;
        width: 20%;
        height: 20%;
        position: relative;
        left: 41%;
        bottom: 61.5%;
        z-index: 10;
        display: none;
        cursor: pointer;
    }

    .button2{
        background-color: #e2e2e2;
        opacity: .8;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        position: relative;
        left: 38%;
        bottom: 66%;
        z-index: 10;
        display: none;
        cursor: pointer;
    }

    .player{
        font-size: 27px;
        color: #c62f2f;
        position: absolute;
        left: 16%;
        bottom: 16%;
    }

    .name {
        font-family: 微软雅黑;
        width: 200px;
        height: auto;
        font-size: 14px;
        margin-top: 14%;
        color: rgb(0,0,0,.7);
        display: flex;
        justify-content: flex-start;
        cursor: pointer;
    }

    .name:hover{
        color: rgb(0,0,0,.9);
    }

    .list{
        position: relative;
        left: 50%;
        bottom: 500px;
        font-weight: 300;
        color: rgb(0,0,0,.7);
        font-family: 微软雅黑;
    }

    .list1{
        position: relative;
        bottom: 318px;
        right: 24.5%;
    }
    .list2{
        position: relative;
        bottom: 290px;
        right: 24.5%;
    }
    .list3{
        position: relative;
        bottom: 260px;
        right: 24.5%;
    }
    .list4{
        position: relative;
        bottom: 232px;
        right: 24.5%;
    }

    .look{
        line-height: 44px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        color: rgb(0,0,0,.6);
    }

    .look:hover{
        color: rgb(0,0,0,.8);
    }

    .line{
        width: 70%;
        display: flex;
        align-items: center;
        justify-content:flex-start;
        line-height: 44px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        color: rgb(0,0,0,.6);
    }

    .line:hover{
        background-color: rgb(220,220,220,.4);
    }

    .bgc{
        background-color: rgb(220,220,220,.2);
    }

    .number{
        color: #ff2b1f;
        padding: 0px 20px 0px 20px;
        font-size: 13px;
    }

    .songname{
        padding-left: 200px;
        font-size: 13px;
    }

    .singername{
        position: absolute;
        right: 32%;
        font-size: 13px;
    }
</style>