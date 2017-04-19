<template>
  <div class="my-addresses">
    <div class="flex-take-rest addresses-content">
      <scroller :on-load-more="loadmore" ref="scroller">
        <div v-for="item in addressesList" class="card">
          <v-touch class="card-header" tag="header" @tap="showAddressDetail(item.id)">
            <div class="card-header-title">
              <article class="tile is-vertical">
                <p class="subtitle is-5 is-marginless">{{$t('mall.address.fields.name') }}：{{item.name}}</p>
                <p class="subtitle is-5 is-marginless">{{$t('mall.address.fields.mobile') }}：{{item.mobile}}</p>
                <p class="subtitle is-5 is-marginless">{{$t('mall.address.fields.address') }}：{{item.address}}</p>
              </article>
            </div>
            <div class="card-header-icon">
              <h5 class="subtitle is-4">></h5>
            </div>
          </v-touch>
          <div class="card-content">
            <div class="columns is-mobile" style="width:95vw">
              <div class="column is-10 is-paddingless">
                <v-touch class="subtitle is-5 is-primary" tag="span" @tap="setDefaultAddress(item.id)">{{$t('mall.address.fields.is_default') }}</v-touch>
              </div>
              <div class="column is-paddingless">
                <v-touch class="subtitle is-5" tag="span" @tap="deleteAddress(item.id)">{{$t('common.delete') }}</v-touch>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <div class="flex-fixed-size addresses-bottom has-text-center">
      <v-touch class="button is-info is-large is-fullwidth" @tap="">{{$t('mall.address.add') }}</v-touch>
    </div>
  </div>
</template>
<script>
import Vue from '../../vue-installed'
import scroller from 'common/components/scroller'
import Toast from 'common/components/toast'

export default {
  components: {
    scroller
  },
  data: function() {
    return {
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      addressesList: [],
      page: 0,
      total: 1,
      recordsPerPage: 12
    }
  },
  methods: {
    resetScroller: function() {
      this.page = 0
      this.total = 1
      this.addressesList = []
      if (this.$refs.scroller) {
        this.$refs.scroller.$emit('reset')
      }
    },
    loadmore: async function() {
      let result = await this.$acs.getAddressesPaged(this.page + 1, this.recordsPerPage)

      if (result.success) {
        this.addressesList = this.page == 0 ? result.addresses : this.addressesList.concat(result
          .addresses)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },
    showAddressDetail: function(addressId) {
      this.$router.push({
        name: 'addressDetail',
        params: {
          addressId: addressId
        },
      })
    },
    setDefaultAddress: async function(addressId) {     
     let result = await this.$acs.SetDefaultAddress(addressId)
      if (result.success) {
        Toast.show(this.$t('forum.newPost.addSuccess'))
      }
    },
    deleteAddress: async function(addressId) {
      let result = await this.$acs.DeleteAddress(addressId)
      if (result.success) {
        Toast.show(this.$t('forum.newPost.addSuccess'))
      }
    }
  }
}
</script>