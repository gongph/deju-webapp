<template>
  <div class="notice-wrapper">
    <svg-icon icon-class="success" class-name=""></svg-icon>
    <div class="content">
      <p>提交成功, 系统审核中...</p>
      <p>您可以进入<router-link to="/center">我的工单</router-link>查看审核结果</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NoticePage',
    mounted() {
      document.title = ""
    }
  }
</script>

<style lang="scss" scoped>
  .notice-wrapper {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;

    .svg-icon {
      color: #fc9153;
      font-size: 200px;
      padding: 25% 0 20px 0;
    }

    .content {
      text-align: center;
      font-size: 35px;
      // line-height: 1.5;
      color: gray;

      p {
        margin: 0;
        line-height: 1.5
      }

      a {
        color: #fc9153;
        // text-decoration: none;
      }
    }
  }
</style>