<template>
  <div class="notice-wrapper">
    <svg-icon icon-class="success"></svg-icon>
    <div class="content">
      <p class="msg-title">提交成功</p>
    </div>
    <div class="opr-area">
      <div class="btn-area">
        <router-link to="/center">
          <md-button>个人中心</md-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { Button } from 'mand-mobile'

  export default {
    name: 'NoticePage',
    /* eslint-disable */
    components: {
      [Button.name]: Button
    },
    created() {
      if (!this.$route.params.auth) {
        this.$router.push({ path: '/center' })
      }
    },
    mounted() {
      document.title = ""
    }
  }
</script>

<style lang="scss" src="./components/result.scss" scoped/>