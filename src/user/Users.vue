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
      <!-- search box and add button  keyup function need to be added-->
      <div style="margin-top: 15px">
        <el-row :gutter="20">
          <el-col :span="16"
            ><el-input placeholder="Please input"
            v-model='queryInfo.query'
            clearable
            @clear="getUserList"
            @keyup.enter='getUserList'
             >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUserList"
              ></el-button> </el-input
          ></el-col>
          <el-col :span="4">
            <el-button type="primary "> add user</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- use list -->
      <el-table :data ='userlist' border stripe >
        <el-table-column type='index'></el-table-column>
        <el-table-column label ='姓名' prop='username'></el-table-column>
        <el-table-column label ='邮箱' prop='email'></el-table-column>
        <el-table-column label ='电话' prop='mobile'></el-table-column>
        <el-table-column label ='角色' prop='role_name'></el-table-column>
        <el-table-column label ='状态' prop='ms_state'>
        <template slot-scope='scope'>
          <el-switch v-model="scope.row.mg_state" @change='userStateChanged(scope.row)'>
</el-switch>
        </template>
        </el-table-column>
        <el-table-column label ='操作' width=' 180px'>
          <!-- didn't use scope -->
          <template slot-scope >
            <!-- edit button -->
             <el-tooltip effect="dark" content="edit" placement="top" :enterable='false'>
         <el-button type='primary' icon='el-icon-edit' size ='mini'></el-button>
    </el-tooltip>
            <!-- delete button -->
             <el-tooltip effect="dark" content="delete" placement="top" :enterable='false'>
        <el-button type='danger' icon='el-icon-delete' size ='mini'></el-button>
    </el-tooltip>
            <!-- distribute the role -->
            <el-tooltip effect="dark" content="distribute the role" placement="top" :enterable='false'>
       <el-button type='warning' icon='el-icon-setting' size ='mini'></el-button>
    </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页面分割 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
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
        /* 当前页面 */
        pagenum: 1,
        /* 当前页码的数量 */
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
    },
    /* 监听page-size 所改变的事件 */
    handleSizeChange (newSize) {
      /* console.log(newSize) */
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    /* 监听page0number 的改变的事件 */
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    /* listen the state of switch */
    async userStateChanged (userInfo) {
      const { data: res } = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$mg_state.error('update the user failure!')
      }
      this.$message.success('update success')
    }
  }
}
</script>
<style lang="less" scoped>
</style>
