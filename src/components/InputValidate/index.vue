<template>
  <md-input-item
    :type="type"
    :title="title"
    :name="name"
    :align="align"
    :placeholder="placeholder"
    v-model="innerValue"
    :error="error"
    @blur="onBlur"
  />
</template>
<script>
import { InputItem } from 'mand-mobile'
export default {
  /* eslint-disable */
  components: {
    [InputItem.name]: InputItem
  },
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    title: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: 'left'
    },
    placeholder: {
      type: String,
      default: ""
    },
    error: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      innerValue: ""
    };
  },
  watch: {
    innerValue(val) {
      this.$emit("input", val);
    }
  },
  created() {
    this.value && (this.innerValue = this.value)
  },
  methods: {
    onBlur() {
      this.$emit("blur");
    }
  }
}
</script>
