<template>
    <div>
        相似歌手
    </div>
</template>

<script>
    import {getsimilarsinger} from "network/homedata"
    export default {
        name: "similar",
        created(){
            getsimilarsinger(this.id).then(res => {
                console.log(res);
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

</style>