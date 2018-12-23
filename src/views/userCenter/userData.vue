<template>
  <div class="user-data__wrapper">
    <md-field>
      <md-input-item
        v-model="nickname"
        title="昵称:"
        type="text"
        placeholder="请输入昵称(6个字以内)"
        clearable
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
    components: {
      [InputItem.name]: InputItem,
      [Field.name]: Field,
      [Button.name]: Button
    },
    data() {
      return {
        buttonText: '保 存',
        nickname: '不吃鱼的海王'
      }
    },
    mounted() {
      document.title = '修改资料'
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
  .user-data__wrapper {
    background: #f5f5f5;
  }
  .footer {
    margin-top: 30px;

    .md-button {
      border-radius: 0;
    }
  }
</style>