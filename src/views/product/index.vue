<template>
  <div class="product-Index__wrapper">
    <div class="banner-wrapper">
      <div class="bg"></div>
      <md-swiper ref="swiper" :has-dots="false">
        <md-swiper-item :key="$index" v-for="(item, $index) in banners">
          <a href="javascript:void(0)" class="banner-item">
            <img :src="item.url" style="width: 95%">
          </a>
        </md-swiper-item>
      </md-swiper>
    </div>

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

    <!-- product list -->
    <div class="product-list__wrapper">
      <div class="header-wrapper">
        <div class="title">产品列表</div>
        <div class="roll-wrapper"></div>
      </div>
      <div class="product-list__inner">
        <div class="product-list">
          <!-- 1 -->
          <div class="list-item">
            <!-- title -->
            <div class="item-title__wrapper">
              <div class="image">
                <img class="img" src="/img/01.png" style="width: 80%;">
              </div>
              <div class="title">快易贷</div>
              <div class="title-right">已申请人数 <span class="red">21712</span> 人</div>
            </div>
            <!-- content -->
            <div class="item-content__wrapper">
              <div class="item">
                <div class="limit">2000-2万</div>
                <div class="limit-desc">贷款额度(元)</div>
              </div>
              <div class="item item-center">
                <div class="rate">参考月息: 0.09%</div>
                <div class="loan-type">小微贷款</div>
                <div class="loan-time">借款期限: 3月-24月</div>
              </div>
              <div class="item">
                <div class="apply-btn__wrapper">
                  <md-button type="ghost-primary" @click="gotoDetail">查看详情</md-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 2 -->
          <div class="list-item">
            <!-- title -->
            <div class="item-title__wrapper">
              <div class="image">
                <img class="img" src="/img/02.png" style="width: 80%;">
              </div>
              <div class="title">精英贷</div>
              <div class="title-right">已申请人数 <span class="red">65862</span> 人</div>
            </div>
            <!-- content -->
            <div class="item-content__wrapper">
              <div class="item">
                <div class="limit">3000-5万</div>
                <div class="limit-desc">贷款额度(元)</div>
              </div>
              <div class="item item-center">
                <div class="rate">参考月息: 0.10%</div>
                <div class="loan-type">小微贷款</div>
                <div class="loan-time">借款期限: 3月-24月</div>
              </div>
              <div class="item">
                <div class="apply-btn__wrapper">
                  <md-button type="ghost-primary" @click="gotoDetail">查看详情</md-button>
                </div>
              </div>
            </div>
          </div>

          <!-- 3 -->
          <div class="list-item">
            <!-- title -->
            <div class="item-title__wrapper">
              <div class="image">
                <img class="img" src="/img/03.png" style="width: 80%;">
              </div>
              <div class="title">任性贷</div>
              <div class="title-right">已申请人数 <span class="red">32547</span> 人</div>
            </div>
            <!-- content -->
            <div class="item-content__wrapper">
              <div class="item">
                <div class="limit">1万-10万</div>
                <div class="limit-desc">贷款额度(元)</div>
              </div>
              <div class="item item-center">
                <div class="rate">参考月息: 0.84%</div>
                <div class="loan-type">小微贷款</div>
                <div class="loan-time">借款期限: 3月-24月</div>
              </div>
              <div class="item">
                <div class="apply-btn__wrapper">
                  <md-button type="ghost-primary" @click="gotoDetail">查看详情</md-button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Tool -->
    <div class="tool-wrapper">
      <div class="tool-header">贷款小工具</div>
      <div class="tool-inner">
        <div class="item">
          <div class="item-icon">
            <svg-icon icon-class="calculator"/>
          </div>
          <div class="item-content" @click="handleAlert">
            <div class="title">网贷计算器</div>
            <div class="subtitle">可靠的网贷借款平台</div>
          </div>
        </div>
        <div class="item">
          <div class="item-icon item-icon__right">
            <svg-icon icon-class="assess"/>
          </div>
          <div class="item-content" @click="handleAlert">
            <div class="title">贷款评估</div>
            <div class="subtitle">快速计算贷款利息</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer-wrapper">
      <p>全国统一客服热线: 0755-1234 1818 商务合作: bd@deju.cn</p>
      <p>Copyright @ 2017-2018 Deju.All Rights Reserved</p>
      <img src="/img/qrcode.png">
      <p>长按识别二维码关注微信公众号: 德聚金融</p>
    </div>
  </div>
</template>

<script>
  import { Swiper, SwiperItem, Button } from 'mand-mobile'

  export default {
    name: 'ProductIndex',
    components: {
      [Swiper.name]: Swiper,
      [SwiperItem.name]: SwiperItem,
      [Button.name]: Button
    },
    data() {
      return {
        banners: [
          { id: 1, url: '/img/b1.jpg' },
          { id: 2, url: '/img/b2.jpg' },
          { id: 3, url: '/img/b3.png' }
        ]
      }
    },
    mounted() {
      document.title = "贷款"
    },
    methods: {
      gotoDetail() {
        this.$router.push({ name: 'ProductDetail' })
      },
      handleAlert() {
        alert('系统升级中...')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-Index__wrapper {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
  }

  // Header
  
  .banner-wrapper {
    width: 100%;
    height: 300px;
    position: relative;
    
    .bg {
      background: #5a5a5a;
      width: 100%;
      height: 70%;
      position: absolute;
    }

    .banner-item {
      width: 100%;
      height: 100%;
      float: left;
      text-align: center;
      justify-content: center;
      text-decoration: none;
      font-size: 28px;
      color: #fff;
      display: block;
    
      position: relative;

      img {
        height: 90%;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
  }

  // Navs

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

  // Product list

  .product-list__wrapper {
    width: 95%;
    margin: 0 auto;
    color: #333;

    .header-wrapper {
      font-size: 28px;
      padding: 15px 0;
    }

    .product-list__inner {
      width: 100%;
      min-height: 250px;
      background: #fff;
    }

    .item-title__wrapper {
      display: flex;
      font-size: 28px;
      align-items: center;
      width: 100%;
      border-bottom: 1px solid #ccc;

      .image {
        width: 80px;
        height: 80px;
        background-size: cover;
      }

      .title {
        color: #333;
      }

      .title-right {
        flex: 1;
        text-align: right;
        padding-right: 20px;
        color: gray;

        .red {
          color: #FF6666;
        }
      }

    }

    .item-content__wrapper {
      width: 100%;
      height: 150px;
      display: flex;
      font-size: 28px;
      color: #5a5a5a;
      align-items: center;
      justify-content: center;

      .item {
        width: 33.333%;
        text-align: center;
        position: relative;

        .limit {
          font-size: 40px;
          font-weight: 700;
          color: #fc9153;
        }

        .limit-desc {
          color: #aaa;
        }

        &.item-center {
          font-size: 24px;
          line-height: 1.7;
        }

        .apply-btn__wrapper {
          .md-button {
            margin: 0 auto;
          }
        }
      }
    }
  }

  // Tool
  .tool-wrapper {
    width: 95%;
    margin: 0 auto;
    color: #333;

    .tool-header {
      font-size: 28px;
      padding: 15px 0;
    }

    .tool-inner {
      font-size: 28px;
      display: flex;
      background: #fff;
      height: 120px;
      align-items: center;

      .item {
        width: 50%;
        display: flex;
        justify-content: center;
      }

      .item-icon {
        width: 80px;
        height: 80px;
        background: pink;
        border-radius: 6px;
        text-align: center;
        font-size: 55px;
        line-height: 1.5;
        color: #fff;
        background: #75a8c7;

        &.item-icon__right {
          background: #42b983;
        }
      }

      .item-content {
        line-height: 1.5;
        padding-left: 10px;

        .title {
          color: #333;
        }
        .subtitle {
          font-size: 24px;
          color: #aaa;
        }
      }
    }
  }

  // Footer
  .footer-wrapper {
    width: 95%;
    margin: 0 auto;
    font-size: 20px;
    text-align: center;
    color: gray;
    margin: 60px 0 30px 0;

    & p {
      margin: 0;
      line-height: 1.5;
    }

    & img {
      margin: 20px 0 5px 0;
    }
  }
</style>