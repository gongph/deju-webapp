<template>
  <md-input-item
    :type="type"
    :title="title"
    :name="name"
    :placeholder="placeholder"
    v-model="innerValue"
    :error="error"
    @blur="onBlur"
  />
</template>
<script>
import { InputItem } from 'mand-mobile'
export default {
  components: {
    [InputItem.name]: InputItem
  },
  props: {
    value: {
      type: String,
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
  methods: {
    onBlur() {
      this.$emit("blur");
    }
  }
}
</script>
