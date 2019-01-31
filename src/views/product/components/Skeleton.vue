<template>
  <div class="skeleton-wrapper">
    <!-- 产品列表骨架屏 -->
    <div class="skeleton" v-for="n in 3">
      <div class="skeleton-bg"></div>
      <div class="skeleton-header">
        <div class="icon"></div>
        <div class="title"></div>
        <div class="title-right"></div>
      </div>
      <div class="skeleton-body">
        <div class="item-left">
          <div class="item-left--top"></div>
          <div class="item-left--bottom"></div>
        </div>
        <div class="item-center">
          <div class="item-center--top"></div>
          <div class="item-center--center"></div>
          <div class="item-center--bottom"></div>
        </div>
        <div class="item-right">
          <div class="item-right--center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $bgColor: #EBEEF5;

  @keyframes skeleton-stripes {
    from {
      background-position: 0 0 ;
    }
    to {
      background-position: 20rem 0;
    }
  }

  .skeleton {
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .skeleton-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(90deg,rgba(255, 255, 255, 0.15) 25%, transparent 25%);
    animation: skeleton-stripes 1s linear infinite;
  }
  .skeleton-header {
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $bgColor;
    position: relative;
    .icon {
      width: 30px;
      height: 30px;
      background: $bgColor;
      margin-left: 20px;
      border-radius: 50%;
    }
    .title {
      width: 150px;
      height: 30px;
      background: $bgColor;
      margin-left: 40px;
    }
    .title-right {
      width: 150px;
      height: 30px;
      background: $bgColor;
      position: absolute;
      right: 20px;
    }
  }
  .skeleton-body {
    display: flex;
    width: 100%;
    height: 150px;
    .item-left,
    .item-right {
      flex: .5;
      height: 100%;
    }
    .item-center {
      flex: 1;
    }
    .item-left,
    .item-center,
    .item-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .item-left {
      .item-left--top {
        width: 80%;
        height: 30px;
        background: $bgColor;
      }
      .item-left--bottom {
        margin-top: 10px;
        width: 70%;
        height: 30px;
        background: $bgColor;
      }
    }
    .item-center {
      .item-center--top,
      .item-center--center,
      .item-center--bottom {
        width: 80%;
        height: 30px;
        background: $bgColor;
      }
      .item-center--center {
        width: 70%;
      }
      .item-center--center,
      .item-center--bottom {
        margin-top: 10px;
      }
    }
    .item-right {
      .item-right--center {
        width: 70%;
        height: 30px;
        background: $bgColor;
      }
    }

  }
</style>
