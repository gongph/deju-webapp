<template>
  <div class="base-form">
    <template v-if="step === 1">
      <md-notice-bar>为了确保您能通过初步审核，请填写真实信息哦~</md-notice-bar>
      <md-field>
        <input-validate
          v-model="ruleForm.realName"
          title="真实姓名"
          name="真实姓名"
          placeholder="请输入您的姓名"
          v-validate="'required'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('真实姓名')"
          clearable
        />
        <input-validate
          v-model="ruleForm.mobile"
          type="phone"
          title="实名手机号"
          name="实名手机号"
          placeholder="请输入您实名认证手机号"
          v-validate="'required|phone'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('实名手机号')"
          clearable
        />
        <input-validate
          v-model="ruleForm.idcard"
          title="身份证号"
          name="身份证号"
          placeholder="请输入您有效的身份证号"
          v-validate="'required|idcard'"
          data-vv-value-path="innerValue"
          data-vv-validate-on="blur"
          :error="errors.first('身份证号')"
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
      <div class="footer-btn">
        <md-button @click="handleNext" :disabled="nextLoading ? true: false">
          <template v-if="nextLoading">
            <md-activity-indicator
              class="md-activity-indicator-css"
              type="carousel"
              :size="15"
              color="#fff"
              text-color="#fff"
            >跳转中</md-activity-indicator>
          </template>
          <template v-else>下一步</template>
        </md-button>
      </div>
    </template>
    <template v-if="step === 2">
      <!-- <div class="notice-bar">
        <div class="icon">
          <md-icon name="circle-alert" size="lg"></md-icon>
        </div>
        <div class="msg">
          <p>我方将对您的征信及大数据进行相关查询，支付查询费用50元，支付后进入初审环节。</p>
        </div>
      </div> -->
      <md-notice-bar>我方将对您的征信进行相关查询，支付查询费用50元</md-notice-bar>
      <md-field title="授权查询费用:" class="step-two__field">
        <md-input-item
          title="支付金额"
          align="right"
          type="money"
          v-model="cashierAmount"
          disabled
        />
      </md-field>
      <div class="footer-btn">
        <md-button @click="handleCashier" :disabled="payLoading ? true: false">
          <template v-if="payLoading">
            <md-activity-indicator
              class="md-activity-indicator-css"
              type="carousel"
              :size="15"
              color="#fff"
              text-color="#fff"
            >正在支付</md-activity-indicator>
          </template>
          <template v-else>去支付</template>
        </md-button>
      </div>

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

      <md-dialog
        :closable="false"
        v-model="actDialog.open"
        :btns="actDialog.btns"
      >
        支付成功后将进入初审环节，确定要提交吗？
      </md-dialog>

      <!-- Pay form -->
      <div class="pay-form" v-html="payForm"></div>
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
    Cashier,
    Dialog,
    ActivityIndicator
  }
  from 'mand-mobile'
  import { mapGetters } from 'vuex'
  import imageProcessor from 'mand-mobile/components/image-reader/image-processor'
  import InputValidate from "@/components/InputValidate/index.vue"
  import { Validator } from "vee-validate"
  import { saveApplyInfo } from '@/api/product'
  import { pay } from '@/api/pay'
  import { savePersonInfo } from "@/api/product"
   import { deepClone } from "@/utils";

  // 手机号验证器
  Validator.extend("phone", {
    getMessage: field => `请输入您有效的${field}`,
    validate: value => /^1[34578][0-9]{9}$/.test(value)
  })
  // 身份证验证器
  Validator.extend("idcard", {
    getMessage: field => `请输入您有效的${field}`,
    validate: value => /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
  })

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
      [Cashier.name]: Cashier,
      [Dialog.name]: Dialog,
      [ActivityIndicator.name]: ActivityIndicator,
      InputValidate
    },
    data() {
      return {
        step: 1,
        nextLoading: false,
        payLoading: false,
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
            value: 'ALIPAY'
          },
          {
            icon: 'cashier-icon-3',
            text: '微信支付',
            value: 'WXPAY'
          }
        ],
        actDialog: {
          open: false,
          btns: [
            {
              text: '取消',
              handler: this.onActCancel,
            },
            {
              text: '确定',
              handler: this.onActConfirm,
            },
          ],
        },
        ruleForm: {
          id: 0,
          realName: '',
          mobile: '',
          idcard: ''
        },
        payForm: '',
        product: null,
        personalData: null,
        applyData: null
      }
    },
    computed: {
      ...mapGetters([
        'applyInfo',
        'personalInfo',
        'curProd',
        'user'
      ]),
      cashier() {
        return this.$refs.cashier
      }
    },
    created() {
      this.initPageData()
    },
    mounted() {
      document.title = '基本信息录入'
    },
    methods: {
      initPageData() {
        if (this.applyInfo) {
          this.applyInfo.then(data => {
            this.applyData = deepClone(data)
          })
        }
        if (this.personalInfo) {
          this.personalInfo.then(data => {
            this.ruleForm.id       = data.id
            this.ruleForm.realName = data.name
            this.ruleForm.mobile   = data.realNameMobilePhoneNumber
            this.ruleForm.idcard   = data.identityNumber

            this.imageList.readerFront.push(`data:${data.idCardFrontPhotoContentType};base64,${data.idCardFrontPhoto}`)
            this.imageList.readerFront.push(data.idCardFrontPhotoContentType)

            this.imageList.readerBack.push(`data:${data.idCardBackPhotoContentType};base64,${data.idCardBackPhoto}`)
            this.imageList.readerBack.push(data.idCardBackPhotoContentType)
          })
        }
      },
      onReaderSelect() {
        Toast.loading('图片读取中...')
      },
      onReaderComplete(name, { dataUrl, blob, file }) {
        const imageList = []
        imageProcessor().then(({dataUrl}) => {
          if (dataUrl) {
            imageList.push(dataUrl)
            imageList.push(file.type)
          }
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
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            if (this.imageList.readerFront.length <= 0 &&
              this.imageList.readerBack.length <= 0) {
              Toast.info('请上传身份证正反面照片！')
              return
            }

            this.nextLoading = true

            const pf = this.imageList.readerFront[0]
            const pb = this.imageList.readerBack[0]

            // Save
            const personalInfo = {
              name: this.ruleForm.realName,
              realNameMobilePhoneNumber: this.ruleForm.mobile,
              identityNumber: this.ruleForm.idcard,
              idCardFrontPhoto: pf.substring(pf.indexOf(',') + 1, pf.length),
              idCardFrontPhotoContentType: this.imageList.readerFront[1],
              idCardBackPhoto: pb.substring(pb.indexOf(',') + 1, pf.length),
              idCardBackPhotoContentType: this.imageList.readerBack[1],
              user: this.user
            }

            if (this.ruleForm.id) {
              personalInfo.id = this.ruleForm.id
            }

            this.$store.dispatch('SavePersonalInfo', personalInfo).then(() => {
              const method = this.ruleForm.id ? 'PUT' : 'POST'
              savePersonInfo(personalInfo, method).then(response => {
                // 保存当前申请人信息
                if (response.status === 200 || response.status === 201) {
                  this.$store.dispatch('SavePersonalInfo', response.data).then(() => {
                    this.step = 2
                  })
                } else {
                  this.nextLoading = false
                }
              }).catch(err => {
                this.nextLoading = false
                console.error(err)
              })
            })
            .catch(err => {
              this.nextLoading = false
              console.error(err)
            })
          } else {
            return false
          }
        })
      },
      handleCashier() {
        // this.isCashierhow = true
        this.actDialog.open = true
      },
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
        this.actDialog.open = false
        this.isCashierhow = true
        // this.payLoading = true
      },
      doPay() {
        // Save
        this.$store.dispatch('SaveApplyInfo', {
          paymentMethod: 'ALIPAY',
          paymentStatus: 0,
          auditStatus: 'PENDINGREVIEW',
          authorizedInquiryFee: 50,
          orderStatus: '',
          product: this.product,
          personalInformation: this.personalInfo,
          user: this.user
        }).then(res => {
          // 保存成功提交到后台
          saveApplyInfo(this.applyInfo).then(response => {
            if (response.status === 201) {
              this.$store.dispatch('SaveApplyInfo',response.data)
              pay(this.applyInfo).then(resp => {
                this.payForm = resp.data
                this.$nextTick(() => {
                  document.forms[0].submit()
                })
              })
            } else {
              //this.payLoading = false
            }
          }).catch(err => {
            //this.payLoading = false
            console.error(err)
          })
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
    border-radius: 10px;
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
  .footer-btn {
    width: 95%;
    margin: auto;
    .md-activity-indicator-css {
      margin-bottom: 0;
      .md-activity-indicator-svg {
        height: 15px !important;
      }
    }
  }
</style>
