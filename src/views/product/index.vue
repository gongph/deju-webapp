<template>
  <div class="product-Index__wrapper">
    <!-- Banner -->
    <banner/>
    <!-- Navbar -->
    <navbar/>
    <!-- product list -->
    <div class="product-list__wrapper">
      <div class="header-wrapper">
        <div class="title">产品列表</div>
        <div class="roll-wrapper"></div>
      </div>
      <div class="product-list__inner">
        <div class="product-list">
          <!-- 1 -->
          <div v-for="(item, $index) of list" :key="$index" class="list-item">
            <!-- title -->
            <div class="item-title__wrapper">
              <div class="image">
                <img :src="'data:image/png;base64,' + item.icon" class="img" style="width: 80%;">
              </div>
              <div class="title">{{ item.title }}</div>
              <div class="title-right">已申请人数 <span class="red">{{ item.numberOfApplicants }}</span> 人</div>
            </div>
            <!-- content -->
            <div class="item-content__wrapper">
              <div class="item">
                <div class="limit">{{ formatMoney(item.loanRangeStart) }}-{{ formatMoney(item.loanRangeEnd) }}</div>
                <div class="limit-desc">贷款额度(元)</div>
              </div>
              <div class="item item-center">
                <div class="rate">参考月息: {{ item.referenceMonthInterest }}%</div>
                <div class="loan-type">{{ formatType(item.loanType) }}</div>
                <div class="loan-time">借款期限: {{ item.termRangeStart }}月-{{ item.termRangeEnd }}月</div>
              </div>
              <div class="item">
                <div class="apply-btn__wrapper">
                  <md-button type="ghost-primary" @click="lookDetail(item)">查看详情</md-button>
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
  import { Button } from 'mand-mobile'
  import { Banner, Navbar } from './components'
  import { getList } from '@/api/product'
  import { loanTypes, formatMoney } from '@/utils'

  export default {
    name: 'ProductIndex',
    /* eslint-disable */
    components: {
      [Button.name]: Button,
      Banner,
      Navbar
    },
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      document.title = "贷款"
    },
    methods: {
      getList() {
        getList().then(response => {
          console.log(response)
          if (response.status === 200) {
            this.list = response.data
          }
        }).catch(err => {
          console.error(err)
        })
      },
      formatMoney(money) {
        return formatMoney(money)
      },
      formatType(type) {
        return loanTypes.get(type)
      },
      lookDetail(row) {
        this.$store.dispatch('SaveCurProduct', row).then(() => {
          this.$router.push({ name: 'ProductDetail' })
        })
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

  a {
    text-decoration: none;
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