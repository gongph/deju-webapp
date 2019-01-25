<template>
  <div class="select-item__wrapper">
    <md-field-item
      :title="title"
      :name="name"
      :arrow="arrow"
      :align="align"
      :value="fieldVal"
      v-validate="'required'"
      @click.native="isPickerShow = true"
    />
    <md-picker
      ref="MdPicker"
      v-model="isPickerShow"
      :data="pickerData"
      :cols="pickerCols"
      is-cascade
      :title="pickerTitle"
      @confirm="onPickerConfirm('MdPicker')"
    />
  </div>
</template>

<script>
  import { FieldItem, Picker } from 'mand-mobile'
  export default {
    name: 'SelectItem',
    /* eslint-disable */
    components: {
      [FieldItem.name]: FieldItem,
      [Picker.name]: Picker
    },
    data() {
      return {
        fieldVal: this.value,
        isPickerShow: false,
      }
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      arrow: {
        type: String,
        default: 'arrow-right'
      },
      align: {
        type: String,
        default: 'center'
      },
      pickerData: {
        type: Array,
        default: () => { return [] }
      },
      pickerTitle: {
        type: String,
        default: ''
      },
      pickerCols: {
        type: Number,
        default: 3
      }
    },
    watch: {
      fieldVal(val) {
        this.$emit('update:value', val)
      }
    },
    methods: {
      onPickerConfirm(name) {
        const values = this.$refs[name].getColumnValues()
        let res = ''
        values.forEach(value => {
          value && (res += `${value.text || value.label} `)
        })
        this.fieldVal = res
      }
    }
  }
</script>