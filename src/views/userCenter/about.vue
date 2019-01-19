<template>
  <div class="about-wrapper" >
    <div class="header">
      <div class="logo-wrapper">
        <div class="logo">
          <svg-icon icon-class="logo"/>
        </div>
        <div class="intro">借钱就找德聚金融</div>
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
        <div class="text">dejujinrong</div>
      </div>
      <div class="list-item">
        <div class="label">客服电话</div>
        <div class="text">
          <a href="tel: 400-100-1234" class="telphone">400-100-1234</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        //
        abouts: [],
        loadiing:false
      }
    },
    mounted() {
      document.title = "关于"
    },
    created(){
      this.getList()
    },
    methods:{
      getList(){
        this.$store.dispatch("GetAbouts").then(response=>{
          if(response&&response.status==200){
            this.abouts = response.data;
          }
          setTimeout(()=>{
            this.loading = false;
          },500)
        }).catch(err=>{
          console.error(err);
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
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
