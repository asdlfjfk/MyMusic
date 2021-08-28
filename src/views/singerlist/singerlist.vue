<template>
    <div>
        <div class="head">
            111
        </div>
        <div></div>
    </div>
</template>

<script>
    import {getsingerdetail} from "network/homedata"
    export default {
        name: "singerlist",
        data(){
          res:[]
        },
        created(){
            let id = this.routeid
            console.log(id);
            getsingerdetail(id).then(res => {
                this.res = res
            })
        },
        computed:{
            routeid(){
                return this.$route.params.id
            }
        },
    }
</script>

<style scoped>

</style>