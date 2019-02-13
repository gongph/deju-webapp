<template>
  <div class="reset-pwd__wrapper">
    <md-field>

      <input-validate
        v-model="ruleForm.oldPass"
        type="password"
        title="旧密码:"
        name="旧密码"
        placeholder="请输入旧密码"
        v-validate="'required|alpha_dash'"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('旧密码')"
        clearable
      />

      <input-validate
        v-model="ruleForm.newPass"
        ref="newPass"
        type="password"
        title="新密码:"
        name="newPass"
        placeholder="请输入新密码"
        v-validate="'required|alpha_dash|min:5'"
        data-vv-as="新密码"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('newPass')"
        clearable
      />

      <input-validate
        v-model="ruleForm.confirmPass"
        type="password"
        title="确认新密码:"
        name="confirmPass"
        placeholder="请确认新密码"
        v-validate="'required|confirmed:newPass|alpha_dash|min:5'"
        data-vv-as="确认新密码"
        data-vv-value-path="innerValue"
        data-vv-validate-on="blur"
        :error="errors.first('confirmPass')"
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
  import { resetPwd } from '@/api/user'

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
        buttonText: '保 存',
        ruleForm: {
          oldPass: '',
          newPass: '',
          confirmPass: ''
        }
      }
    },
    methods: {
      handleSave() {
        this.$validator.validateAll().then((valid) => {
          if (valid) {
            Toast.loading('保存中...')
            resetPwd({
              currentPassword: this.ruleForm.oldPass,
              newPassword: this.ruleForm.newPass
            }).then(response => {
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
  .reset-pwd__wrapper {
    background: #f5f5f5;
  }
  .footer {
    margin: 30px;
    .md-button.primary {
      border-radius: 10px;
    }
  }
</style>