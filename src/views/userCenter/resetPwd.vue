<template>
  <div class="reset-pwd__wrapper">
    <md-field>
      <md-input-item
        title="旧密码:"
        type="password"
        placeholder="请输入旧密码"
      />
      <md-input-item
        title="新密码:"
        type="password"
        placeholder="请输入新密码"
      />
      <md-input-item
        title="确认新密码:"
        type="password"
        placeholder="请确认新密码"
      />
    </md-field>

    <div class="footer">
      <md-button size="small" @click="handleSave">{{ buttonText }}</md-button>
    </div>
  </div>
</template>

<script>
  import { InputItem, Field, Button, Toast } from 'mand-mobile'

  export default {
    name: 'ResetPwd',
    /* eslint-disable */
    components: {
      [InputItem.name]: InputItem,
      [Field.name]: Field,
      [Button.name]: Button
    },
    data() {
      return {
        buttonText: '保 存'
      }
    },
    mounted() {
      document.title = '修改密码'
    },
    methods: {
      handleSave() {
        this.buttonText = '保存中...'
        setTimeout(() => {
          this.buttonText = '保存'
          Toast.succeed('保存成功')
        }, 1000)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .reset-pwd__wrapper {
    background: #f5f5f5;
  }
  .footer {
    margin-top: 30px;

    .md-button {
      border-radius: 0;
    }
  }
</style>