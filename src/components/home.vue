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
          <el-submenu :index="item.id + ''" v-for ="item in menulist" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- Level 2 menu -->
              <el-menu-item :index="subItem.id +''" v-for="subItem in item.children"
              :key="subItem.id" >
                <template slot="title">
                  <!-- Icon -->
              <i class="el-icon-location"></i>
              <!-- word -->
              <span>{{subItem.authName}}</span>
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
  data () {
    return {
      /* 将获取的数据赋值给我们自己的菜单 */
      menulist: []
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    /* get all the menu */
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      console.log(res)
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
