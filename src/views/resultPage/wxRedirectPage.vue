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
  import wx from 'weixin-js-sdk'
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
        payParams: null
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
        // 先获取支付配置信息
        const code = getUrlParam('code')
        invokeDopay(this.curApplyInfo, { code }).then(response => {
          if (response && response.status === 200) {
            this.payParams = response.data
            this.onBridgeReady()
          }
        })
      },
      /**
       * 发起微信支付
       * @return {[type]} [description]
       */
      onBridgeReady() {
        console.log('onBridgeReady...', 'invoke' in wx, 'WeixinJSBridge' in window, wx)
        WeixinJSBridge.invoke('getBrandWCPayRequest', this.payParams, (res) => {
          console.log('getBrandWCPayRequest res: ', res)
          if(res.err_msg == "get_brand_wcpay_request:ok") {
            const url = "/payrtn"
            window.location.href = `${window.location.origin}/#/${url}`
          }
          else if(res.err_msg == "get_brand_wcpay_request:cancel") {
            Toast.info('支付结束！')
          }
          else if(res.err_msg == "get_brand_wcpay_request：fail") {  
            Toast.info("支付失败!")
          }  
        })
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
