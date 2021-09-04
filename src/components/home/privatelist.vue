<template>
    <div>
        111
    </div>
</template>

<script>
    import {getprivatelist} from "network/homedata"
    export default {
        name: "privatelist",
        data(){
          return {
              page:0
          }
        },
        created(){
            // getprivatelist(60,this.page * 60).then(res => {
            //     console.log(res);
            // })
        }
    }
</script>

<style scoped>

</style>