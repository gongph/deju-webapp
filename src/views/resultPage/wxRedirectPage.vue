<template>
  <div class="wx-redirect__page">
    <md-field
      title="支付信息"
    >
      <md-input-item
        title="收款方"
        align="right"
        type="text"
        v-model="cashierCompany"
      />

      <md-input-item
        title="支付金额"
        align="right"
        type="money"
        v-model="cashierAmount"
      />
      
    </md-field>
    <div class="footer-btn">
      <md-button @click="handleDopay">立即支付</md-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Button, Field, FieldItem, InputItem, Toast } from 'mand-mobile'
  import { invokeDopay } from '@/api/pay'
  import { deepClone, getUrlParam } from "@/utils"
  export default {
    name: 'WXRedirectPage',
    data() {
      return {
        cashierCompany: '渤源资本信息咨询服务有限公司',
        cashierAmount: '50.00',
        curApplyInfo: null,
        // 保存微信配置的支付参数
        payParams: null,
        userWXVersion: 0
      }
    },
    /* eslint-disable */
    components: {
      [Button.name]: Button,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem
    },
    computed: {
      ...mapGetters([
        'applyInfoForm'
      ])
    },
    created() {
      // 获取申请信息
      if (this.applyInfoForm) {
        this.applyInfoForm.then(data => {
          if (data) {
            this.curApplyInfo = deepClone(data)
          }
        })
      }
    },
    methods: {
      handleDopay() {
        // 判断是否在微信中交易
        if (this.isWeixin()) {
          // 检查微信版本，只有 v5.0+ 才支持支付
          const wv = this.getWeixinVersion()
          if (wv > '5.0') {
            // 先获取支付配置信息
            const code = getUrlParam('code')
            invokeDopay(this.curApplyInfo, { code }).then(response => {
              if (response && response.status === 200) {
                this.payParams = response.data
                if ('WeixinJSBridge' in window){
                  this.onBridgeReady()
                } else {
                  Toast.info('请在微信内置浏览器中支付！')
                }
              }
            })
          } else {
            Toast.info("请先升级你的微信到 v5.0 以上版本!")
          }
        }
      },
      /**
       * 发起微信支付
       * @return {[type]} [description]
       */
      onBridgeReady() {
        WeixinJSBridge.invoke('getBrandWCPayRequest', this.payParams, (res) => {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            alert(res.err_msg)
            window.location.href = 'http://www.baidu.com'
            //window.location.href = `${window.location.origin}/#/payrtn`
          }
          else if (res.err_msg == "get_brand_wcpay_request:cancel") {
            Toast.info('支付结束！')
          }
          else if (res.err_msg == "get_brand_wcpay_request：fail") {  
            Toast.info("支付失败!")
          }  
        })
      },
      getWeixinVersion() {
        const match = navigator.userAgent.match(/MicroMessenger\\/([\\d\\.]+)/i)
        return match[1]
      },
      isWeixin() {
        const ua = navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer-btn {
    width: 95%;
    margin: auto;
    margin-top: 30px;
    .md-activity-indicator-css {
      margin-bottom: 0;
      .md-activity-indicator-svg {
        height: 15px !important;
      }
    }
  }
</style>
