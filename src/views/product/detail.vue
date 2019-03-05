<template>
  <div class="product-detail__wrapper" v-if="product">
    <div class="nav-header">
      <div
        class="thumbnail"
        :style="'background-image: url(data:image/png;base64,' + product.icon + ')'"
      >
      </div>
      <div class="title">{{ product.title }}</div>
    </div>
    <div class="main-content">
      <div class="detail-inner">
        <div class="desc-grid">
          <div class="grid-item">申请人数: {{ product.numberOfApplicants }}人</div>
          <template v-if="earn">
            <div class="grid-item">利息: {{ earn }}元</div>
          </template>
          <template v-else>
            <div class="grid-item">
              利率范围: {{ product.interestRateRangeStart }}%-{{ product.interestRateRangeEnd }}%
            </div>
          </template>
          <div class="grid-item">
            额度范围: {{ formatMoney(product.loanRangeStart )}}-{{ formatMoney(product.loanRangeEnd )}}
          </div>
          <div class="grid-item">
            期限范围: {{ product.termRangeStart }}-{{ product.termRangeEnd }}个月
          </div>
          <div class="grid-item item">
            <div class="item-wrapper">
              <label for="amount">金额:</label>
            </div>
            <div class="item-input__wrapper">
              <div class="item-input">
                <input
                  v-model="amount"
                  type="number"
                  class="form-input"
                  placeholder="请输入金额"
                  @blur="handleAmountBlur($event)"
                >
              </div>
              <div class="item-unit">元</div>
            </div>
          </div>
          <div class="grid-item item">
            <div class="item-wrapper">
              <label for="rate">期限:</label>
            </div>
            <div class="item-input__wrapper">
              <div class="item-input">
                <input
                  v-model="deadlineLabel"
                  type="text"
                  class="form-input"
                  readonly="readonly"
                  placeholder="请选择期限"
                >
              </div>
              <div class="item-unit item-unit__icon">
                <md-icon
                  name="arrow-up"
                  :class="isActive ? 'is-active':''"
                  size="lg"
                  @click="handleIconClick"
                />
              </div>
              <div class="item-list__wrapper" v-if="isActive">
                <template v-for="(item, $index) in rates">
                  <div class="rate" @click="handleRateClick(item)" :key="$index">{{item.label + '个月'}}</div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Apply steps -->
      <div class="apply-steps">
        <div class="header">申请流程</div>
        <div class="content">
          <md-steps
            :steps="steps"
            :current="4">
            <!-- <div slot="reached">
              <md-icon name="circle-alert" size="lg"></md-icon>
            </div> -->
          </md-steps>
        </div>
      </div>
      <!-- Apply limit -->
      <div class="apply-limit">
        <div class="header">申请限制</div>
        <div class="content" v-html="product.restrictionInformation"></div>
      </div>
      <!-- Apply data -->
      <div class="apply-data">
        <div class="header">申请材料</div>
        <div class="content">
          {{ product.materialsInformation}}
        </div>
      </div>
      <!-- Apply instructions -->
      <div class="apply-instructions">
        <div class="header">申请说明</div>
        <div class="content">
          {{ product.applicationInformation }}
        </div>
      </div>
    </div>
    <div class="footer-btn">
      <md-button class="apply-button" @click="handleApply">立即申请</md-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Steps, Icon, Button, Toast } from 'mand-mobile'
  import { formatMoney, productRates } from '@/utils'

  export default {
    name: 'ProductDetail',
    /* eslint-disable */
    components: {
      [Steps.name]: Steps,
      [Icon.name]: Icon,
      [Button.name]: Button
    },
    data() {
      return {
        isActive: false,
        steps: [
          { name: '1.基本信息' },
          { name: '2.支付' },
          { name: '3.代理商审核' },
          { name: '4.线下放款' }
        ],
        amount: '', // 金额
        rate: 0, // 利率
        term: 0, // 期限
        deadline: '', // 期限，例如 0.3
        deadlineLabel: '', // 期限字符串，例如：'12个月'
        earn: 0, // 利息
      }
    },
    computed: {
      ...mapGetters([
        'product',
        'applyInfo',
      ]),
      rates() {
        if (!this.product) return []
        const title = this.product.title
        return productRates[title]
      }
    },
    created() {
      const pid = this.$route.params.id
      if (!pid) {
        this.$router.push({ path: '/'})
      } else {
        this.getProductById(pid)
      }
      if (this.applyInfo) {
        this.applyInfo.then(data => {
          if (data) {
            this.amount = data.amount
            this.deadline = data.deadline
            this.rate = this.findRateByLabel(data.deadline)
            this.term = data.deadline
            this.deadlineLabel = `${data.deadline}个月`
          }
        })
      }
    },
    watch: {
      amount: 'computedEarn',
      deadline: 'computedEarn'
    },
    methods: {
      ...mapActions([
        'getProductById'
      ]),
      /**
       * 计算利息
       */
      computedEarn() {
        if (!this.amount || !this.deadline) return
        const rate = this.rate || 0
        this.earn = (Number(this.amount) * rate * this.deadline).toFixed(2)
      },
      handleApply() {
        if (!Number(this.amount) && !Number(this.deadlineLabel)) {
          Toast.info('申请金额和期限不能为空！')
          return
        }
        this.$store.dispatch('SaveApplyInfo', {
          amount: this.amount,
          deadline: this.term
        }).then(response => {
          this.$router.push({ path: '/apply/base' })
        }).catch(err => {
          console.error(err)
        })
      },
      handleAmountBlur(evt) {
        if (Number(this.amount) % 1000 !== 0) {
          Toast.info('金额必须是1000的整数倍哦~')
          this.amount = ''
          evt.target.focus()
        }
      },
      handleIconClick() {
        this.isActive = !this.isActive
      },
      handleRateClick(item) {
        this.deadline = item.value
        this.rate = item.rate
        this.term = item.label
        this.deadlineLabel = `${item.label}个月`
        this.isActive = false
      },
      formatMoney(money) {
        return formatMoney(money)
      },
      findRateByLabel(label) {
        const rates = this.rates
        const len = rates.length
        for (let i = 0; i < len; i++) {
          const obj = rates[i]
          if (obj.label === label) {
            return obj.rate
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-input::-webkit-input-placeholder {
    color: #ccc;
  }
  .form-input:-moz-placeholder {
    color: #ccc;
  }
  .form-input:-ms-input-placeholder {
    color: #ccc;
  }
  .product-detail__wrapper {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
  }

  .nav-header {
    height: 80px;
    min-height: 80px;
    background: #2c3e50;
    color: #f5f5f5;
    display: flex;
    align-items: center;

    .thumbnail {
      width: 50px;
      height: 50px;
      background: #98aec3;
      border-radius: 50%;
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

  .main-content {
    overflow-y: auto;
  }

  .detail-inner {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .desc-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      grid-gap: 20px;
      margin: 20px 0;

      .grid-item {
        font-size: 28px;
        text-align: left;
        color: gray;

        &:nth-child(2n-1) {
          padding-left: 20px;
        }

        &.item {
          // height: 100px;
          display: flex;
          align-items: center;
          label {
            color: #666;
          }
          .item-input__wrapper {
            height: 50px;
            width: 60%;
            margin-left: 10px;
            border-radius: 50px;
            border: 1px solid #ccc;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .form-input {
              border: none;
              width: 150px;
              height: 50px;
              background: transparent;
              outline: none;
              color: #666;
            }
            .item-unit {
              font-size: 30px;
              .md-icon-arrow-up {
                transition: all .2s ease-in;
                transform: rotateZ(0deg);
              }
              .md-icon-arrow-up.is-active {
                transform: rotateZ(180deg);
              }
            }
            .item-list__wrapper {
              position: absolute;
              width: 90%;
              height: 180px;
              background: #fff;
              left: 10px;
              top: 55px;
              right: 0;
              z-index: 100;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              border: 1px solid #ccc;
              border-radius: 10px;
              transform: all .2s ease-in;
              .rate {
                padding-left: 10px;
                &:active {
                  background: #f5f5f5;
                }
              }
            }
          }
        }
      }
    }
  }

  .apply-steps,
  .apply-limit,
  .apply-data,
  .apply-instructions {
    background-color: #fff;
    margin-top: 20px;

    .header {
      font-size: 30px;
      color: #333;
      text-align: left;
      padding: 20px 0 20px 20px;
      border-bottom: 1px solid #ddd;
    }
  }

  .apply-limit,
  .apply-data,
  .apply-instructions {
    .content {
      font-size: 28px;
      color: gray;
      padding: 15px 20px;
      line-height: 1.5;
      word-break: break-word;
    }
  }

  .footer-btn {
    width: 95%;
    margin: auto;
    background: #fff;
    .md-button.primary.large {
      border-radius: 10px;
    }
  }
</style>
