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
      <div style="margin-top: 15px">
        <el-row :gutter="20">
          <el-col :span="16"
            ><el-input placeholder="Please input">
              <el-button
                slot="append"
                icon="el-icon-search"
              ></el-button> </el-input
          ></el-col>
          <el-col :span="4">
            <el-button type="primary "> add user</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- use list -->
      <el-table :data ='userlist' border stripe>
        <el-table-column type='index'></el-table-column>
        <el-table-column label ='姓名' prop='username'></el-table-column>
        <el-table-column label ='邮箱' prop='email'></el-table-column>
        <el-table-column label ='电话' prop='mobile'></el-table-column>
        <el-table-column label ='角色' prop='role_name'></el-table-column>
        <el-table-column label ='状态' prop='ms_state'></el-table-column>
        <el-table-column label ='操作'></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>>

<script>
export default {
  data () {
    return {
      /* get the paramas of user list */
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      if (res.meta.status !== 200) { return this.$message.error('get the wrong message') }
      this.userlist = res.data.users
      this.total = res.data.total
      console.log(res)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
