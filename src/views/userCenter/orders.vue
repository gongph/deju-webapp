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
        <!-- 已通过 -->
        <div class="auditeds">
          <order-item
            :data="unAudits"
            status-text="已通过"
            no-data-text="暂无已通过数据"
            route
          />
        </div>
        <!-- 未通过 -->
        <div class="nopass">
          <order-item
            :data="nopasses"
            status-text="未通过"
            no-data-text="暂无未通过数据"
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
        titles: ['待审核', '已通过', '未通过'],
        loading: true
      }
    },
    computed: {
      unAudits() {
        return this.orders.filter(item => {
          return item.product && item.orderStatus === '未审核'
        })
      },
      auditeds() {
        return this.orders.filter(item => {
          return item.product && item.orderStatus === '已通过'
        })
      },
      nopasses() {
        return this.orders.filter(item => {
          return item.product && item.orderStatus === '未通过'
        })
      }
    },
    created() {
      this.getList()
    },
    mounted() {
      console.log(this.orders)
      document.title = '我的工单'
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