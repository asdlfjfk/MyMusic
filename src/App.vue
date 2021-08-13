<template>
  <div id="app">
      <el-container>

         <navbar></navbar>

                <el-container>
                    <sidebar></sidebar>
                    <el-main width="80%">
                        <router-view></router-view>
                    </el-main>
                </el-container>

          <el-footer></el-footer>

      </el-container>
  </div>
</template>

<script>
import navbar from './components/common/navbar'
import sidebar from './components/home/sidebar'
export default {
  name: 'App',
  components: {
      navbar,
      sidebar
  }
}
</script>

<style>

</style>
