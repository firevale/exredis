<template>
  <div class="my-addresses">
    <div class="flex-take-rest addresses-content">
      <scroller ref="scroller" style="margin-bottom:-3.6rem;">
        <div v-for="(item, index) in addressesList" class="card">
          <v-touch class="card-header" tag="header" @tap="selectAddress(index)">
            <div class="card-header-title">
              <article class="tile is-vertical">
                <p class="subtitle is-5 is-normal">{{$t('mall.address.fields.name') }}：{{item.name}}</p>
                <p class="subtitle is-5 is-normal">{{$t('mall.address.fields.mobile') }}：{{item.mobile}}</p>
                <p class="subtitle is-5 is-normal">{{$t('mall.address.fields.address') }}：{{item.area.replace(/-/g," ") }} {{item.address}}</p>
              </article>
            </div>
            <div class="card-header-icon">
              <h5 class="subtitle is-4">></h5>
            </div>
          </v-touch>
        </div>
      </scroller>
    </div>
    <div class="flex-fixed-size addresses-bottom has-text-center">
      <v-touch class="button is-info is-large is-fullwidth" @tap="newAddress">{{$t('mall.address.add') }}</v-touch>
    </div>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import scroller from 'common/components/scroller'
import Toast from 'common/components/toast'

export default {
  components: {
    scroller
  },
  mounted: async function() {
    await this.loadAddress()
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      addressesList: [],
    }
  },
  methods: {
    ...mapActions([
      'updateSelectedAddress'
    ]),
    loadAddress: async function() {
      let result = await this.$acs.getUserAddresses()
      if (result.success) {
        this.addressesList = result.addresses
      }
    },
    selectAddress: function(index) {
      this.updateSelectedAddress(this.addressesList[index])
      this.$router.back()
    },
    newAddress: function() {
      this.$router.push({
        name: 'newAddress'
      })
    }
  },
}
</script>