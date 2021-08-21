<template>
  <div id="app">
      <el-container>

          <!--导航栏-->
         <navbar></navbar>

                <!--主页面-->
                <el-container>
                    <sidebar></sidebar>
                    <el-main width="80%" style="height: 640px" id="main">
                        <keep-alive exclude="songlist"><router-view></router-view></keep-alive>
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
import navbar from './components/common/navbar'
import sidebar from './components/home/sidebar'
import musicplayer from './components/common/musicplayer'
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
        src: url('//at.alicdn.com/t/font_2739601_6cn3d61hqew.woff2?t=1629511081847') format('woff2'),
        url('//at.alicdn.com/t/font_2739601_6cn3d61hqew.woff?t=1629511081847') format('woff'),
        url('//at.alicdn.com/t/font_2739601_6cn3d61hqew.ttf?t=1629511081847') format('truetype');
    }

    #app{
        min-width: 1528px;
    }

    #main{
        padding: 10px;
        overflow-x: hidden;
        overflow-y: scroll;
        scroll-behavior: smooth;
    }

    #footer{
        background-color: #fff;
        position: absolute;
        bottom: 20px;
        left: 0;
        right: 0;
        border-top:2px solid #afafaf;
        z-index:20;
        min-width: 1528px;
    }

    ::-webkit-scrollbar
    {
        width: 10px;
        background-color: #fff;
    }

    ::-webkit-scrollbar-thumb
    {
        border-radius: 10px;
        background-color: #e6e7ea;
    }
</style>
