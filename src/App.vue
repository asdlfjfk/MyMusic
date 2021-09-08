<template>
  <div id="app">
      <el-container>

          <!--导航栏-->
         <navbar></navbar>

                <!--主页面-->
                <el-container>
                    <sidebar></sidebar>
                    <el-main style="height: 640px" id="main">
                        <keep-alive exclude="songlist,singerlist,albumlist,videopage,mvpage,allmv">
                            <router-view></router-view>
                        </keep-alive>
                    </el-main>
                </el-container>

          <!--底部音乐播放器-->
          <el-footer width="100%" id="footer" align="bottom">
              <musicplayer></musicplayer>
          </el-footer>

      </el-container>
  </div>
</template>

<script>
import navbar from './components/home/navbar'
import sidebar from './components/home/sidebar'
import musicplayer from './components/home/musicplayer'
export default {
      name: 'App',
      components: {
          navbar,
          sidebar,
          musicplayer,
      },
}
</script>

<style>

    @font-face {
        font-family: 'iconfont';  /* Project id 2739601 */
        src: url('//at.alicdn.com/t/font_2739601_ph5uawsp9lp.woff2?t=1631084107589') format('woff2'),
        url('//at.alicdn.com/t/font_2739601_ph5uawsp9lp.woff?t=1631084107589') format('woff'),
        url('//at.alicdn.com/t/font_2739601_ph5uawsp9lp.ttf?t=1631084107589') format('truetype');
    }

    #app{
        min-width: 1528px;
    }

    #main{
        padding: 10px 0px 10px 0px;
        overflow-x: hidden;
        overflow-y: auto;
        scroll-behavior: smooth;
    }

    #footer{
        background-color: #fff;
        position: relative;
        bottom: 20px;
        left: 0;
        right: 0;
        border-top:2px solid #afafaf;
        z-index:20;
        min-width: 1528px;
    }

    ::-webkit-scrollbar
    {
        width: 5px;
        background-color: #fff;
    }

    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-color: #e6e7ea;
    }
</style>
