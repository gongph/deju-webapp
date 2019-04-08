<template>
  <div class="banner-wrapper">
    <div class="bg"></div>
    <template v-if="loading">
      <a href="javascript:void(0)" class="banner-item">
        <img src="/img/banner-error.jpg"/>
      </a>
    </template>
    <template v-else>
      <md-swiper ref="swiper" :has-dots="false">
        <md-swiper-item :key="$index" v-for="(item, $index) in banners">
          <a href="javascript:void(0)" class="banner-item">
            <img
              :src="'http://th.minio.boyuanziben.cn' + item.contentUrl"
              style="width: 95%"
              onerror="this.src='/img/banner-error.jpg'"
            >
          </a>
        </md-swiper-item>
      </md-swiper>
    </template>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'mand-mobile'

  export default {
    name: 'Banner',
    /* eslint-disable */
    components: {
      [Swiper.name]: Swiper,
      [SwiperItem.name]: SwiperItem,
    },
    data() {
      return {
        banners: [],
        loading: true
      }
    },
    created(){
      this.getList()
    },
    methods: {
      getList() {
        this.$store.dispatch("GetBanners").then(response => {
          if (response && response.status == 200) {
            this.loading = false
            this.banners = response.data
          }
        }).catch(err=>{
          console.error(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .banner-wrapper {
    width: 100%;
    height: 300px;
    position: relative;

    .bg {
      background: #5a5a5a;
      width: 100%;
      height: 70%;
      position: absolute;
    }

    .banner-item {
      width: 100%;
      height: 100%;
      float: left;
      text-align: center;
      justify-content: center;
      text-decoration: none;
      font-size: 28px;
      color: #fff;
      display: block;

      position: relative;

      img {
        height: 90%;
        display: block;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
  }
</style>
