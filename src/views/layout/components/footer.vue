<template>
  <div class="dw-footer">
    <div class="dw-footer-div"></div>
    <ul class="dw-footer-ul">
      <li><span style="font-size: 12px;">©2014-2018 CoreOS, Inc.</span></li>
      <li>
        <router-link :to="{name: 'login'}">关于</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'dw-footer',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {},
  updated () {},
  watch: {}
}
</script>
<style rel="stylesheet/scss" lang="scss" scope>
.dw-footer {
  position: absolute;
  bottom: 0px;
  height: 60px;
  width: 100%;
  .dw-footer-div {
    height: 20px;
    width: 100%;
    background-color: #1E6A9A;
  }
  .dw-footer-ul {
    margin: 5px;
    height: 40px;
    display: flex;
    align-items: center;
    li {
      margin: 0 10px;
      font-size: 14px;
    }
  }
}
</style>
