<template>
  <div class="mall-mine">
    <router-link class="level has-bottom-line" :to="{name: 'myOrders'}" tag="div">
      <div class="level-left">
        <h5 class="subtitle is-5">{{$t('mall.titles.myOrders')}}</h5>
      </div>
      <div class="level-right">
        <h5 class="subtitle is-4">></h5>
      </div>
    </router-link>
    <router-link class="level has-bottom-line" :to="{name: 'myAddresses'}" tag="div">
      <div class="level-left">
        <h5 class="subtitle is-5">{{$t('mall.titles.myAddresses')}}</h5>
      </div>
      <div class="level-right">
        <h5 class="subtitle is-4">></h5>
      </div>
    </router-link>
  </div>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/js/nativeApi'
import * as filter from 'common/js/filters'

export default {
  mounted: async function() {},
  data: function() {
    return {}
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.level {
  padding: 3rem 0;
}
</style>