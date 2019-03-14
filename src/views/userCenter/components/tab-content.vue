<template>
  <div class="product-list__inner">
    <template v-if="!loading">
      <template v-if="data.length > 0">
        <pull-to
          :bottom-load-method="handleBottomLoad"
          :is-top-bounce="pages <= 1 ? false : true"
          :is-bottom-bounce="pages <= 1 ? false : true"
          :bottom-config="bottomConfig"
        >
          <div
            v-for="(item, $index) in data"
            :key="$index"
            class="scroll-view-item"
          >
            <order-item
              :data="item"
              :status-text="statusText"
              :route="route"
            />
          </div>
        </pull-to>
      </template>
      <template v-else>
        <md-result-page :text="noDataText"/>
      </template>
    </template>
    <!-- <template v-else>
      <md-activity-indicator
        :size="24"
        :text-size="24"
      >
        加载中...
      </md-activity-indicator>
    </template> -->
  </div>
</template>

<script>
  import PullTo from 'vue-pull-to'
  import { ResultPage, ActivityIndicator } from 'mand-mobile'
  import OrderItem from './order-item.vue'
  export default {
    name: 'TabContent',
    /* eslint-disable */
    components: {
      [ResultPage.name]: ResultPage,
      [ActivityIndicator.name]: ActivityIndicator,
      OrderItem,
      PullTo
    },
    props: {
      loading: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: []
      },
      statusText: {
        type: String,
        default: '待审核'
      },
      route: {
        type: String,
        default: ''
      },
      pages: {
        type: Number,
        default: 0
      },
      bottomConfig: Object
    },
    data() {
      return {
        noDataText: '暂无数据'
      }
    },
    methods: {
      handleBottomLoad(loaded) {
        this.$emit('bottomLoadMethod', loaded)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-list__inner {
    width: 100%;
    height: calc(100vh - 100px);
    min-height: 250px;
    background: #fff;
    overflow-y: hidden;
  }
</style>