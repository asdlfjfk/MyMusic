<template>
    <div id="personal">
        <el-container class="container">
            <el-carousel type="card" class="swiper" interval="5000" height="244px">
                <el-carousel-item v-for="item in banners" :key="item.id" class="swiperitem">
                    <img :src="item.imageUrl" alt="">
                </el-carousel-item>
            </el-carousel>
        </el-container>

        <el-container>

        </el-container>
    </div>

</template>

<script>
    import {getbanner} from "network/homedata";

    export default {
        name: "personality",
        data(){
            return {
                banners:[],
            }
        },
        created(){
            getbanner().then(res => {
                this.banners = res.data.banners
                console.log(this.banners);
            })
        },
    }
</script>

<style scoped>

    .swiper{
        width: 120%;
        height: 80%;
        align: center;
        border-radius: 15px;
        margin: 0 auto;
        padding: 0;
        vertical-align: center;
    }
    .swiperitem{
        border-radius: 15px;
    }

    .swiperitem img{
        width: 100%;
        height: 100%;
    }
</style>