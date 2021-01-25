<template>
  <div>
    <!--  breadcrum navigation -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card version v-for: vue 里的循环写法
    -->

    <el-card class="box-card">
      <span>Card name</span>
      <!-- search box and add button -->
      <div style="margin-top: 15px;">
        <el-row :gutter="20">
  <el-col :span="16"><el-input placeholder="Please input" >
    <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input></el-col>
  <el-col :span="4">
  <el-button type ="primary "> add user</el-button>
  </el-col>
</el-row></div>
    </el-card>
  </div>
</template>>

<script>
export default {}
</script>
<style lang="less" scoped>
</style>
