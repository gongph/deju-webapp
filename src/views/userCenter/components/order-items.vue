<template>
  <div class="product-list" v-if="data.length > 0">
    <!-- 上拉翻页下拉刷新 -->
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      :autoReflow="true"
      @endReached="handleEndReached"
      >

      <div v-for="(item, $index) of data" :key="$index" class="list-item">
        <template v-if="item.product">
          <!-- title -->
          <div class="item-title__wrapper" v-if="item.product">
            <div class="image">
              <div class="image-box">
                <img :src="'data:image/png;base64,' + item.product.icon" style="width: 80%;">
              </div>
            </div>
            <div class="title">{{item.product.title}}</div>
            <template v-if="item.auditReason">
              <div class="title-right">
                <a class="audit-reason" href="javascript:;" @click="showReason(item.auditReason)">查看原因</a>
              </div>
            </template>
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
                客户姓名: {{ item.personalInformation.name }}
              </div>
              <div class="loan-type">
                {{ item.product.title }}
              </div>
              <div class="loan-time">
                金额: {{ item.amount }}(元)
              </div>
            </div>
            <div class="item">
              <div class="apply-btn__wrapper">
                <template v-if="route">
                  <md-button type="ghost-primary" @click="handleClick(item)">{{ buttonText }}</md-button>
                </template>
                <template v-else>{{statusText}}</template>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- 加载更多 loading -->
      <md-scroll-view-more
        slot="more"
        :is-finished="isLoadFinished"
      />
    </md-scroll-view>

    <!-- 查看原因弹框 -->
    <md-dialog
      :closable="true"
      v-model="reasonDialog.open"
      :btns="reasonDialog.btns"
    >
      {{ auditReason }}
    </md-dialog>
  </div>
  <div class="empty-data__wrapper" v-else>
    <md-result-page :text="noDataText"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { ResultPage, Button, Dialog, ScrollView, ScrollViewMore } from 'mand-mobile'
  import { loanTypes, formatMoney } from '@/utils'

  export default {
    name: 'OrderItem',
    /* eslint-disable */
    components: {
      [ResultPage.name]: ResultPage,
      [Button.name]: Button,
      [Dialog.name]: Dialog,
      [ScrollView.name]: ScrollView,
      [ScrollViewMore.name]: ScrollViewMore
    },
    data() {
      return {
        auditReason: '',
        reasonDialog: {
          open: false,
          btns: [
            {
              text: '知道了',
              handler: this.onBasicConfirm,
            }
          ]
        },
        // 是否加载完成
        isLoadFinished: true,
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
      },
      buttonText: {
        type: String,
        default: ''
      }
    },
    methods: {
      ...mapActions([
        'SavePersonalInfo',
        'saveApplyInfoForm',
        'SaveApplyInfo'
      ]),
      handleClick(item) {
        if (this.route === 'base') {
          // 保存用户之前在产品详情页填写的信息
          this.SaveApplyInfo({
            amount: item.amount,
            deadline: item.deadline
          })
          // 先把个人申请信息保存下来
          this.SavePersonalInfo(item.personalInformation).then(() => {
            // 跳转到产品详情重新填写
            this.$router.push({ path: `/product/detail/${item.product.id}` })
          })
        } else {
          // 详情
          this.SavePersonalInfo(item.personalInformation).then(() => {
            this.$router.push({
              name: 'MoreInfoForm',
              params: {
                auth: true
              }
            })
          })
        }
      },
      handleEndReached() {
        console.log(this)
        // if (this.isLoadFinished) {
        //   return
        // }
        // setTimeout(() => {
        //   this.$refs.scrollView.finishLoadMore()
        // }, 1000)
      },
      onReasonConfirm() {
        this.reasonDialog.open = false
      },
      showReason(reason) {
        this.auditReason = reason
        this.reasonDialog.open = true
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
  .product-list {
    height: calc(100vh - 100px);
    overflow: hidden;
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
      display: flex;
      justify-content: center;
    }
    .image-box {
      align-self: center;
      text-align: center;
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
      .audit-reason {
        color: #fc9153;
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