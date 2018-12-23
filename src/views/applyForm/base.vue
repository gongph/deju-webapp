<template>
  <div class="base-form">
    <template v-if="step === 1">
      <md-notice-bar :closable="false">为了确保您能通过初步审核，请填写真实信息哦~</md-notice-bar>
      <md-field>
        <md-input-item
          ref="username"
          title="姓名"
          placeholder="请输入您的姓名"
          clearable
        />
        <md-input-item
          ref="phone"
          type="phone"
          title="实名手机号"
          placeholder="请输入您有效的手机号码"
          clearable
        />
        <md-input-item
          ref="idCard"
          title="身份证号"
          placeholder="请输入您有效的身份证号码"
          clearable
        />
        <div class="md-field-title">请上传身份证正/反面照片:</div>
        <div class="upload-preview__wrapper">
          <div class="upload-preview__box">
            <ul class="image-reader-list">
              <!-- 正面照 -->
              <template v-if="imageList['readerFront'].length > 0">
                <li class="image-reader-item"
                :style="{
                  'backgroundImage': `url(${imageList['readerFront'][0]})`,
                  'backgroundPosition': 'center center',
                  'backgroundRepeat': 'no-repeat',
                  'backgroundSize': 'cover'
                }">
                  <md-icon
                    class="image-reader-item-del"
                    name="circle-cross"
                    color="#666"
                    @click.native="onDeleteImage('readerFront', 0)">
                  </md-icon>
                </li>
              </template>
              <template v-else>
                <li class="image-reader-item add">
                  <md-image-reader
                    name="readerFront"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    is-multiple
                  ></md-image-reader>
                  <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                  <p>身份证正面照片</p>
                </li>
              </template>
              <!-- 反面照 -->
              <template v-if="imageList['readerBack'].length > 0">
                <li class="image-reader-item"
                  :style="{
                    'backgroundImage': `url(${imageList['readerBack'][0]})`,
                    'backgroundPosition': 'center center',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': 'cover'
                  }">
                  <md-icon
                    class="image-reader-item-del"
                    name="circle-cross"
                    color="#666"
                    @click.native="onDeleteImage('readerBack', 0)">
                  </md-icon>
                </li>
              </template>
              <template v-else>
                <li class="image-reader-item add">
                  <md-image-reader
                    name="readerBack"
                    @select="onReaderSelect"
                    @complete="onReaderComplete"
                    @error="onReaderError"
                    is-multiple
                  ></md-image-reader>
                  <md-icon name="hollow-plus" size="md" color="#CCC"></md-icon>
                  <p>身份证反面照片</p>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </md-field>
      <md-button @click="handleNext">下一步</md-button>
    </template>
    <template v-if="step === 2">
      <div class="notice-bar">
        <div class="icon">
          <md-icon name="circle-alert" size="lg"></md-icon>
        </div>
        <div class="msg">
          <p>我方将对您的征信及大数据进行相关查询，支付查询费用50元，支付后进入初审环节。</p>
        </div>
      </div>
      <md-field title="授权查询费用">
        <md-input-item
          title="支付金额"
          align="right"
          type="money"
          v-model="cashierAmount"
          disabled
        />
      </md-field>
      <md-button @click="handleCashier">支付并进入初审环节</md-button>
      <md-cashier
        ref="cashier"
        v-model="isCashierhow"
        :channels="cashierChannels"
        :payment-amount="cashierAmount"
        payment-describe="征信查询费用"
        @select="onCashierSelect"
        @pay="onCashierPay"
        @cancel="onCashierCancel"
      />
    </template>
  </div>
</template>

<script>
  import { 
    InputItem,
    Button,
    Field, 
    NoticeBar, 
    ImageReader, 
    Icon, 
    Toast, 
    Cashier } from 'mand-mobile'
  import imageProcessor from 'mand-mobile/components/image-reader/image-processor'

  export default {
    name: 'BaseInfo',
    /* eslint-disable */
    components: {
      [InputItem.name]: InputItem,
      [Button.name]: Button,
      [Field.name]: Field,
      [NoticeBar.name]: NoticeBar,
      [ImageReader.name]: ImageReader,
      [Icon.name]: Icon,
      [Toast.name]: Toast,
      [Cashier.name]: Cashier
    },
    data() {
      return {
        step: 1,
        baseform: {},
        imageList: {
          readerFront: [],
          readerBack: []
        },
        isCashierhow: false,
        isCashierCaptcha: false,
        cashierAmount: '50.00',
        cashierResult: 'success',
        cashierChannels: [
          {
            icon: 'cashier-icon-2',
            text: '支付宝支付',
            value: '002'
          },
          {
            icon: 'cashier-icon-3',
            text: '微信支付',
            value: '003'
          }
        ]
      }
    },
    computed: {
      cashier() {
        return this.$refs.cashier
      }
    },
    mounted() {
      document.title = '基本信息录入'
    },
    methods: {
      onReaderSelect() {
        Toast.loading('图片读取中...')
      },
      onReaderComplete(name, {dataUrl}) {
        const imageList = []

        imageProcessor({
          dataUrl,
          width: 200,
          height: 200,
          quality: 0.8,
        }).then(({dataUrl}) => {
          dataUrl && imageList.push(dataUrl)
        })
        this.$set(this.imageList, name, imageList)

        Toast.hide()
      },
      onReaderError(name, {msg}) {
        Toast.failed(msg)
      },
      onDeleteImage(name, index) {
        const imageList = []
        imageList.splice(index, 1)
        this.$set(this.imageList, name, imageList)
      },
      handleNext() {
        this.step = 2
      },
      handleCashier() {
        this.isCashierhow = true
      },
      doPay() {
        if (this.isCashierCaptcha) {
          this.cashier.next('captcha', {
            text: 'Verification code sent to 156 **** 8965',
            autoCountdown: false,
            countNormalText: 'Send Verification code',
            countActiveText: 'Retransmission after {$1}s',
            onSend: countdown => {
              console.log('[Mand Mobile] Send Captcha')
              this.sendCaptcha().then(() => {
                countdown()
              })
            },
            onSubmit: code => {
              console.log(`[Mand Mobile] Send Submit ${code}`)
              this.checkCaptcha(code).then(res => {
                if (res) {
                  this.createPay().then(() => {
                    this.cashier.next(this.cashierResult)
                  })
                }
              })
            },
          })
        } else {
          this.createPay().then(() => {
            this.cashier.next(this.cashierResult, {
              buttonText: '我知道了',
              handler: () => {
                // Toast.info(`${this.cashierResult}点击`)
                this.$router.push({ path: '/notice' })
              },
            })
          })
        }
      },
      // Create a pay request & check pay result
      createPay() {
        this.cashier.next('loading')
        return new Promise(resolve => {
          this.timer = setTimeout(() => {
            resolve()
          }, 3000)
        })
      },
      onCashierSelect(item) {
        console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
      },
      onCashierPay(item) {
        console.log(`[Mand Mobile] Pay ${JSON.stringify(item)}`)
        this.doPay()
      },
      onCashierCancel() {
        // Abort pay request or checking request
        this.timer && clearTimeout(this.timer)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .base-form {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
  }

  .upload-preview__wrapper {
    position: relative;
    // left: 30px;
    width: 100%;
    overflow: hidden;
  }

  .upload-preview__box {
    &::after {
      content: "";
      clear: both;
      display: table;
    }
  }

  .image-reader-list {
    float: left;
    width: 100%;
    margin: 0;
  }

  .image-reader-item {
    float: left;
    width: 44%;
    padding-bottom: 30%;
    margin-bottom: 2%;
    margin-right: 2%;
    margin-left: 3%;
    background: #fff;
    box-sizing: border-box;
    list-style: none;
    border-radius: 4px;
    position: relative;
    background-size: cover;

    &:nth-of-type(4n) {
      margin-right: 0;
    }

    &.add {
      .md-icon {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%,-50%);
        opacity: .5;

        &.md {
          width: 40px;
          height: 40px;
        }
      }

      p {
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        margin-top: 15px;
        font-size: 30px;
        color: #ccc;
        text-align: center;
      }
    }

    .image-reader-item-del {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 3;
      background: #eee;
      border-radius: 50%;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 200%;
      height: 200%;
      border: 2px dashed #d9d9d9;
      box-sizing: border-box;
      transform-origin: 0 0;
      transform: scale(.5);
      z-index: 2;
    }
  }

  .md-button.primary.large {
    margin-top: 40px;
    border-radius: 0;
  }

  .notice-bar {
    width: 100%;
    min-height: 85px;
    display: flex;
    font-size: 24px;
    line-height: 1.5;
    z-index: 10;
    position: relative;
    background-color: #4a4c5b;
    color: #fff;
    align-items: center;

    .icon {
      width: 80px;
      align-self: stretch;
      text-align: center;
      padding-top: 20px;
      box-sizing: border-box;

    }

    .msg {
      flex: 1;
    }
  }
</style>