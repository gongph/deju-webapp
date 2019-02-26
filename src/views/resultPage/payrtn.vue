<template>
  <div class="notice-wrapper">
    <svg-icon icon-class="clock" v-if="payStatus === 'waiting'"></svg-icon>
    <svg-icon icon-class="success" v-if="payStatus === 'successed'"></svg-icon>
    <svg-icon icon-class="unhappy" v-if="payStatus === 'failed'"></svg-icon>
    <div class="content">
      <template v-if="payStatus === 'waiting'">
        <h2 class="msg-title">
          <md-activity-indicator
            type="spinner"
            :size="90"
          >{{ payTipText }}</md-activity-indicator>
        </h2>
      </template>
      <template v-else-if="payStatus === 'successed'">
        <h2 class="msg-title">{{ payTipText }}</h2>
        <p class="msg-desc">您可以进入<router-link to="/center">我的工单</router-link>查看审核结果</p>
      </template>
      <template v-else>
        <h2 class="msg-title">{{ payTipText }}</h2>
      </template>
    </div>
  </div>
</template>

<script>
  import { ActivityIndicator } from 'mand-mobile'

  export default {
    name: 'PayNoticePage',
    components: {
      [ActivityIndicator.name]: ActivityIndicator
    },
    data() {
      return {
        payStatus: 'waiting', // 'waiting', 'successed', 'failed'
        payTipText: '等待支付返回结果...'
      }
    },
    mounted() {
      this.handlePayResult()
    },
    methods: {
      handlePayResult() {
        // Do something
        setTimeout(() => {
          this.payStatus = 'successed'
          this.payTipText = '支付成功'
        }, 3000)
      }
    }
  }
</script>

<style lang="scss" src="./components/result.scss" scoped/>