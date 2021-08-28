<template>
    <div ref="singer" id="singer">
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


        <div class="singer">
            <div class="singerlist" v-loading="loading">
                <div v-for="item in artists" class="singeritem" @click="listdetail(item.id)">
                    <img :src="item.img1v1Url">
                    <div class="singername" @click="listdetail(item.id)"><div class="name">{{item.name}}</div> <div class="iconfont" v-if="item.accountId">&#xe663;</div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getsingerlist} from "network/homedata"
    export default {
        name: "singer",
        data(){
            return {
                loading:true,
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
            getsingerlist(this.letterparams,this.typeparams,this.areaparams,this.page*30).then(res => {
                this.artists = res.data.artists
                this.loading = false
            })
        },
        destroyed() {
            // 离开该页面需要移除这个监听的事件，不然会报错  必须带第三个参数true，否则销毁不成功
            window.removeEventListener('scroll', this.Scroll, true);
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
            Scroll(){
                let box = this.$refs.singer
                if (parseInt(box.getBoundingClientRect().bottom) === 646) {
                    this.page += 1
                }else if (parseInt(box.getBoundingClientRect().bottom) === 645) {
                    this.page += 1
                }
            },
            listdetail(id){
                this.$router.push('/singerlist/' + id)
            },
        },
        watch:{
            areaparams(val){
                this.page = 0
                this.loading = true
                getsingerlist(this.letterparams,this.typeparams,val,this.page*30).then(res => {
                    this.artists = res.data.artists
                    this.loading = false
                })
            },
            typeparams(val){
                this.page = 0
                this.loading = true
                getsingerlist(this.letterparams,val,this.areaparams,this.page*30).then(res => {
                    this.artists = res.data.artists
                    this.loading = false
                })
            },
            letterparams(val){
                this.page = 0
                this.loading = true
                getsingerlist(val,this.typeparams,this.areaparams,this.page*30).then(res => {
                    this.artists = res.data.artists
                    this.loading = false
                })
            },
            page(val){
                this.loading = true
                getsingerlist(this.letterparams,this.typeparams,this.areaparams,val*30).then(res => {
                    for (let singer of res.data.artists) {
                        this.artists.push(singer)
                    }
                    this.loading = false
                })
            }
        },
        mounted(){
            window.addEventListener('scroll',this.Scroll,true)
        },
    }
</script>

<style scoped>

    #singer{
        margin: 0px 14px 0px 14px;
    }

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

    .singer{
        position: relative;
        top: 20px;
    }

    .singerlist{
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 44px;
    }

    .singeritem{
        margin-left: 15px;
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