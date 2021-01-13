<template>
  <div>
    <el-button type="info" @click="logout">Exit </el-button>
  </div>
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
</style>
