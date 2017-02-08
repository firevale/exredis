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

    <div class="box" v-if="orders.length > 0">
      <div class="columns" v-for="order in orders">
        <figure class="image is-32x32 app-icon">
          <img :src="getAppIcon(order)"></img>
        </figure>  
      </div>
    </div>

    <div class="box" v-else>
      <div class="hero-body has-text-centered">
        <div v-if="loading" class="container">
          <span class="icon is-large">
            <i class="fa fa-spinner fa-spin"></i>
          </span>
          <h2 class="subtitle" style="margin-top: 20px">
            {{ $t('admin.titles.loading') }}
          </h2>
        </div>
        <div v-else class="container">
          <h1 class="title">
            {{ $t('admin.titles.oops') }}
          </h1>
          <h2 class="subtitle">
            {{ $t('admin.titles.noOrderToDisplay') }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {
    processAjaxError
  } from 'admin/common/utils'

  import { mapGetters, mapActions } from 'vuex'

  export default {
    data: function() {
      return {
        keyword: "",
        searching: false,
        loading: true,
        orders: [],
        page: 1,
        total: 1,
        recordsPerPage: 20,
      }
    },
  
    computed: {
      ...mapGetters([
        'appHash'
      ]),
    },

    mounted: function() {
      this.fetchOrders(this.page, this.recordsPerPage) 
    },

    methods: {
      getAppIcon: function(order) {

      },

      fetchOrders: function(page, recordsPerPage) {
        this.$http.post('/admin_actions/fetch_orders', {
          page, 
          records_per_page: recordsPerPage
        })
          .then(res => res.json())
          .then(result => {
            console.log('fetch orders result: ', result)

            if (result.success) {
              this.total = result.total
              this.orders = result.orders
            } else {
              return Promise.reject(result)
            }
          }).catch(e => processAjaxError(e))
      }
    },
  }
</script>