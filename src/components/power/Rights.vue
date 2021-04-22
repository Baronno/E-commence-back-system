<template>
  <div>
    <h3>
      <!--  breadcrum navigation -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">Homepage</el-breadcrumb-item>
        <el-breadcrumb-item>Adminstration </el-breadcrumb-item>
        <el-breadcrumb-item>Permission List</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- card view -->
      <el-card>
        <el-table :data= 'rightsList' border >
          <el-table-column type ='index' ></el-table-column>
          <el-table-column label= 'Root name' prop='authName'></el-table-column>
          <el-table-column label="Path" prop="path"></el-table-column>
          <el-table-column label="Root level" prop="level"></el-table-column>
          <!--插槽使用失败，并没有按计划出现 -->
          <template slot-scope= ''>
            <el-tag v-if ='this.getRightsList.level === "0"'>level 1</el-tag>
            <el-tag type ='success' >level 2</el-tag>
            <el-tag type = 'warning'>level 3</el-tag>
          </template>
        </el-table>
      </el-card>
    </h3>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  created () {
    this.getRightsList()
  },
  methods: {
    /* the method to send http request to get the getRightslist */
    async getRightsList () {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('get the rights list unsuccessful')
      }
      this.rightsList = res.data
      // console.log(this.rightsList)
    }
  }
}
</script>

<style lang="less">
</style>
