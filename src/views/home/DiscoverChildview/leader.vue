<template>
    <div><h2>222</h2></div>

</template>

<script>
    import {gettoplist} from "network/homedata"
    export default {
        name: "leader",
        created(){
            gettoplist().then(res => {
                console.log(res);
            })
        }
    }
</script>

<style scoped>

</style>