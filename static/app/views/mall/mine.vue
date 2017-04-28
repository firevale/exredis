<template>
  <div class="mall-mine">
    <router-link class="level is-mobile has-bottom-line" :to="{name: 'myOrders'}" tag="div">
      <div class="level-left">
        <h5 class="subtitle is-5"><i style="margin-right:0.8rem; margin-top:-.2rem;" class="icon image-icon icon-shopping-cart"></i>{{$t('mall.titles.myOrders')}}</h5>
      </div>
      <div class="level-right">
        <i class="icon image-icon icon-right"></i>
      </div>
    </router-link>
    <router-link class="level is-mobile has-bottom-line" :to="{name: 'myAddresses'}" tag="div">
      <div class="level-left">
        <i style="margin-right:0.8rem; margin-top:-.2rem;" class="icon image-icon icon-address"></i>
        <h5 class="subtitle is-5">{{$t('mall.titles.myAddresses')}}</h5>
      </div>
      <div class="level-right">
        <i class="icon image-icon icon-right"></i>
      </div>
    </router-link>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as acs from 'common/js/acs'
import nativeApi from 'common/js/nativeApi'
import * as filter from 'common/js/filters'

import sliderNav from '../../components/sliderNav'

export default {
  components: {
    sliderNav
  },
  mounted: async function() {},
  data: function() {
    return {
      menus: [{
          text: this.$t('customerService.commonIssues.title'),
          value: 'commonIssues'
        }, {
          text: this.$t('customerService.contactService.title'),
          value: 'contactService'
        },
        {
          text: this.$t('customerService.myService.title'),
          value: 'myService'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'transitionName',
    ]),
  },
  methods: {
    ...mapActions([
      'setTransitionName'
    ]),
    switchMenu: function(item, index) {
      this.$router.push({
        name: item.value
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.level {
  padding: 3rem 0;
}
</style>