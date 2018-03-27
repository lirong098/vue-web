<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <app-main></app-main>
    <dw-footer></dw-footer>
  </div>
</template>

<script>
import {navbar, appMain, dwFooter} from './components'
export default {
  name: 'layout',
  components: {
    navbar,
    appMain,
    dwFooter
  },
  computed: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
</style>
