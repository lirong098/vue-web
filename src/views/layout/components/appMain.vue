<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return []
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.app-main {
  height: calc(100% - 120px);
  width:100%;
  position: absolute;
  top:60px;
  left:0;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
