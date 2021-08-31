<template>
    <div>
        <div class="des">
            <div class="txt">{{des}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detail",
        props:{
            des:{
                type:String,
                default(){
                    return ""
                }
            }
        },
    }
</script>

<style scoped>

    .des{
        margin: 0px 66px 0px 40px;
    }

.txt{
    font-size: 14px;
    margin-top: 10px;
    opacity: .8;
    text-indent: 2em;
    line-height: 30px;
}
</style>