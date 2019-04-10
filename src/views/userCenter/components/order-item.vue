<template>
  <div class="list-item">
    <!-- Title start -->
    <div class="item-title__wrapper">
      <div class="image">
        <div class="image-box">
          <img :src="baseImgUrl + data.product.iconUrl" style="width: 80%;">
        </div>
      </div>
      <div class="title">{{data.product.title}}</div>
      <template v-if="data.auditReason">
        <div class="title-right">
          <a href="javascript:;" class="audit-reason" @click="showReason(data.auditReason)">查看原因</a>
        </div>
      </template>
    </div><!-- Title end -->
    <!-- Content start -->
    <div class="item-content__wrapper">
      <div class="item">
        <div class="limit">
          {{ formatMoney(data.product.loanRangeStart) }}-{{ formatMoney(data.product.loanRangeEnd) }}
        </div>
        <div class="limit-desc">贷款额度(元)</div>
      </div>
      <div class="item item-center">
        <div class="rate">客户姓名: {{ data.personalInformation.name }}</div>
        <div class="loan-time">申请额度: {{ formatMoney(data.amount) }}(元)</div>
        <div class="loan-type">申请期限: {{ data.deadline ? data.deadline : 0 }} 个月</div>

      </div>
      <div class="item">
        <div class="apply-btn__wrapper">
          <template v-if="data.auditStatus === 'FINALTRIALPASSED'">
            <div class="loan-time">终审额度: {{ formatMoney(data.finalAmount) }}(元)</div>
            <div class="loan-type">终审期限: {{ data.finalDeadline ? data.finalDeadline : 0 }} 个月</div>
          </template>
          <template v-else>
            <!-- 有路由的则会跳转到对应页面 -->
            <template v-if="route">
              <!-- 如果该工单正在审核中，则不允许再次修改 -->
              <!-- 并且按钮上显示 '审核中' -->
              <template v-if="data.orderStatus !== 'pending'">
                <md-button type="ghost-primary" @click="handleClick(data)">{{ buttonText }}</md-button>
              </template>
              <template v-else>
                <md-button type="ghost-primary" disabled>审核中</md-button>
              </template>
            </template>
            <template v-else>{{statusText}}</template>
          </template>
        </div>
      </div>
    </div><!-- Content end -->
    <!-- Dialog -->
    <md-dialog
      :closable="true"
      v-model="reasonDialog.open"
      :btns="reasonDialog.btns"
    >
      {{ auditReason }}
    </md-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { Button, Dialog } from 'mand-mobile'
import { formatMoney } from '@/utils'
import config from '@/utils/config.js'

export default {
  name: 'OrderItem',
  /* eslint-disable */
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog
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
      baseImgUrl: config.baseImgUrl
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    statusText: {
      type: String,
      default: '审核中'
    },
    route: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: '重新填写资料'
    }
  },
  methods: {
    ...mapActions([
      'SaveProduct',
      'SavePersonalInfo',
      'SaveApplyInfo',
      'SaveApplyInfoForm'
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
        this.SaveApplyInfoForm(item)
        this.SaveProduct(item.product)
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
    onReasonConfirm() {
      this.reasonDialog.open = false
    },
    showReason(reason) {
      this.auditReason = reason
      this.reasonDialog.open = true
    },
    formatMoney(money) {
      return formatMoney(money)
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
