<template>
  <div class="nav-header">
    <router-link :to="backLink">
      <div class="is-left">
        <md-icon name="arrow-left" size="lg"></md-icon>
        <div class="back-text">{{ backText }}</div>
      </div>
    </router-link>
    <div class="is-center">
      <div
        class="thumbnail"
        :style="icon ? 'background-image: url(data:image/png;base64,' + icon + ')':''"
      >
      </div>
      <div class="title">{{ title }}</div>
    </div>
    <div class="is-right"></div>
  </div>
</template>

<script>
  import { Button, Icon } from 'mand-mobile'
  export default {
    name: 'Header',
    components: {
      [Button.name]: Button,
      [Icon.name]: Icon
    },
    props: {
      backLink: {
        type: String,
        default: '/'
      },
      backText: {
        type: String,
        default: '返回'
      },
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .nav-header {
    height: 80px;
    min-height: 80px;
    background: #2c3e50;
    color: #f5f5f5;
    display: flex;
    align-items: center;

    .is-left,
    .is-right {
      flex: .5;
    }

    .is-left {
      color: #f5f5f5;
      display: flex;
      align-items: center;

      .back-text {
        font-size: 30px;
      }
    }

    .is-center {
      flex: 1;
      display: flex;
      justify-content: center;
    }

    .thumbnail {
      width: 50px;
      height: 50px;
      // background: #98aec3;
      // border-radius: 50%;
      margin: 0 20px 0 20px;
      font-size: 35px;
      line-height: 1.5;
      color: #2c3e50;
      text-align: center;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }

    .title {
      font-size: 35px;
    }
  }
</style>