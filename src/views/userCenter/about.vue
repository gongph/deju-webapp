<template>
  <div class="about-wrapper" >
    <div class="header">
      <div class="logo-wrapper">
        <div class="logo">
          <!-- <svg-icon icon-class="logo"/> -->
          <img src="../../assets/img/logo.png" class="img-logo">
        </div>
        <div class="intro">借钱就找渤源资本</div>
      </div>
    </div>

    <div class="list-wrapper" v-if="abouts.length > 0">
      <div  v-for="(item, $index) of abouts" :key="$index"  class="list-item">
        <div class="label">{{item.info}}</div>

        <div class="text" v-if="item.info == '客服电话'">
          <a :href="'tel:' + item.content" class="telphone">{{item.content}}</a>
        </div>
        <div class="text"  v-else>{{item.content}}</div>
      </div>
    </div>
    <div class="empty-data__wrapper" v-else>
      <div class="list-item">
        <div class="label">微信公众号</div>
        <div class="text">
          <a target="_blank" href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3NDgxNDA2Nw==#wechat_redirect" class="telphone">渤源资本</a>
        </div>
      </div>
      <div class="list-item">
        <div class="label">客服电话</div>
        <div class="text">
          <a href="tel: 18234208881" class="telphone">18234208881</a>
        </div>
      </div>
      <div class="list-item">
        <div class="label">运营微信号1</div>
        <div class="text">
          <a href="javascript:;" class="telphone" @click="handleClick(1, $event)">点击获取</a>
        </div>
      </div>
      <div class="list-item">
        <div class="label">运营微信号2</div>
        <div class="text">
          <a href="javascript:;" class="telphone" @click="handleClick(2, $event)">点击获取</a>
        </div>
      </div>
    </div>

    <md-popup v-model="isPopupShow1">
      <div class="md-example-popup md-example-popup-center">
        <img src="../../assets/img/service1.png" alt="运营1">
      </div>
    </md-popup>
    <md-popup v-model="isPopupShow2">
      <div class="md-example-popup md-example-popup-center">
        <img src="../../assets/img/service2.png" alt="运营2">
      </div>
    </md-popup>

  </div>

</template>

<script>
  import { Popup } from 'mand-mobile'
  export default {
    data() {
      return {
        isPopupShow1: false,
        isPopupShow2: false,
        service2: '../../assets/img/service2.png',
        abouts: [],
        loadiing:false
      }
    },
    components: {
      [Popup.name]: Popup
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        this.$store.dispatch("GetAbouts").then(response=>{
          if(response && response.status == 200){
            this.abouts = response.data;
          }
          setTimeout(()=>{
            this.loading = false;
          },500)
        }).catch(err=>{
          console.error(err);
        })
      },
      handleClick(val) {
        // TODO: 目前微信号是写死的，可以后台用户自己上传
        if (val === 1) {
          this.isPopupShow1 = true
        } else {
          this.isPopupShow2 = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-example-popup {
    position: relative;
    font-size: 24px;
    background: #fff;
    box-sizing: border-box;
    text-align: center;
    padding: 50px;
    border-radius: 4px;
  }
  .about-wrapper {
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
  }

  .header {
    width: 100vw;
    height: 320px;
    font-size: 35px;
  }

  .logo-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: 250px;
    min-height: 100px;
    // background: #ddd;
    text-align: center;
    font-size: 120px;
    line-height: 150px;
    .img-logo {
      max-width: 200px;
      border-radius: 50%;
    }
  }

  .intro {
    font-size: 28px;
    letter-spacing: 5px;
    color: #b4bfca;
    padding-top: 10px;
  }

  .list-wrapper {
    width: 100%;
    height: 201px;
    background: #fff;
  }

  .list-item {
    width: 100%;
    height: 100px;
    font-size: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    & + .list-item {
      border-top: 1px solid #ddd;
    }

    .label {
      padding-left: 30px;
      color: #5f5f5f;
    }

    .text {
      padding-right: 30px;
      color: #b4bfca;
      .telphone {
        text-decoration: none;
        color: #4283bd;
      }
    }
  }
</style>
