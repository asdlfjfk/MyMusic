<template>
    <div id="detail" v-loading="loading">
        <div>
            <div class="title">个人简介</div>
            <div class="txt">{{briefDesc}}</div>
        </div>
        <div>
            <div class="title">{{famous.ti}}</div>
            <div class="txt">{{famous.txt}}</div>
        </div>
        <div>
            <div class="title">{{success.ti}}</div>
            <div class="txt">{{success.txt}}</div>
        </div>
        <div>
            <div class="title">{{exper.ti}}</div>
            <div class="txt">{{exper.txt}}</div>
        </div>
    </div>
</template>

<script>
    import {getsingerdes} from "network/homedata"
    export default {
        name: "singerdetail",
        data(){
            return {
                loading:true,
                briefDesc:"",
                famous:"",
                success:"",
                exper:""
            }
        },

        created(){
            getsingerdes(this.id).then(res => {
                this.briefDesc = res.data.briefDesc
                if (res.data.introduction.length > 0){
                    this.famous = res.data.introduction[0];
                    this.success = res.data.introduction[1];
                    this.exper = res.data.introduction[2];
                }
                this.loading = false
            })
        },
        computed:{
            id(){
                return this.$route.params.id
            }
        }
    }
</script>

<style scoped>

    #detail{
        margin-bottom: 40px;
        margin-left: 10px;
        margin-right: 10px;
    }

    .txt{
        font-size: 14px;
        margin-top: 10px;
        opacity: .8;
        text-indent: 2em;
        line-height: 30px;
    }

    .title{
        margin-top: 20px;
        font-size: 15px;
        font-weight: 800;
    }
</style>