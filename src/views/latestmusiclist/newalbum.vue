<template>
    <div id="allalbum">
        <div class="albums"  v-loading="loading">
            <div v-for="item in weekData">
                <div class="imgbox" @click="listdetail(item.id)">
                    <img :src="item.blurPicUrl" alt="">
                </div>
                <div class="name" @click="listdetail(item.id)">{{item.name}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getnewalbum} from "network/homedata"
    export default {
        name: "newalbum",
        data(){
            return {
                loading:true,
                weekData:[]
            }
        },
        created(){
                if (this.currentarea !== 'ALL'){
                    getnewalbum(this.currentarea).then(res => {
                        this.weekData = res.data.monthData;
                        this.loading = false
                    })
                }else if (this.currentarea === 'ALL') {
                    getnewalbum(this.currentarea).then(res => {
                        this.weekData = res.data.weekData;
                        this.loading = false
                    })
                }
        },
        computed:{
            currentarea(){
              return this.$store.state.newalbumcurrent
          }
        },
        watch:{
            currentarea(val){
                this.loading = true
                if (val !== 'ALL'){
                    getnewalbum(val).then(res => {
                        this.weekData = res.data.monthData;
                        this.loading = false
                    })
                }else if (val === 'ALL') {
                    getnewalbum(val).then(res => {
                        this.weekData = res.data.weekData;
                        this.loading = false
                    })
                }
            },
        },
        methods:{
            listdetail(id){
                this.$router.push('/albumlist/' + id)
            },
        }
    }
</script>

<style scoped>

    #allalbum{
        position: relative;
        top:14px;
        left: 50px;
        margin-bottom: 50px;
    }

    .albums{
        display: flex;
        flex-wrap: wrap;
    }

    img{
        width:180px;
        height: 180px;
        background-color: #29281f;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        z-index: 10;
        filter:drop-shadow(0 0 3px gainsboro);
    }

    .imgbox{
        margin-left: 20px;
        margin-top: 30px;
        width:200px;
        height: 180px;
        background-color: #29281f;
        border-radius: 400px;
        z-index: 5;
        cursor: pointer;
    }

    .name{
        position: relative;
        left: 20px;
        top: 5px;
        font-weight: 800;
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
    }
</style>