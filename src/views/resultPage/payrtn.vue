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
  import { mapGetters } from 'vuex'

  export default {
    name: 'NoticePage',
    mounted() {
      document.title = ""
    },
    computed: {
      ...mapGetters([
        'applyInfo',
        'product',
        'user'
      ])
    },
    created() {
      if (!this.$route.params.auth) {
        this.$router.push({ path: '/center' })
        return
      }
      const obj = Object.assign({}, this.applyInfo, {
        product: this.product,
        user: this.user
      })
    }
  }
</script>

<style lang="scss" src="./components/result.scss" scoped/>