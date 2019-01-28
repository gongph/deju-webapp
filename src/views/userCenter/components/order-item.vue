<template>
  <div class="product-list" v-if="data.length > 0">
    <div v-for="(item, $index) of data" :key="$index" class="list-item">
      <!-- title -->
      <div class="item-title__wrapper">
        <div class="image">
          <div class="image-box">
            <img :src="'data:image/png;base64,' + item.product.icon" style="width: 80%;">
          </div>
        </div>
        <div class="title">{{item.product.title}}</div>
      </div>
      <!-- content -->
      <div class="item-content__wrapper">
        <div class="item">
          <div class="limit">
            {{ formatMoney(item.product.loanRangeStart) }}-{{ formatMoney(item.product.loanRangeEnd) }}
          </div>
          <div class="limit-desc">贷款额度(元)</div>
        </div>
        <div class="item item-center">
          <div class="rate">
            参考月息: {{ item.product.referenceMonthInterest }}%
          </div>
          <div class="loan-type">
            {{ formatType(item.product.loanType) }}
          </div>
          <div class="loan-time">
            借款期限: {{ item.product.termRangeStart }}月-{{ item.product.termRangeEnd }}月
          </div>
        </div>
        <div class="item">
          <div class="apply-btn__wrapper">
            <template v-if="route === 'more'">
              <md-button type="ghost-primary" @click="handleClick(item)">去完善资料</md-button>
            </template>
            <template v-else-if="route === 'base'">
              <md-button type="ghost-primary" @click="handleClick(item)">重填资料</md-button>
            </template>
            <template v-else>{{statusText}}</template>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="empty-data__wrapper" v-else>
    <md-result-page :text="noDataText"/>
  </div>
</template>

<script>
  import { ResultPage, Button } from 'mand-mobile'
  import { loanTypes, formatMoney } from '@/utils'

  export default {
    name: 'OrderItem',
    /* eslint-disable */
    components: {
      [ResultPage.name]: ResultPage,
      [Button.name]: Button
    },
    data() {
      return {
        //
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      },
      noDataText: {
        type: String,
        default: '暂无待审核数据'
      },
      statusText: {
        type: String,
        default: '待审核'
      },
      route: {
        type: String,
        default: ''
      }
    },
    methods: {
      handleClick(item) {
        if (this.route === 'base') {
          // 跳转到产品详情重新填写
          this.$store.dispatch('InitApplyData', item).then(() => {
            this.$router.push({ name: 'ProductDetail' })
          })
        } else {
          // 详情
          this.$store.dispatch('SavePersonalInfo', item.personalInformation || {}).then(() => {
            this.$router.push({ name: 'MoreInfoForm', params: { auth: true }})
          })
        }
      },
      formatMoney(money) {
        return formatMoney(money)
      },
      formatType(type) {
        return loanTypes.get(type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .item-title__wrapper {
    display: flex;
    font-size: 28px;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #ccc;
    .image {
      width: 80px;
      height: 80px;
      display: flex;
    }
    .image-box {
      align-self: center;
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
        color: #fc9153;
        .md-button {
          margin: 0 auto;
        }
      }
    }
  }
</style>