<template>
  <div>
    <div class="control has-icon has-icon-left">
      <input type="text"
             class="input"
             :placeholder="$t('admin.titles.searchOrders')"
             v-model="keyword">
      <span class="icon is-small">
        <i v-if="searching" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-search"></i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        keyword: "",
        searching: false,
      }
    }
  }
</script>

<style lang="scss">
</style>