<template>
  <div class="product-list__wrapper">
    <div class="lists">
      <router-link :to="{ name: 'ProductDetail', params: { id: 123 }}" class="list-item">
        <div class="thumbnail-wrapper">
          <div class="thumbnail">K</div>
        </div>
        <div class="content">
          <div class="title">快易贷 - 大众借款神器</div>
          <div class="description">分期6个月，日息低至0.09%</div>
          <div class="count">申请人数<span>21702人</span></div>
        </div>
        <div class="extra">
          <div class="arrow-right">
            <md-icon name="arrow-right" size="lg"></md-icon>
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'ProductDetail', params: { id: 123 }}" class="list-item">
        <div class="thumbnail-wrapper">
          <div class="thumbnail">J</div>
        </div>
        <div class="content">
          <div class="title">精英贷 - 满足你的消费需求</div>
          <div class="description">超高通过率，平均额度2万8，最...</div>
          <div class="count">申请人数<span>1245857人</span></div>
        </div>
        <div class="extra">
          <div class="arrow-right">
            <md-icon name="arrow-right" size="lg"></md-icon>
          </div>
        </div>
      </router-link>
      <router-link :to="{ name: 'ProductDetail', params: { id: 123 }}" class="list-item">
        <div class="thumbnail-wrapper">
          <div class="thumbnail">R</div>
        </div>
        <div class="content">
          <div class="title">任性贷 - 白领最好的选择</div>
          <div class="description">三步完成在线申请，极速下款</div>
          <div class="count">申请人数<span>987542人</span></div>
        </div>
        <div class="extra">
          <div class="arrow-right">
            <md-icon name="arrow-right" size="lg"></md-icon>
          </div>
        </div>
      </router-link>
    </div>
    <div class="footer">
      <p>Copyright © 2017-2018 Deju Rights Reserved</p>
    </div>
  </div>
</template>

<script>
  import { Icon } from 'mand-mobile'

  export default {
    name: 'ProductList',
    /* eslint-disable */
    components: {
      [Icon.name]: Icon
    },
    data() {
      return {
        //
      }
    },
    mounted() {
      document.title = "产品列表"
    }
  }
</script>

<style lang="scss" scoped>
  @mixin block-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .product-list__wrapper {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
  }

  .lists {
    width: 100%;
  }

  .list-item {
    width: 100%;
    min-height: 190px;
    background-color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;

    &:active {
      background-color: #f9f9f9;
    }

    & + .list-item {
      margin-top: 10px;
    }

    .thumbnail-wrapper,
    .content,
    .extra {
      align-self: stretch;
    }

    .thumbnail-wrapper {
      width: 200px;
      position: relative;

      .thumbnail {
        width: 150px;
        height: 150px;
        background: hsla(210, 29%, 24%, .75);
        color: #fff;
        line-height: 1.5;
        text-align: center;
        @include block-center;
      }
    }

    .content {
      flex: 1;
      font-size: 20px;
      color: #333;

      .title {
        font-size: 35px;
        padding: 20px 0;
      }

      .description {
        font-size: 30px;
        color: gray;
      }

      .count {
        color: gray;
        font-size: 30px;
        padding: 15px 0;

        span {
          padding-left: 10px;
          color: #fc9153;
        }
      }
    }

    .extra {
      width: 100px;
      position: relative;

      .arrow-right {
        @include block-center;
      }

      .md-icon.lg {
        width: 100px;
        height: 100px;
        color: #ddd;
      }
    }
  }

  .footer {
    color: #b4bfca;
    font-size: 18px;
    text-align: center;
    padding: 15px 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>
