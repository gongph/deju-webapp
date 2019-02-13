<template>
  <div class="user-data__wrapper" v-if="user">
    <md-field>
      <md-input-item
        v-model="user.login"
        title="账号:"
        type="text"
        placeholder="请输入昵称(6个字以内)"
        disabled
      />

      <input-validate
        :value="user.email"
        v-model="user.email"
        type="email"
        title="邮箱:"
        name="邮箱"
        placeholder="请输入您的邮箱"
        v-validate="'required|email'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('邮箱')"
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
  import InputValidate from "@/components/InputValidate/index.vue"
  import { mapGetters } from 'vuex'
  import { updateUserData } from '@/api/user'

  export default {
    name: 'ResetPwd',
    /* eslint-disable */
    components: {
      [InputItem.name]: InputItem,
      [Field.name]: Field,
      [Button.name]: Button,
      InputValidate
    },
    data() {
      return {
        buttonText: '保 存'
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      handleSave() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            Toast.loading('保存中...')
            updateUserData(this.user).then(response => {
              if (response.status === 200) {
                Toast.succeed('保存成功')
              }
            }).catch(err => {
              Toast.failed('保存失败')
              console.error(err)
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user-data__wrapper {
    background: #f5f5f5;
  }
  .footer {
    margin: 30px;
    .md-button.primary {
      border-radius: 10px;
    }
  }
</style>