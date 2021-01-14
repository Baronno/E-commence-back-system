<template>
  <el-container class="home-containerbox">
    <el-header>
      <div>
        <img src="../assets/Logo(已去底).png" alt="" />
        <span>HOTEL MANAGEMENT SYSTEM</span>
      </div>
      <el-button type="info" @click="logout">Exit </el-button></el-header
    >
    <el-container>
      <!-- this is the aside menu -->
      <el-aside width="200px">
        <el-menu
          background-color="#303133"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
        <!-- the level 1 menu -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>Navigator One</span>
            </template>
            <!-- Level 2 menu -->
              <el-menu-item index="1-1">
                <template slot="title">
                  <!-- Icon -->
              <i class="el-icon-location"></i>
              <!-- word -->
              <span>酒店用品</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

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
.home-containerbox {
  height: 100%;
}
.el-header {
  background-color: #303133;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #303133;
}

.el-main {
  background-color: rgba(19, 15, 15, 0.2);
}
</style>
