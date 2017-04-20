<template>
  <div class="columns is-multiline is-mobile">
    <div class="column is-12 has-bottom-line">
      <p class="subtitle is-5 is-marginless">{{$t('mall.address.fields.mobile') }}：{{address.mobile}}</p>
    </div>
    <div class="column is-12 has-bottom-line">
      <p class="subtitle is-5 is-marginless">{{$t('mall.address.fields.mobile') }}：{{address.mobile}}</p>
    </div>
    <div class="column is-12 has-bottom-line">
      <p class="subtitle is-5 is-marginless">{{$t('mall.address.fields.area') }}：{{address.area}}</p>
    </div>
     <div class="column is-12 has-bottom-line">
      <p class="subtitle is-5 is-marginless">{{$t('mall.address.fields.address') }}：{{address.address}}</p>
    </div>
    <div class="column is-12 has-bottom-line">
      <v-touch class="button is-info is-large is-fullwidth" tag="a" @tap="">{{$t('common.save') }}</v-touch>
    </div>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import * as acs from 'common/js/acs'
import nativeApi from 'common/js/nativeApi'
import scroller from 'common/components/scroller'

export default {
  components: {
    scroller
  },
  mounted: async function() {
    await this.getAddressDetail()
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      address: {}
    }
  },
  methods: {
    onBtnBackClicked: function() {
      if (this.canGoBack) {
        this.$router.back()
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        })
      }
    },
    getAddressDetail: async function() {
      let addressId = this.$router.currentRoute.params.addressId
      let result = await this.$acs.GetAddressDetail(addressId)
      if (result.success) {
        this.address = result.address
      }
    }
  },
  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  }
}
</script>