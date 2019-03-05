<template>
  <div class="navs">
    <div class="item">
      <div class="title">
        <router-link to="/center">
          <svg-icon icon-class="user-actived"/>
        </router-link>
      </div>
      <div class="subtitle">个人中心</div>
    </div>
    <div class="item">
      <div class="title">
        <router-link to="/center">
          <svg-icon icon-class="lingdang"/>
        </router-link>
      </div>
      <div class="subtitle">历史消息</div>
    </div>
    <div class="item">
      <div class="title">
        <router-link to="/about">
          <svg-icon icon-class="zixun"/>
        </router-link>
      </div>
      <div class="subtitle">咨询中心</div>
    </div>
    <div class="item">
      <div class="title">
        <a @click="handleDownload">
          <svg-icon icon-class="appstore"/>
        </a>
      </div>
      <div class="subtitle">APP下载</div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mand-mobile'
  export default {
    name: 'Navbar',
    data() {
      return {
        //
      }
    },
    methods: {
      handleDownload() {
        Toast.info('开发中...')
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
        a {
          font-size: 50px;
          color: #fff;
        }
        a:hover,
        a:actived {
          color: #fff;
        }
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