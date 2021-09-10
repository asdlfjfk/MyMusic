<template>
    <div id="allmv">
        <div class="head">全部MV</div>
        <div class="allcate">
            <div class="category">
                <div>地区:</div>
                <div v-for="(item,index) in area" class="cateitem"  @click="changearea(index)">
                    <div :class="{active: index === areacurrent}" class="itemtext">{{item}}</div>
                </div>
            </div>
            <div class="category">
                <div>类型:</div>
                <div v-for="(item,index) in type" class="cateitem" @click="changetype(index)">
                    <div :class="{active: index === typecurrent}"  class="itemtext">{{item}}</div>
                </div>
            </div>
            <div class="category">
                <div>排序:</div>
                <div v-for="(item,index) in order" class="cateitem" @click="changeorder(index)">
                    <div :class="{active: index === ordercurrent}" class="itemtext">{{item}}</div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="allmv" ref="allmv" v-loading="loading">
                <div v-for="item in mvs" class="mvitem">
                    <div class="mvplaycount" v-if="item.playCount >= 10000">
                        <i class="el-icon-caret-right"></i>
                        {{parseInt(item.playCount / 10000)}}万
                    </div>
                    <div class="mvplaycount" v-if="item.playCount < 10000">
                        <i class="el-icon-caret-right"></i>
                        {{item.playCount}}
                    </div>
                    <img :src="item.cover" alt="" @click="mvdetail(item.id)">
                    <div class="mvname" @click="mvdetail(item.id)">{{item.name}}</div>
                    <div class="artistname">{{item.artistName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getallmv} from "network/homedata"
    export default {
        name: "allmv",
        data(){
            return {
                loading:true,
                area:['全部','内地','港台','欧美','韩国','日本'],
                type:['全部','官方版','原声','现场版','网易出品'],
                order:['上升最快','最热','最新'],
                areacurrent:0,
                typecurrent:0,
                ordercurrent:0,
                page:0,
                mvs:[]
            }
        },
        computed:{
          areax(){
              return this.$store.state.allmvcategory.area
          },
          typex(){
              return this.$store.state.allmvcategory.type
          },
          orderx(){
              return this.$store.state.allmvcategory.order
          }
        },
        created(){
            //保存选中状态 防止页面刷新后消失
            window.addEventListener("pagehide",()=>{
                sessionStorage.setItem("areacurrent",JSON.stringify(this.areacurrent))
                sessionStorage.setItem("typecurrent",JSON.stringify(this.typecurrent))
                sessionStorage.setItem("ordercurrent",JSON.stringify(this.ordercurrent))
            })
            window.addEventListener("pageshow",()=>{
                if(sessionStorage.getItem('areacurrent') === null) {
                    sessionStorage.setItem("areacurrent",JSON.stringify(this.areacurrent))
                }
                if(sessionStorage.getItem('typecurrent') === null) {
                    sessionStorage.setItem("typecurrent",JSON.stringify(this.typecurrent))
                }
                if(sessionStorage.getItem('ordercurrent') === null) {
                    sessionStorage.setItem("ordercurrent",JSON.stringify(this.ordercurrent))
                }
                this.areacurrent = parseInt(sessionStorage.getItem("areacurrent"));
                this.typecurrent = parseInt(sessionStorage.getItem("typecurrent"));
                this.ordercurrent = parseInt(sessionStorage.getItem("ordercurrent"));
            })

            //保证vuex中的内容不为空再进行赋值
            if (this.areax !== undefined && this.typex !== undefined && this.orderx !== undefined) {
                this.areacurrent = this.areax
                this.typecurrent = this.typex
                this.ordercurrent = this.orderx
            }
            getallmv(this.area[this.areacurrent],this.type[this.typecurrent],this.order[this.ordercurrent],20,this.page * 20).then(res => {
                this.mvs = res.data.data
                this.loading = false
            })
        },
        methods:{
            changearea(index){
                this.areacurrent = index
            },
            changetype(index){
                this.typecurrent = index
            },
            changeorder(index){
                this.ordercurrent = index
            },
            mvdetail(id){
                this.$router.push('/mvpage/' +  id)
            },
            Scroll(){
                let box = this.$refs.allmv
                console.log(box.getBoundingClientRect().bottom);
                if (parseInt(box.getBoundingClientRect().bottom) === 679) {
                    this.page += 1
                }else if (parseInt(box.getBoundingClientRect().bottom) === 680) {
                    this.page += 1
                }else if (parseInt(box.getBoundingClientRect().bottom) === 897) {
                    this.page += 1
                }
            }
        },
        watch:{
            areacurrent(val){
                this.loading = true
                this.areacurrent = val
                getallmv(this.area[this.areacurrent],this.type[this.typecurrent],this.order[this.ordercurrent],20,this.page * 20).then(res => {
                    this.mvs = res.data.data
                    this.loading = false
                })
            },
            typecurrent(val){
                this.loading = true
                this.typecurrent = val
                getallmv(this.area[this.areacurrent],this.type[this.typecurrent],this.order[this.ordercurrent],20,this.page * 20).then(res => {
                    this.mvs = res.data.data
                    this.loading = false
                })
            },
            ordercurrent(val){
                this.loading = true
                this.ordercurrent = val
                getallmv(this.area[this.areacurrent],this.type[this.typecurrent],this.order[this.ordercurrent],20,this.page * 20).then(res => {
                    this.mvs = res.data.data
                    this.loading = false
                })
            },
            page(val){
                this.loading = true
                getallmv(this.area[this.areacurrent],this.type[this.typecurrent],this.order[this.ordercurrent],20,val * 20).then(res => {
                    let data = res.data.data
                    for (let item of data) {
                        this.mvs.push(item)
                    }
                    this.loading = false
                })
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

    #allmv{
        height: calc(100vh - 160px);
        width: 1240px;
        margin: 0 auto;
    }

    .main{
        position: relative;
        left: 80px;
        margin-bottom: 40px;
    }

    .head{
        font-weight: 800;
        font-size: 20px;
        position: relative;
        left: 78px;
        top: 10px;
        font-family: 微软雅黑;
    }

    .allcate{
        position: relative;
        left: 80px;
        top: 10px;
    }

    .category{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-top: 2px;
        font-size: 13px;
        font-family: 微软雅黑;
        margin-top: 10px;
    }

    .cateitem{
        width: 70px;
        white-space: nowrap;
        display: flex;
        justify-content: center;
        color: rgb(0,0,0,.6);
        position: relative;
        left: 10px;
        cursor: pointer;
        line-height: 30px;
    }
    
    .cateitem:hover{
        color: rgb(0,0,0,.8);
    }

    .active{
        opacity: .8;

        background-color: #fcf4f4;
        color: #d03535;
        border-radius: 20px;
    }

    .itemtext{
        padding: 0px 8px 0px 8px;
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

    .allmv{
        display: flex;
        flex-wrap: wrap;
    }

    .mvplaycount{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        color: #fff;
        position: relative;
        top: 40px;
        right: 22px;
        text-shadow: rgb(0 0 0) 0px 0px 2px;
        z-index: 10;
        font-size: 12px;
        font-weight: 400;
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
</style>