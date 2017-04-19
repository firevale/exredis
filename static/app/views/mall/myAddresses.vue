<template>
  <div class="my-addresses">
    <div class="flex-take-rest addresses-content">
      <scroller :on-load-more="loadmore" ref="scroller">
        <div v-for="item in addressesList" class="card">
          <header class="card-header">
            <div class="card-header-title">
              <article class="tile is-vertical">
                <p class="subtitle is-5 is-marginless">姓名：{{item.name}}</p>
                <p class="subtitle is-5 is-marginless">手机：{{item.mobile}}</p>
                <p class="subtitle is-5 is-marginless">地址：{{item.address}}</p>
              </article>
            </div>
            <div class="card-header-icon">
              <h5 class="subtitle is-4">></h5>
            </div>
          </header>
          <div class="card-content">
            <div class="columns is-mobile" style="width:95vw">
              <div class="column is-10 is-paddingless">
               <span class="subtitle is-5 is-primary">默认地址</span>
              </div>
              <div class="column is-paddingless">
               <span class="subtitle is-5">删除</span>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
    <div class="flex-fixed-size addresses-bottom has-text-center">
     <v-touch class="button is-info is-large is-fullwidth" @tap="">添加地址</v-touch>
    </div>
  </div>
</template>

<script>
import Vue from '../../vue-installed'
import scroller from 'common/components/scroller'

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
        this.addressesList = this.page == 0 ? result.addresses : this.addressesList.concat(result.addresses)
        this.total = result.total
        this.page = this.page + 1

        if (this.$refs.scroller && this.page >= this.total) {
          this.$refs.scroller.$emit('all-loaded')
        }
      }
    },
    // showAddressDetail: function(addressId) {
    //   this.$router.push({
    //     name: 'addressDetail',
    //     params: {
    //       addressId: addressId
    //     },
    //   })
    // }
  }
}
</script>