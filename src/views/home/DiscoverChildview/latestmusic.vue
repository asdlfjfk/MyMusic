<template>
    <div>
        <div class="line1">
            <div class="btn">
                <div class="btn1" :class="{active: current === 1}" @click="changecurrent(1)">新歌速递</div>
                <div class="btn1" :class="{active: current === 2}" @click="changecurrent(2)">新碟上架</div>
            </div>
        </div>
        <div class="line2">
            <div v-for="(item,index) in type" class="item" :class="{active2: typecurrent === index}" @click="currenttype(index)">{{item.name}}</div>
        </div>

        <div class="list" v-loading="loading">
            <newsong v-if="current === 1"></newsong>
            <newalbum v-if="current === 2"></newalbum>
        </div>
    </div>
</template>

<script>
    import {getnewsong} from "network/homedata"
    const newsong = () => import('../../../views/latestmusiclist/newsong.vue')
    const newalbum = () => import('../../../views/latestmusiclist/newalbum.vue')
    export default {
        name: "latestmusic",
        components:{
            newsong,newalbum
        },
        data(){
            return {
                loading:true,
                current:1,
                type:[{name:'全部',number:0,number2:'ALL'},{name:'华语',number:7,number2:'ZH'},{name:'欧美',number:96,number2:'EA'},{name:'日本',number:8,number2:'JP'},{name:'韩国',number:16,number2:'KR'}],
                typecurrent:0
            }
        },
        methods:{
            changecurrent(num){
                this.current = num
            },
            currenttype(index){
               this.typecurrent = index
                this.$store.commit('changenewalbumcurrent',this.type[index].number2)
            }
        },
        created(){
            this.$store.commit('cleansongset')
            getnewsong(this.type[this.typecurrent].number).then(res => {
                this.$store.commit('pushallsong',res.data.data)
                this.$store.commit('changeflag',2)
                this.loading = false
            })
        },
        watch:{
            typecurrent(val){
                this.loading = true
                this.$store.commit('cleansongset')
                this.typecurrent = val
                getnewsong(this.type[this.typecurrent].number).then(res => {
                    this.$store.commit('pushallsong',res.data.data)
                    this.$store.commit('changeflag',2)
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped>

    .line1{
        margin: 18px 510px 10px 470px;
    }

    .line2{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: 80px;
        position: relative;
        top: 10px;
        z-index: 10;
    }

    .item{
        margin-left: 24px;
        font-size: 14px;
        font-family: 微软雅黑;
        cursor: pointer;
        color: rgb(0,0,0,.6);
    }

    .btn{
        border: 1px solid #b4b4b4;
        width: 240px;
        display: flex;
        background-color: #fff;
        border-radius: 20px;
    }

    .btn1{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 120px;
        padding: 5px 20px 5px 20px;
        background-color: #fff;
        border-radius: 20px;
        font-size: 12px;
        font-family: 微软雅黑;
        cursor: pointer;
        font-weight: 400;
    }

    .btn1:hover{
        background-color: rgb(220,220,220,.4);
    }

    .active{
        background-color: #b4b4b4;
        color: #fff;
    }

    .active:hover{
        background-color: #b4b4b4;
        color: #fff;
    }

    .active2{
        font-weight: 800;
        color: #000;
    }

    .line{
        width: 850px;
        display: flex;
        align-items: center;
        justify-content:flex-start;
        line-height: 44px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 400;
        color: rgb(0,0,0,.6);
    }

    .bgc{
        background-color: rgb(220,220,220,.2);
    }

    img{
        width: 40px;
        height: 40px;
        border-radius: 10px;
    }

    .list{
        z-index: 1;
    }
</style>