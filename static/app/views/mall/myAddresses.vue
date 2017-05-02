<template>
  <div class="my-addresses">
    <div class="flex-take-rest addresses-content">
      <scroller ref="scroller" style="margin-bottom:-3.6rem;">
        <div v-for="item in addressesList" class="card">
          <v-touch class="card-header" tag="header" @tap="showAddressDetail(item.id)">
            <div class="card-header-title">
              <article class="tile is-vertical">
                <p class="subtitle is-5 is-normal">{{$t('mall.address.fields.name') }}：{{item.name}}</p>
                <p class="subtitle is-5 is-normal">{{$t('mall.address.fields.mobile') }}：{{item.mobile}}</p>
                <p class="subtitle is-5 is-normal">{{$t('mall.address.fields.address') }}：{{item.area.replace(/-/g," ") }} {{item.address}}</p>
              </article>
            </div>
            <div class="card-header-icon">
              <i class="icon image-icon icon-right"></i>
            </div>
          </v-touch>
          <div class="card-content">
            <div class="columns is-mobile">
              <div class="column is-9-mobile is-11-tablet is-11-desktop is-paddingless">
                <label class="radio">
                  <v-touch v-if="item.is_default" class="subtitle is-5 is-primary is-normal" tag="span">
                    <i style="margin-right:0.5rem" class="icon image-icon icon-solid has-text-center"> <i style="width:1rem;" class="icon image-icon icon-select"></i></i>
                    {{$t('mall.address.fields.is_default') }}</v-touch>
                  <v-touch v-else class="subtitle is-5 is-normal" tag="span" @tap="setDefaultAddress(item.id)">
                    <i style="margin-right:0.5rem" class="icon image-icon icon-circle"></i>{{$t('mall.address.setDefault')
                    }}
                  </v-touch>
                </label>
              </div>
              <div class="column is-paddingless">
                <v-touch class="subtitle is-5 is-normal" tag="a" @tap="deleteAddress(item.id)"> <i style="margin-right:0.5rem; margin-top:0.1rem;" class="icon image-icon icon-remove"></i>{{$t('common.delete')
                  }}
                </v-touch>
              </div>
            </div>
          </div>
        </div>
        <div v-show="loading && addressesList.length==0" class="loading-layer">
          <label>{{$t('common.noMoreData') }}</label>
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
import scroller from 'common/components/scroller'
import Toast from 'common/components/toast'
import AlertDialog from 'common/components/alertDialog'

export default {
  components: {
    scroller
  },
  mounted: async function() {
    await this.loadAddress()
  },
  data: function() {
    return {
      loading: false,
      processing: false,
      canGoBack: false,
      inApp: window.acsConfig.inApp,
      addressesList: []
    }
  },
  methods: {
    loadAddress: async function() {
      let result = await this.$acs.getUserAddresses()
      if (result.success) {
        this.addressesList = result.addresses
        this.loading = true
      }
    },
    showAddressDetail: function(addressId) {
      this.$router.push({
        name: 'editAddress',
        params: {
          addressId: addressId
        },
      })
    },
    setDefaultAddress: async function(addressId) {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.setDefaultAddress(addressId)
        if (result.success) {
          Toast.show(this.$t('mall.address.setDefaultSuccess'))
          this.loadAddress()
        }
        this.processing = false
      }
    },
    deleteAddress: async function(addressId) {
      AlertDialog.show({
        visible: true,
        message: this.$t('common.confirmDelete'),
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        onOk: async _ => {
          if (!this.processing) {
            this.processing = true
            let result = await this.$acs.deleteAddress(addressId)
            if (result.success) {
              Toast.show(this.$t('mall.address.deleteSuccess'))
              this.loadAddress()
            }
            this.processing = false
          }
        }
      })
    },
    newAddress: function() {
      this.$router.push({
        name: 'newAddress'
      })
    }
  }
}
</script>