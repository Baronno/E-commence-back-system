<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">Homepage</el-breadcrumb-item>
      <el-breadcrumb-item>Adminstration</el-breadcrumb-item>
      <el-breadcrumb-item>Role list</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- Add roles button -->
      <el-row>
        <el-col>
          <el-button type="primary">Add Role</el-button>
        </el-col>
      </el-row>
      <el-table :data="rolelist" border>
        <!-- index for details -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="Role Name" prop="roleName"></el-table-column>
        <el-table-column
          label="Role description"
          prop="roleDesc"
        ></el-table-column>
        <el-table-column label="Operation" width="300px">
          <template>
            <el-button size="mini" type="primary" icon="el-icon-edit"
              >Edit</el-button
            >
            <el-button size="mini" type="danger" icon="el-icon-delete"
              >Delete</el-button
            >
            <el-button
              size="mini"
              type="warning"
              icon="el-icon-setting"
              @click="showSetRightDialog(scope.row)"
              >Distribute</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  // video 11
  data () {
    return {
      // role list data
      rolelist: []
    }
  },
  created () {
    this.getRoleList()
  },
  methods: {
    // send request to get list of all users
    async getRoleList () {
      const { data: res } = await this.$http.get('roles')

      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败！')
      }

      this.rolelist = res.data

      console.log(this.rolelist)
    }
  }
}
</script>
<style lang="less" scoped></style>
