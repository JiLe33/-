<script setup>

</script>

<template>
  <el-aside width="300px">
    <div class="el-aside__logo"></div>
    <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff"    router>
<!--   children:[
        {path: '/hua',component:Hua},
        {path:'/home',component:Home},
        {path:'/nine',component:NineT},
        {path:'/about',component:About},
    ]-->
      <el-menu-item index="/hua">
        <span>文章分类</span>
      </el-menu-item>

      <el-menu-item index="/home">
        <span>文章管理</span>
      </el-menu-item>

      <el-sub-menu>
        <template #title>
          <span>个人中心</span>
        </template>

        <el-menu-item index="/nine">
          <span>基本资料</span>
        </el-menu-item>

        <el-menu-item index="/about">
          <span>更换头像</span>
        </el-menu-item>

        <el-menu-item index="/user/resetPassword">
          <span>重置密码</span>
        </el-menu-item>

      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<style scoped lang="scss">
.el-aside {
  background-color: #232323;

  &__logo {
    height: 120px;
    background: url('@/assets/logo.png') no-repeat center / 120px auto;
  }

  .el-menu {
    border-right: none;
  }
}
</style>