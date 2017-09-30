<template>
  <div class="index-page">
    <header class="header is-flex">
    </header>
    <div class="panel">
      <div class="bg-full bg-title-pmall">
      </div>
      <goods-list :goodses="goodses"></goods-list>
    </div>
  </div>
</template>
<script>
import goodsList from '../components/goodsList'
export default {
  components: {
    goodsList
  },
  computed: {
    goodses() {
      return window.acsConfig.goodses
    }
  },
}
</script>