<template>
    <div @scroll="scrollEvent" style="height: 1290px;">
        <div class="allsort">
            <div class="sort">
                <div class="sortname">语种:</div>
                <div class="allitem">
                    <div v-for="item in area" class="sortitem" @click="changearea(item.number)" :class="{active: item.number === areaparams}">{{item.name}}</div>
                </div>
            </div>

            <div class="sort">
                <div class="sortname">分类:</div>
                <div class="allitem">
                    <div v-for="item in type" class="sortitem" @click="changetype(item.number)" :class="{active: item.number === typeparams}">{{item.name}}</div>
                </div>
            </div>

            <div class="sort">
                <div class="sortname">筛选:</div>
                <div class="allitem">
                    <div v-for="item in letter" class="sortitem" @click="changeletter(item.number)" :class="{active: item.number === letterparams}">{{item.name}}</div>
                </div>
            </div>
        </div>


        <div class="single">
            <div class="singlelist" style="height: 1140px">
                <div v-for="item in artists" class="singleitem">
                    <img :src="item.img1v1Url" alt="">
                    <div class="singlename"><div class="name">{{item.name}}</div> <div class="iconfont" v-if="item.accountId">&#xe663;</div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getsinglelist} from "network/homedata"
    export default {
        name: "singer",
        data(){
            return {
                area: [{name:"全部",number:-1},{name:"华语",number:7},
                    {name:"欧美",number:96},{name:"日本",number:8},
                    {name:"韩国",number:16},{name:"其他",number:0},],
                type: [{name:"全部",number:-1},{name:"男歌手",number:1},
                    {name:"女歌手",number:2},{name:"乐队组合",number:3}],
                letter:[{name:'热门',number:-1},{name:'A',number:'a'},{name:'B',number:'b'},
                    {name:'C',number:'c'},{name:'D',number:'d'},{name:'E',number:'e'},
                    {name:'F',number:'f'},{name:'G',number:'g'},{name:'H',number:'h'},
                    {name:'I',number:'i'},{name:'J',number:'j'},{name:'K',number:'k'},
                    {name:'L',number:'l'}, {name:'M',number:'m'},{name:'N',number:'n'},
                    {name:'O',number:'o'},{name:'P',number:'p'},{name:'Q',number:'q'},
                    {name:'R',number:'r'},{name:'S',number:'s'},{name:'T',number:'t'},
                    {name:'U',number:'u'},{name:'V',number:'v'},{name:'W',number:'w'},
                    {name:'X',number:'x'},{name:'Y',number:'y'},{name:'Z',number:'z'},
                    {name:'#',number:0}],
                areaparams:-1,
                typeparams:-1,
                letterparams:-1,
                artists:[],
                page:0
            }
        },
        created(){
            getsinglelist(this.letterparams,this.typeparams,this.areaparams,this.page*30).then(res => {
                this.artists = res.data.artists
                this.loading = false
            })
        },
        methods:{
            changearea(number){
                this.areaparams = number
            },
            changetype(number){
                this.typeparams = number
            },
            changeletter(number){
                this.letterparams = number
            },
            scrollEvent(e){
                console.log(e);
            }
        },
        watch:{
            areaparams(val){
                getsinglelist(this.letterparams,this.typeparams,val,this.page*30).then(res => {
                    this.artists = res.data.artists
                })
            },
            typeparams(val){
                getsinglelist(this.letterparams,val,this.areaparams,this.page*30).then(res => {
                    this.artists = res.data.artists
                })
            },
            letterparams(val){
                getsinglelist(val,this.typeparams,this.areaparams,this.page*30).then(res => {
                    this.artists = res.data.artists
                })
            }
        }
    }
</script>

<style scoped>

    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
        color: red;
    }

    .allsort{
        margin-left: 2%;
        margin-right: 2%;
    }

    .sort{
        display: flex;
        justify-content: flex-start;
        font-family: 微软雅黑;
        color: rgb(0,0,0,.7);
        font-size: 12px;
    }

    .allitem{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        position: relative;
        top: 5.5px;
    }

    .sortname{
        width: 26px;
        height: 17px;
        white-space: nowrap;
        margin-top: 10px;
        line-height: 30px;
    }

    .sortitem{
        margin-left: 4px;
        display: flex;
        justify-content: center;
        width: 40px;
        height: 17px;
        align-items: center;
        white-space: nowrap;
        border-right: 1px solid gainsboro;
        margin-top: 10px;
        padding: 0px 10px 0px 10px;
        cursor: pointer;
        line-height: 30px;
    }

    .sortitem:hover{
        color: #d03535;
        opacity: .8;
    }

    .active{
        opacity: .8;
        border: 1px solid #fcf4f4;
        line-height: 30px;
        background-color: #fcf4f4;
        color: #d03535;
        border-radius: 20px;
        padding: 0px 10px 0px 10px;
    }

    .single{
        position: relative;
        top: 30px;
    }

    .singlelist{
        display: flex;
        flex-wrap: wrap;
    }

    .singleitem{
        margin-left: 15px;
    }

    img{
        width: 180px;
        height: 180px;
        border-radius: 5px;
        border: 1px solid rgb(220,220,220,.5);
    }

    .singlename{
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

    .singlename:hover{
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