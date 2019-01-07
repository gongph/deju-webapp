<template>
  <div class="more-apply__info">
    <md-notice-bar>为了确保您能终审通过，请填写下列详细信息</md-notice-bar>
    <md-field title="个人信息" class="field-title">
      <md-field-item
        title="所在城市:"
        arrow="arrow-right"
        align="right"
        :value="cityPickerValue"
        @click.native="isPickerShow = true">
      </md-field-item>

      <md-input-item
        title="住宅地址:"
        placeholder="住宅地址"
      />

      <md-input-item
        type="email"
        title="邮箱:"
        placeholder="邮箱"
      />

      <md-field-item
        title="婚姻状况:"
        arrow="arrow-right"
        align="right"
        :value="marrigePickerValue"
        @click.native="isMarrigePickerShow = true">
      </md-field-item>

      <md-field-item
        title="教育程度:"
        arrow="arrow-right"
        align="right"
        :value="educatePickerValue"
        @click.native="isEducatePickerShow = true">
      </md-field-item>

    </md-field>

    <!-- 所在城市picker -->
    <md-picker
      ref="cityPicker"
      v-model="isPickerShow"
      :data="pickerData"
      :cols="3"
      is-cascade
      title="选择省市区"
      @confirm="onPickerConfirm('cityPicker')"
    />

    <!-- 婚姻状态picker -->
    <md-picker
      ref="marrigePicker"
      v-model="isMarrigePickerShow"
      :data="marrigePickerData"
      :cols="1"
      :is-cascade="false"
      title="婚姻状况"
      @confirm="onPickerConfirm('marrigePicker')"
    />

    <!-- 教育程度picker -->
    <md-picker
      ref="educatePicker"
      v-model="isEducatePickerShow"
      :data="educatePickerData"
      :cols="1"
      :is-cascade="false"
      title="教育程度"
      @confirm="onPickerConfirm('educatePicker')"
    />

    <!-- 2 -->

    <md-field title="工作信息" class="field-title">
      <md-input-item
        title="单位名称:"
        placeholder="单位名称"
      />

      <md-field-item
        title="单位城市:"
        arrow="arrow-right"
        align="right"
        :value="companyPickerValue"
        @click.native="isPickerShow = true">
      </md-field-item>

      <md-input-item
        title="单位地址:"
        placeholder="单位地址"
      />

      <md-input-item
        type="phone"
        title="单位电话:"
        placeholder="单位电话"
      />

      <md-input-item
        type="money"
        title="年收入:"
        placeholder="年收入(元)"
      />

    </md-field>

    <!-- 所在城市picker -->
    <md-picker
      ref="companyPicker"
      v-model="isPickerShow"
      :data="pickerData"
      :cols="3"
      is-cascade
      title="选择省市区"
      @confirm="onPickerConfirm('companyPicker')"
    />

    <!-- 3 -->

    <md-field title="联系人信息" class="field-title">
      <md-field title="联系人1:" class="field-contact__item">
        <md-input-item
          placeholder="姓名"
        />

        <md-input-item
          type="phone"
          placeholder="电话"
        />
      </md-field>

      <md-field title="联系人2:" class="field-contact__item">
        <md-input-item
          placeholder="姓名"
        />

        <md-input-item
          type="phone"
          placeholder="电话"
        />
      </md-field>

    </md-field>

    <div class="footer-btn">
      <md-button>提 交</md-button>
    </div>

  </div>
</template>

<script>
  import { Picker, Field, FieldItem, InputItem, Button, Toast, NoticeBar } from 'mand-mobile'
  import { district } from '@/utils/district'
  import { educates } from '@/utils'
  // import InputValidate from "@/components/InputValidate/index.vue"
  export default {
    name: 'MoreApplyInfoForm',
    /* eslint-disable */
    components: {
      [Picker.name]: Picker,
      [Field.name]: Field,
      [FieldItem.name]: FieldItem,
      [InputItem.name]: InputItem,
      [Button.name]: Button,
      [Toast.name]: Toast,
      [NoticeBar.name]: NoticeBar,
      // InputValidate
    },
    data() {
      return {
        // 所在城市
        isPickerShow: false,
        cityPickerValue: '',
        pickerData: district,
        // 婚姻
        isMarrigePickerShow: false,
        marrigePickerValue: '',
        marrigePickerData: [[
          { value: '已婚', label: '已婚', children: [] },
          { value: '未婚', label: '未婚', children: [] }
        ]],
        // 教育程度
        isEducatePickerShow: false,
        educatePickerValue: '',
        educatePickerData: educates,
        // 单位城市
        companyPickerValue: '',
      }
    },
    created() {
      //
    },
    methods: {
      onPickerConfirm(name) {
        const values = this.$refs[name].getColumnValues()
        let res = ''
        values.forEach(value => {
          value && (res += `${value.text || value.label} `)
        })
        this[`${name}Value`] = res
      }
    }
  }
</script>

<style lang="scss">
  .more-apply__info {
    width: 100vw;
    height: 100vh;
    background-color: #f5f5f5;
    .field-title {
      & > .md-field-title {
        color: #2c3e50;
        font-size: 30px;
        font-weight: 400;
      }
    }
    .field-contact__item .md-field-title::before,
    .field-title .md-field-item-title::before {
      content: '*';
      padding-top: 5px;
      padding-right: 5px;
      color: #ff525d;
    }
    .footer-btn {
      width: 95%;
      margin: 30px auto;
    }
  }
</style>
