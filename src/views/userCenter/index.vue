<template>
  <div class="user-center__wrapper">
    <div class="header">
      <div class="avator-wrapper">
        <div class="avator">
          <svg-icon icon-class="avator"/>
        </div>
        <div class="nickname">不吃鱼的海王</div>
      </div>
    </div>

    <div class="list-wrapper">
      <div class="list-item">
        <div class="icon-wrapper">
          <svg-icon icon-class="order"/>
        </div>
        <div class="label-wrapper">我的工单</div>
        <div class="arrow-right__wrapper" @click="handleRoute('/orders')">
          <md-icon name="arrow-right" size="lg"></md-icon>
        </div>
      </div>

      <div class="list-item">
        <div class="icon-wrapper">
          <svg-icon icon-class="user-data"/>
        </div>
        <div class="label-wrapper">修改资料</div>
        <div class="arrow-right__wrapper" @click="handleRoute('/userdata')">
          <md-icon name="arrow-right" size="lg"></md-icon>
        </div>
      </div>

      <div class="list-item">
        <div class="icon-wrapper">
          <svg-icon icon-class="password"/>
        </div>
        <div class="label-wrapper">修改密码</div>
        <div class="arrow-right__wrapper" @click="handleRoute('/resetpwd')">
          <md-icon name="arrow-right" size="lg"></md-icon>
        </div>
      </div>

      <div class="list-item">
        <div class="icon-wrapper">
          <svg-icon icon-class="about"/>
        </div>
        <div class="label-wrapper">关于</div>
        <div class="arrow-right__wrapper" @click="handleRoute('/about')">
          <md-icon name="arrow-right" size="lg"></md-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Icon} from 'mand-mobile'

  export default {
    name: 'UserCenter',
    /* eslint-disable */
    components: {
      [Icon.name]: Icon,
    },
    data() {
      return {
        //
      }
    },
    mounted() {
      document.title = '个人中心'
    },
    methods: {
      handleRoute(path) {
        this.$router.push({ path })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-center__wrapper {
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
  }

  .header {
    width: 100%;
    height: 200px;
    background-image: linear-gradient( 135deg, #fc9153 10%, #FCCF31 100%);
  }

  .avator-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 30px;
    overflow-x: hidden;

    .avator {
      width: 120px;
      height: 120px;
      min-width: 120px;
      min-height: 120px;
      background: #f3f3f3;
      border-radius: 100%;
      text-align: center;
    }

    .nickname {
      font-size: 35px;
      color: #fff;
      padding-left: 15px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .list-wrapper {
    width: 100%;
    height: 400px;
    background: #fff;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .list-item {
    width: 100%;
    height: 100px;
    display: flex;
    font-size: 35px;
    align-items: center;

    .icon-wrapper {
      font-size: 50px;
      margin-left: 30px;
      font-weight: 700;
    }

    .label-wrapper {
      padding-left: 20px;
      flex: 1;
    }

    .arrow-right__wrapper {
      width: 60px;
      color: gray;
    }
  }
</style>