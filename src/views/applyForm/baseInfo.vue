<template>
  <div class="base-form">
    <back-to :backLink="srcRoute"/>
    <template v-if="step === 1">
      <md-notice-bar>为了确保您能通过初步审核，请填写真实信息哦~</md-notice-bar>
      <md-field>
        <input-validate
          v-model="ruleForm.name"
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
          v-model="ruleForm.realNameMobilePhoneNumber"
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
          v-model="ruleForm.identityNumber"
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
              <template v-if="imageList['readerFront'].length >= 3">
                <li class="image-reader-item"
                :style="{
                  'backgroundImage': `url(${imageList['readerFront'][2]})`,
                  'backgroundPosition': 'center center',
                  'backgroundRepeat': 'no-repeat',
                  'backgroundSize': 'cover'
                }">
                  <md-icon
                    class="image-reader-item-del"
                    name="circle-cross"
                    color="#666"
                    @click.native="onDeleteImage('readerFront', 2)">
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
              <template v-if="imageList['readerBack'].length >= 3">
                <li class="image-reader-item"
                  :style="{
                    'backgroundImage': `url(${imageList['readerBack'][2]})`,
                    'backgroundPosition': 'center center',
                    'backgroundRepeat': 'no-repeat',
                    'backgroundSize': 'cover'
                  }">
                  <md-icon
                    class="image-reader-item-del"
                    name="circle-cross"
                    color="#666"
                    @click.native="onDeleteImage('readerBack', 2)">
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
        <md-button @click="handleNext" :disabled="(nextLoading || uploading)? true: false">
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
      <div class="notify-bar">
        <strong>授权申明:</strong> 我方将对您的征信及大数据进行第三方平台查询，查询费用为50元，此费用为第三方平台收取，仅限查询客户征信及大数据信息。
      </div>
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
            >授权支付中</md-activity-indicator>
          </template>
          <template v-else>授权查询</template>
        </md-button>
      </div>

      <md-cashier
        ref="cashier"
        v-model="isCashierhow"
        :channels="cashierChannels"
        :payment-amount="cashierAmount"
        payment-describe="征信查询费用"
        :pay-button-text="payButtonText"
        @select="onCashierSelect"
        @pay="onCashierPay"
        @cancel="onCashierCancel"
      />

      <md-dialog
        :closable="false"
        v-model="actDialog.open"
        :btns="actDialog.btns"
      >
        授权支付成功后将进入初审环节，确认要继续操作吗？
      </md-dialog>

      <!-- AliPay form -->
      <template v-if="payWay == 'ALIPAY'">
        <div class="pay-form" v-html="payForm"></div>
      </template>

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
  } from 'mand-mobile'
  import { mapGetters, mapActions } from 'vuex'
  // import imageProcessor from 'mand-mobile/components/image-reader/image-processor'
  import InputValidate from "@/components/InputValidate/index.vue"
  import { Validator } from "vee-validate"
  import { saveApplyInfo } from '@/api/product'
  import { pay, checkPay } from '@/api/pay'
  import { savePersonInfo } from "@/api/product"
  import { deepClone } from "@/utils"
  import { uploader, previewImage, removeRemoteImage } from '@/utils/file-uploader.js'

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
        paying: false, // 是否正在支付
        payWay: 'WEIXINPAY',
        baseform: {},
        imageList: {
          readerFront: [],
          readerBack: []
        },
        isCashierhow: false,
        isCashierCaptcha: false,
        cashierAmount: '50.00',
        cashierResult: 'success',
        payButtonText: '确定支付',
        cashierChannels: [
          {
            icon: 'cashier-icon-3',
            text: '微信支付',
            value: 'WEIXINPAY'
          },
          // {
          //   icon: 'cashier-icon-2',
          //   text: '支付宝支付',
          //   value: 'ALIPAY'
          // }
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
          name: '',
          realNameMobilePhoneNumber: '',
          identityNumber: ''
        },
        payForm: '',
        // 用户在产品详情页填写的申请信息
        // curApplyInfo: null,
        applyBaseInfo: null,
        // 路由来源
        srcRoute: '',
        uploading: false
      }
    },
    computed: {
      ...mapGetters([
        'applyInfo',
        'personalInfo',
        'product',
        'user'
      ]),
      cashier() {
        return this.$refs.cashier
      },
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.srcRoute = from.path
      })
    },
    created() {
      this.echoImg() // 回显照片
    },
    methods: {
      ...mapActions([
        'SaveApplyInfoFormToLocalforage'
      ]),
      echoImg() {
        if (this.personalInfo) {
          const personalInfo = this.personalInfo
          const front = personalInfo.idCardFrontPhotoUrl
          const frontType = personalInfo.idCardFrontPhotoContentType

          const back = personalInfo.idCardBackPhotoUrl
          const backType = personalInfo.idCardBackPhotoContentType

          this.ruleForm = deepClone(personalInfo)

          // 身份证正面照
          this.imageList.readerFront[0] = front
          this.imageList.readerFront[1] = frontType || undefined
          this.imageList.readerFront[2] = front ? previewImage(front) : undefined
          
          // 身份证反面照
          this.imageList.readerBack[0] = back
          this.imageList.readerBack[1] = backType || undefined
          this.imageList.readerBack[2] = back ? previewImage(back) : undefined
        }
      },
      onReaderSelect() {
        Toast.loading('图片读取中...')
      },
      onReaderComplete(name, { dataUrl, blob, file }) {
        Toast.loading('上传中...')
        this.uploading = true

        const fileSize = file && file.size
        if (fileSize > 5 * 1024 * 1024) {
          Toast.info('图片不能大于 5M！')
          return
        }

        // 保存照片
        const imageList = []

        // 上传照片到 Minio 服务器
        uploader(file).then(response => {
          Toast.hide()
          this.uploading = false
          const { bucketName, fileName } = response
          const fileUrl = `/${bucketName}/${fileName}`
          imageList.push(fileUrl)
          imageList.push(file.type)
          imageList.push(previewImage(fileUrl))
          this.$set(this.imageList, name, imageList)
        })
        .catch(err => {
          Toast.hide()
          this.uploading = false
          Toast.info('图片上传失败！')
          console.error(err)
        })
        
      },
      onReaderError(name, {msg}) {
        Toast.failed(msg)
      },
      onDeleteImage(name, index) {
        if (this.imageList[name].length > 0) {
          // 删除远程图片
          const imgUrl = this.imageList[name][0]
          const fileName = imgUrl.split('/')[1]
          removeRemoteImage(fileName).then(() => {
            console.log(`Remove remote image '${fileName}' successed!`)
          })
          .catch(err => {
            console.error(err)
          })
          this.$set(this.imageList, name, [])
        }
      },
      handleNext() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            // 照片验证
            if (this.imageList.readerFront.length <= 0 ||
                this.imageList.readerBack.length <= 0) {
              Toast.info('请上传身份证正反面照片！')
              return
            }

            this.nextLoading = true

            const imageList = this.imageList

            // 用户基本信息
            const applyBaseInfo = this.applyBaseInfo = Object.assign({}, this.ruleForm, {
              idCardFrontPhotoUrl         : imageList.readerFront[0],
              idCardFrontPhotoContentType : imageList.readerFront[1],
              idCardBackPhotoUrl          : imageList.readerBack[0],
              idCardBackPhotoContentType  : imageList.readerBack[1],
              user: this.user
            })

            // 修改或保存客户基本资料信息
            const method = applyBaseInfo.id ? 'PUT' : 'POST'
            savePersonInfo(applyBaseInfo, method).then(response => {
              if (response.status === 200 || response.status === 201) {
                // 保存返回的申请人基本信息
                this.$store.dispatch('SavePersonalInfo', response.data).then(() => {
                  // 检查当前客户信息是否支付过
                  this.checkPay({
                    idcard: applyBaseInfo.identityNumber,
                    name: applyBaseInfo.name
                  }).then(resp => {
                    // 没有支付过，跳到第二步去
                    if (resp.status === 200) {
                      if (!resp.data) {
                        this.step = 2
                      } else {
                        // 直接保存
                        this.saveApplyInfo(true)
                      }
                    } else {
                      console.error(`Check pay occur error. the status code: ${resp.status}`)
                    }
                  })
                })
              }
            }).catch(err => {
              this.nextLoading = false
              console.error(err)
            })
          } else {
            return false
          }
        })
      },
      handleCashier() {
        this.actDialog.open = true
        // 防抖
        this.payLoading = true
      },
      onActCancel() {
        this.actDialog.open = false
        this.payLoading = false
      },
      onActConfirm() {
        this.actDialog.open = false
        this.isCashierhow = true
      },
      checkPay(data) {
        return checkPay(data)
      },
      /**
       * 保存基本信息
       * @param  {Boolean} payed 是否7天内支付过了
       */
      saveApplyInfo(payed) {
        const applyInfoForm = Object.assign({}, this.applyInfo, {
          paymentMethod: this.payWay,
          paymentStatus: 0,
          auditStatus: 'PENDINGREVIEW',
          authorizedInquiryFee: 50,
          orderStatus: 'pending',
          product: this.product,
          personalInformation: this.personalInfo,
          user: this.user
        })
        saveApplyInfo(applyInfoForm).then(response => {
          if (response.status === 201) {
            this.nextLoading = false
            if (payed) {
              // 支付过了就直接跳转到通知页面
              this.$router.push({
                name: 'NoticePage',
                params: {
                  auth: true
                }
              })
            } else {
              // 发起支付请求
              pay(response.data).then(resp => {

                if (resp.status === 201 || resp.status === 200) {
                  // 微信支付
                  if (this.payWay === 'WEIXINPAY') {
                    this.SaveApplyInfoFormToLocalforage(response.data).then(() => {
                      // 重定向到公众号页面
                      document.location.href = resp.data
                    })
                  }
                  // 支付宝支付
                  else {
                    this.payForm = resp.data
                    this.$nextTick(() => {
                      document.forms[0].submit()
                    })
                  }

                } else {
                  this.paying = false
                }

              })
            }
          } else {
            this.paying = false
          }
        }).catch(err => {
          this.paying = false
          console.error(err)
        })
      },
      /**
       * 支付操作
       */
      doPay() {
        this.saveApplyInfo(false)
      },
      /**
       * 选择支付方式触发
       */
      onCashierSelect(item) {
        //console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
      },
      /**
       * 点击支付按钮触发
       */
      onCashierPay(item) {
        if (!item) {
          Toast.info('请选择支付方式！')
          return
        }

        // !如果正在支付，禁止重复点击
        if (this.paying) {
          Toast.info('不要重复提交！')
          return
        }

        this.payButtonText = '支付中...'
        this.payWay = item && item.value
        this.doPay()

        // 设置当前正在支付状态
        this.paying = true
      },
      /**
       * 取消支付触发
       */
      onCashierCancel() {
        this.timer && clearTimeout(this.timer)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .notify-bar {
    width: 100%;
    min-height: 85px;
    padding: 15px 20px;
    box-sizing: border-box;
    word-wrap: break-word;
    background-color: #f5f5f5;
    color: #fc9153;
    font-size: 24px;
    line-height: 1.5;
    position: relative;
    z-index: 10;
    justify-content: center;
  }
  .base-form {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    // overflow-x: hidden;
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
