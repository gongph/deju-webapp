<template>
  <div class="orders-wrapper">
    <back-to backLink="/center" />
    <md-tabs :titles="titles" @change="handleTabChange">
      <!-- 待审核 -->
      <div class="unAudits">
        <tab-content
          :data="orders"
          :loading="loading"
          :pages="pages"
          :bottomConfig="bottomConfig"
          @bottomLoadMethod="bottomLoadMethod"
        />
      </div>
      <!-- 初审通过 -->
      <div class="auditeds">
        <tab-content
          :data="orders"
          :loading="loading"
          :pages="pages"
          :bottomConfig="bottomConfig"
          status-text="初审通过"
          route="more"
          @bottomLoadMethod="bottomLoadMethod"
        />
      </div>
      <!-- 初审失败 -->
      <div class="nopass">
        <tab-content
          :data="orders"
          :loading="loading"
          :pages="pages"
          :bottomConfig="bottomConfig"
          route="base"
          @bottomLoadMethod="bottomLoadMethod"
        />
      </div>
      <!-- 终审通过 -->
      <div class="finished">
        <tab-content
          :data="orders"
          :loading="loading"
          :pages="pages"
          :bottomConfig="bottomConfig"
          status-text="终审通过"
          @bottomLoadMethod="bottomLoadMethod"
        />
      </div>
      <!-- 终审失败 -->
      <div class="nofinish">
        <tab-content
          :data="orders"
          :loading="loading"
          :pages="pages"
          :bottomConfig="bottomConfig"
          route="more"
          @bottomLoadMethod="bottomLoadMethod"
        />
      </div>
    </md-tabs>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { Toast, Tabs, Icon, Button, ActivityIndicator } from 'mand-mobile'
  import TabContent from './components/tab-content.vue'

  export default {
    name: 'Orders',
    /* eslint-disable */
    components: {
      [Tabs.name]: Tabs,
      [Icon.name]: Icon,
      [Button.name]: Button,
      [ActivityIndicator.name]: ActivityIndicator,
      TabContent
    },
    data() {
      return {
        orders: [],
        titles: ['待审核', '初审通过', '初审失败', '终审通过', '终审失败'],
        // 和 titles 顺序保持一致
        titlesEn: ['PENDINGREVIEW', 'FIRSTTRIALPASSED', 'FIRSTTRIALFAILED', 'FINALTRIALPASSED', 'FINALTRIALFAILURE'],
        // 数据加载标识
        loading: true,
        listQuery: {
          page: 0,
          pageSize: 5,
          auditStatus: 'PENDINGREVIEW'
        },
        tabIndex: 0,
        // 保存总条数
        total: 0,
        // 保存总页数
        pages: 0,
        // 上拉加载标识
        isLoadFinished: false,
        bottomConfig: {
          doneText: '数据正在赶来的路上~',
          loadingText: ''
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      ...mapActions(['GetCurOrders']),
      /**
       * 获取列表
       */
      getList() {
        Toast.loading('努力加载中...')
        const auditStatus = this.listQuery.auditStatus
        let tabData = this.orders
        // 重新请求数据
        this.GetCurOrders({
          page: this.listQuery.page,
          size: this.listQuery.pageSize,
          sort: 'createdDate,desc',
          auditStatus
        }).then(response => {
          Toast.hide()
          if (response && response.status === 200) {
            // 当前 Tab 页数据的总页数
            const total = +response.headers['x-total-count']
            this.total = total
            this.pages = Math.ceil(total / this.listQuery.pageSize)

            // 产品不为空
            const arr = response.data.filter((item) => {
              return !item.product === false
            })


            // 合并
            this.orders = tabData.concat(arr)
          }

          setTimeout(() => {
            this.loading = false
          }, 500)

        }).catch(err => {
          Toast.hide()
          console.error(err)
        })
      },
      /**
       * Tab页切换触发
       */
      handleTabChange(index, preIndex) {
        this.loading = true
        this.orders = []
        // 切换标签重置上拉Loading标识
        if (index !== preIndex) {
          this.isLoadFinished = false
        }

        // 设置当前查询参数
        const auditStatus = this.listQuery.auditStatus = this.titlesEn[index]

        // 没有缓存重新查
        this.listQuery.page = 0
        this.getList()
      },
      /**
       * 滚动到底部触发
       */
      bottomLoadMethod(loaded) {
        const curPage = this.listQuery.page
        const pages = this.pages

        if (this.isLoadFinished || pages <= 1) {
          return
        }

        setTimeout(() => {
          // 判断数据是否请求完了
          if (curPage < pages) {
            this.listQuery.page = curPage + 1
            this.getList()
          } else {
            this.bottomConfig.loadingText = '已经到底了'
            this.isLoadFinished = true
          }
          loaded('done')
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .orders-wrapper {
    width: 100vw;
    height: 100vh;
    background: #fff;
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
    height: calc(100vh - 180px);
    min-height: 250px;
    background: #fff;
    overflow-y: hidden;
  }
</style>
