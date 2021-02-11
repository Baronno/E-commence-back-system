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
      <span>System</span>
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
            <el-button type="primary " @click="addDialogVisable =
            true">Add user</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- use list -->
      <el-table :data ='userlist' border stripe >
        <el-table-column type='index'></el-table-column>
        <el-table-column label ='Name' prop='username'></el-table-column>
        <el-table-column label ='Email' prop='email'></el-table-column>
        <el-table-column label ='Phone' prop='mobile'></el-table-column>
        <el-table-column label ='Role' prop='role_name'></el-table-column>
        <el-table-column label ='State' prop='ms_state'>
        <template slot-scope='scope'>
          <el-switch v-model="scope.row.mg_state" @change='userStateChanged(scope.row)'>
</el-switch>
        </template>
        </el-table-column>
        <el-table-column label ='Operation' width=' 180px'>
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
    <!-- add the user dialog  -->
   <el-dialog
  title="add user"
  :visible.sync="addDialogVisable"
  width="40%"
  @close ='addDialogClosed'>
  <!-- add user content -->
  <el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="70px">
  <el-form-item label="user" prop = 'username'>
    <el-input v-model="addForm.username"></el-input>
  </el-form-item>
  <el-form-item label="pd" prop = 'password'>
    <el-input v-model="addForm.password"></el-input>
  </el-form-item>
  <el-form-item label="email" prop = 'email'>
    <el-input v-model="addForm.email"></el-input>
  </el-form-item>
  <el-form-item label="phone" prop = 'phone'>
    <el-input v-model="addForm.phone"></el-input>
  </el-form-item>
  </el-form>

        <!-- button area -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisable = false">Cancel</el-button>
    <el-button type="primary" @click="addUser">Confirm</el-button>
  </span>
</el-dialog>
  </div>
</template>>

<script>
export default {
  data () {
    var checkEmail = (rule, value, cb) => {
      /* //validate the email rule  */
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('Please input the right email address'))
    }
    var checkMobile = (rule, value, cb) => {
      /* 正则表达式 */
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        // eslint-disable-next-line standard/no-callback-literal
        return cb()
      }
      cb(new Error('please input the right number'))
    }
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
      total: 0,
      /* control the visablity of dialog */
      addDialogVisable: false,
      /* add the form data of user */
      addForm: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      /* add the validation rules of form */
      addFormRules: {
        username: [{
          required: true,
          message: 'Please input your username',
          trigger: 'blur'
        },
        { min: 3, max: 10, message: 'the length of username is between 3-10' }],
        password: [{
          required: true,
          message: 'Please input your password',
          trigger: 'blur'
        },
        { min: 6, max: 13, message: 'the length of password is between 6-12' }],
        email: [{
          required: true,
          message: 'Please input your email address',
          trigger: 'blur'
        }, {
          validator: checkEmail,
          trigger: 'blur'
        }],
        phone: [{
          required: true,
          message: 'please input your number',
          trigger: 'blur'
        }, {
          validator: checkMobile,
          trigger: 'blur'
        }
        ]
      }
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
    },
    /* listen the the close of dialog */
    addDialogClosed () {
      /* this.$refs.addFormRef.resetFields() */
    },
    // add button to add user
    addUser () {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // http request

        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          this.$message.error('add use failure')
        }

        this.$message.success('add user successful')
        // make the dialog disvisiable after update successful
        this.addDialogVisable = false
        // get the list again
        this.getUserList()
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
