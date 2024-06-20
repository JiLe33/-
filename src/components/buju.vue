<script setup>
import Home from "@/components/HelloWorld.vue"
import About from "@/components/TheWelcome.vue"

import El  from '@/components/vue/EleMent.vue'
import Top from '@/components/vue/TopBar.vue'
</script>

<template>
<el-container class="layout-container">
    <!-- 可以假设 El 是一个组件或元素 -->
    <El/>
  <el-container>
    <el-header>
      <!-- 可以假设 Top 是一个组件或元素 -->
      <Top/>
    </el-header>
    <el-main>
      <!-- 这里是路由视图，显示通过路由导航的不同组件 -->
      <router-view/>
    </el-main>
    <el-footer>
      <Top/>
    </el-footer>
  </el-container>
</el-container>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
}

</style>