<template>
  <div class="about-wrapper">
    <div class="header">
      <div class="logo-wrapper">
        <div class="logo">LOGO</div>
        <div class="intro">借钱就找德聚金融</div>
      </div>
    </div>

    <div class="list-wrapper">
      <div class="list-item">
        <div class="label">微信公众号</div>
        <div class="text">dejujinrong</div>
      </div>
      <div class="list-item">
        <div class="label">客服电话</div>
        <div class="text">
          <a href="tel: 400-100-1234" class="telphone">400-100-1234</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //
      }
    },
    mounted() {
      document.title = "关于"
    }
  }
</script>

<style lang="scss" scoped>
  .about-wrapper {
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
  }

  .header {
    width: 100vw;
    height: 250px;
    font-size: 35px;
  }

  .logo-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 250px;
    height: 100px;
    background: #ddd;
    text-align: center;
    font-size: 80px;
    line-height: 100px;
  }

  .intro {
    font-size: 28px;
    letter-spacing: 5px;
    color: #b4bfca;
    padding-top: 10px;
  }

  .list-wrapper {
    width: 100%;
    height: 201px;
    background: #fff;
  }

  .list-item {
    width: 100%;
    height: 100px;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & + .list-item {
      border-top: 1px solid #ddd;
    }

    .label {
      padding-left: 30px;
      color: #5f5f5f;
    }

    .text {
      padding-right: 30px;
      color: #b4bfca;
      .telphone {
        text-decoration: none;
        color: #4283bd;
      }
    }
  }
</style>