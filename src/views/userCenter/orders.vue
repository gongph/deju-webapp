<template>
  <div class="orders-wrapper">
    <template>
      <md-tabs :titles="titles">
        <!-- 待审核 -->
        <div class="unAudits">
          <template v-if="!loading">
            <div class="product-list__inner">
              <order-item :data="unAudits"/>
            </div>
          </template>
          <template v-else>
            <md-activity-indicator
              :size="24"
              :text-size="24"
            >
              加载中...
            </md-activity-indicator>
          </template>
        </div>
        <!-- 初审通过 -->
        <div class="auditeds">
          <order-item
            :data="auditeds"
            button-text="完善资料"
            no-data-text="暂无已通过数据"
            route="more"
          />
        </div>
        <!-- 初审失败 -->
        <div class="nopass">
          <order-item
            :data="nopasses"
            button-text="重填资料"
            no-data-text="暂无未通过数据"
            route="base"
          />
        </div>
        <!-- 终审通过 -->
        <div class="finished">
          <order-item
            :data="finished"
            status-text="终审通过"
            no-data-text="暂无已完成数据"
          />
        </div>
        <!-- 终审失败 -->
        <div class="nofinish">
          <order-item
            :data="nofinish"
            button-text="重填资料"
            no-data-text="暂无未完成数据"
            route="more"
          />
        </div>
      </md-tabs>
    </template>
  </div>
</template>

<script>
  import { Tabs, Icon, Button, ActivityIndicator } from 'mand-mobile'
  import OrderItem from './components/order-item.vue'

  export default {
    name: 'Orders',
    /* eslint-disable */
    components: {
      [Tabs.name]: Tabs,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [ActivityIndicator.name]: ActivityIndicator,
      OrderItem
    },
    data() {
      return {
        orders: [],
        titles: ['待审核', '初审通过', '初审失败', '终审通过', '终审失败'],
        loading: true
      }
    },
    computed: {
      unAudits() {
        return this.orders.filter(item => {
          return item.auditStatus === 'PENDINGREVIEW' // '待审核'
        })
      },
      nopasses() {
        return this.orders.filter(item => {
          return item.auditStatus === 'FIRSTTRIALFAILED' // '初审失败'
        })
      },
      auditeds() {
        return this.orders.filter(item => {
          return item.auditStatus === 'FIRSTTRIALPASSED' // '初审通过'
        })
      },
      finished() {
        return this.orders.filter(item => {
          return item.auditStatus === 'FINALTRIALPASSED' // '终审通过'
        })
      },
      nofinish() {
        return this.orders.filter(item => {
          return item.auditStatus === 'FINALTRIALFAILURE' // '终审失败'
        })
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.$store.dispatch('GetOrders').then(response => {
          if (response && response.status === 200) {
            this.orders = response.data
          }
          setTimeout(() => {
            this.loading = false
          }, 500)
        }).catch(err => {
          console.error(err)
        })
      }
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

  .product-list__inner {
    width: 100%;
    min-height: 250px;
    background: #fff;
  }
</style>
