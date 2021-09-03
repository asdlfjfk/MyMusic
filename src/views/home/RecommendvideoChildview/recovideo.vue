<template>
    <div>
        <div>全部视频</div>
    </div>
</template>

<script>
    import {getvideolist,getvideocategorylist,getvideogroup,getallvideo} from "network/homedata"
    export default {
        name: "recovideo",
        created(){
            getallvideo(0).then(res => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>