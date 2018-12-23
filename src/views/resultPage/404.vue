<template>
  <div class="result-page__wrapper">
    <md-result-page
      type="lost">
    </md-result-page>
  </div>
</template>

<script>
  import {ResultPage} from 'mand-mobile'

  export default {
    name: 'Error404Page',
    components: {
      [ResultPage.name]: ResultPage,
    }
  }
</script>

<style lang="scss" scoped>
  .result-page__wrapper {
    width: 100vw;
    height: 100vh;
    background: #fff;
  }
</style>