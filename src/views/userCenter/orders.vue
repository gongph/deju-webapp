<template>
  <div class="orders-wrapper">
    <template v-if="orders.length > 0">
      <md-tabs
        :titles="titles"
      >
        <div class="all"></div>
        <div class="unfinish"></div>
        <div class="finished"></div>
      </md-tabs>
    </template>
    <template v-else>
      <div class="empty-data__wrapper">
        <md-result-page text="暂无工单"/>
      </div>
    </template>
  </div>
</template>

<script>
  import { Tabs, ResultPage, Icon } from 'mand-mobile'

  export default {
    name: 'Orders',
    /* eslint-disable */
    components: {
      [Tabs.name]: Tabs,
      [ResultPage.name]: ResultPage,
      [Icon.name]: Icon
    },
    data() {
      return {
        orders: [],
        titles: ['全部', '待审核', '已审核'],
      }
    },
    mounted() {
      document.title = '我的工单'
    }
  }
</script>

<style lang="scss" scoped>
  .orders-wrapper {
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
  }

  .nav {
    width: 100%;
    height: 100px;
    background: #fff;
    margin-bottom: 10px;

    .back {
      font-size: 50px;
    }
  }
</style>