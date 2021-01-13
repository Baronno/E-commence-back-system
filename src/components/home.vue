<template>
  <el-container class="home-containerbox">
    <el-header>
      <div>
        <img src="../assets/Logo(已去底).png" alt="">
        <span>HOTEL MANAGEMENT SYSTEM</span>
      </div>
      <el-button type="info" @click="logout">Exit </el-button></el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
.home-containerbox{
  height: 100%;
  }
.el-header {
  background-color: rgba(6, 10, 10, 0.133);
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color:#fff;
  font-size: 20px;
  div{
    display: flex;
    align-items: center;
    span{
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: rgba(6, 10, 10, 0.133);
}

.el-main {
  background-color: rgba(19, 15, 15, 0.2)
}
</style>
