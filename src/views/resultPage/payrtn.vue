<template>
  <div class="notice-wrapper">
    <svg-icon icon-class="success"></svg-icon>
    <div class="content">
      <h2 class="msg-title">支付成功</h2>
      <p class="msg-desc">您可以进入<router-link to="/center">我的工单</router-link>查看审核结果</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoticePage',
    mounted() {
      document.title = ""
    },
    created() {
      if (!this.$route.params.auth) {
        this.$router.push({ path: '/center' })
        return
      }
    }
  }
</script>

<style lang="scss" src="./components/result.scss" scoped/>