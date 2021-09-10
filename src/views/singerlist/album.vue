<template>
    <div id="albums" v-loading="loading">
        <div class="allalbums">
            <div v-for="item in hotAlbums">
                <div class="imgbox" @click="listdetail(item.id)">
                    <img :src="item.blurPicUrl" alt="">
                </div>
                <div class="name" @click="listdetail(item.id)">{{item.name}}</div>
                <div class="publishtime">{{formatDate(item.publishTime)}}发布</div>
            </div>
        </div>
        <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pagesize"
                :total="count" @current-change="currentChange">
        </el-pagination>
    </div>
</template>

<script>
    import {getsingeralbum} from "network/homedata"
    export default {
        name: "album",
        data(){
            return {
                loading:true,
                pagesize:20,
                count:0,
                page:1,
                hotAlbums:[],
            }
        },
        created(){
            getsingeralbum(this.id,20,(this.page - 1) * 20).then(res => {
                this.count = res.data.artist.albumSize
                this.hotAlbums = res.data.hotAlbums
                this.loading = false
            })
        },
        computed:{
            id(){
                return this.$route.params.id
            }
        },
        methods:{
            currentChange(currentPage){
                this.loading = true
                getsingeralbum(this.id,20,(currentPage - 1) * 20).then(res => {
                    this.hotAlbums = res.data.hotAlbums
                    this.loading = false
                })
            },
            listdetail(id){
                this.$router.push('/albumlist/' + id)
            },
            formatDate (data) {
                var date = new Date(data)
                var Y = date.getFullYear() + '-'
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
                var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
                return Y + M + D
            }
        }
    }
</script>

<style scoped>

    .allalbums{
        display: flex;
        flex-wrap: wrap;
        position: relative;
        bottom: 20px;
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

    #albums >>> .el-pagination{
        position: relative;
        left: 28%;
        right: 30%;
        margin-top: 60px;
        bottom: 30px;
    }

    #albums >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
        background-color: #c62f2f;
    }

    #albums >>> .el-pagination.is-background .el-pager li:not(.disabled).active:hover{
        color: #fff;
    }

    #albums >>> .el-pagination.is-background .el-pager li:not(.disabled):hover{
        color: #c62f2f;
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

    .publishtime{
        margin-left: 20px;
        font-size: 12px;
        position: relative;
        top: 8px;
        opacity: .8;
    }
</style>