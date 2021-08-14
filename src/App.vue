<template>
  <div id="app">
      <el-container>

          <!--导航栏-->
         <navbar></navbar>

                <!--主页面-->
                <el-container>
                    <sidebar></sidebar>
                    <el-main width="80%" style="height: 640px" id="main">
                        <router-view></router-view>
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
  }
}
</script>

<style>

    #main{
        overflow: hidden;
    }

    #footer{
        background-color: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top:1px solid black ;
        z-index:20;
    }
</style>
