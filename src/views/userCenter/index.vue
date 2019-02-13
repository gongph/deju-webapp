<template>
  <div class="user-center__wrapper">
    <div class="header">
      <div class="avator-wrapper">
        <div class="avator">
          <svg-icon icon-class="avator"/>
        </div>
        <div class="nickname">{{ name }}</div>
      </div>
    </div>

    <div class="list-wrapper">
      <div v-for="(item, $index) of navs" :key="$index" class="list-item">
        <div class="icon-wrapper">
          <svg-icon :icon-class="item.icon"/>
        </div>
        <div class="label-wrapper">{{ item.name }}</div>
        <div class="arrow-right__wrapper" @click="handleRoute(item.route)">
          <md-icon name="arrow-right" size="lg"></md-icon>
        </div>
      </div>
    </div>

    <!-- Logout -->
    <div class="footer">
      <md-button type="ghost-primary" @click="actDialog.open = true">退出</md-button>
    </div>

    <md-dialog
      title="退出登录？"
      :closable="false"
      v-model="actDialog.open"
      :btns="actDialog.btns"
    />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Icon, Button, Dialog } from 'mand-mobile'

  export default {
    name: 'UserCenter',
    /* eslint-disable */
    components: {
      [Icon.name]: Icon,
      [Button.name]: Button,
      [Dialog.name]: Dialog
    },
    data() {
      return {
        navs: [
          { name: '我的订单', icon: 'order', route: '/orders' },
          { name: '修改资料', icon: 'user-data', route: '/userdata' },
          { name: '修改密码', icon: 'password', route: '/resetpwd' },
          { name: '关于', icon: 'about', route: '/about' }
        ],
        actDialog: {
          open: false,
          btns: [
            {
              text: '手滑了',
              handler: this.onActCancel,
            },
            {
              text: '残忍离开',
              handler: this.onActConfirm,
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'name'
      ])
    },
    methods: {
      handleRoute(path) {
        this.$router.push({ path })
      },
      handleLogout() {
        this.$store.dispatch('Logout').then(() => {
          this.$router.push({ path: '/' })
        })
      },
      onActCancel() {
        this.actDialog.open = false
      },
      onActConfirm() {
        this.actDialog.open = false
        this.handleLogout()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-center__wrapper {
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
  }

  .header {
    width: 100%;
    height: 200px;
    background-image: linear-gradient( 135deg, #fc9153 10%, #FCCF31 100%);
  }

  .avator-wrapper {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 30px;
    overflow-x: hidden;

    .avator {
      width: 120px;
      height: 120px;
      min-width: 120px;
      min-height: 120px;
      background: #f3f3f3;
      border-radius: 100%;
      text-align: center;
    }

    .nickname {
      font-size: 35px;
      color: #fff;
      padding-left: 15px;
      box-sizing: border-box;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .list-wrapper {
    width: 100%;
    height: 400px;
    background: #fff;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .list-item {
    width: 100%;
    height: 100px;
    display: flex;
    font-size: 35px;
    align-items: center;

    .icon-wrapper {
      font-size: 50px;
      margin-left: 30px;
      font-weight: 700;
    }

    .label-wrapper {
      padding-left: 20px;
      flex: 1;
    }

    .arrow-right__wrapper {
      width: 60px;
      color: gray;
    }
  }

  .footer {
    position: absolute;
    left: 50%;
    bottom: 25px;
    transform: translateX(-50%);
  }
</style>