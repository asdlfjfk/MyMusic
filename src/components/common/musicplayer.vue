<template>
        <div id="player">
            <div class="iconfont">
                &#xe602;
            </div>
            <div  class="iconfont2">
                &#xe618;
            </div>
            <div  class="iconfont">
                &#xe61b;
            </div>
            <!--<audio></audio>-->
        </div>
</template>

<script>
    export default {
        name: "musicplayer"
    }
</script>

<style scoped>

    .iconfont{
        font-family:"iconfont" !important;
        font-size:20px;font-style:normal;
        color: rgb(0,0,0,.7);
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconfont2{
        font-family:"iconfont" !important;
        font-size:40px;font-style:normal;
        padding: 0px 40px 0px 40px;
        color: rgb(0,0,0,.7);
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }

    .iconfont,.iconfont2:hover{
        cursor: pointer;
        color: #000;
    }

    #player{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
    }
</style>