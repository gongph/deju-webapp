<template>
  <div class="navs">
    <div class="item">
      <div class="title">
        <svg-icon icon-class="flash"/>
      </div>
      <div class="subtitle">快易贷</div>
    </div>
    <div class="item">
      <div class="title">
        <svg-icon icon-class="tie"/>
      </div>
      <div class="subtitle">精英贷</div>
    </div>
    <div class="item">
      <div class="title">
        <svg-icon icon-class="wallet"/>
      </div>
      <div class="subtitle">任性贷</div>
    </div>
    <div class="item">
      <div class="title">
        <svg-icon icon-class="product-intro"/>
      </div>
      <div class="subtitle">产品介绍</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Navbar',
    data() {
      return {
        //
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navs {
    width: 95%;
    height: 150px;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    margin-top: 20px;
    .item {
      width: 25%;
      height: 100%;
      font-size: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .title {
        width: 70px;
        height: 70px;
        background: orange;
        justify-content: flex-start;
        border-radius: 100%;
        text-align: center;
        line-height: 70px;
        font-size: 60px;
        color: #fff;
      }
      .subtitle {
        color: gray;
        font-size: 24px;
        padding-top: 8px;
        box-sizing: border-box;
      }
    }
    & .item:nth-child(1) .title {
      background-color: #FF6666;
    }
    & .item:nth-child(2) .title {
      background-color: #5DD39E;
    }
    & .item:nth-child(3) .title {
      background-color: #FEB824;
    }
    & .item:nth-child(4) .title {
      background-color: #87D6F8;
    }
  }
</style>