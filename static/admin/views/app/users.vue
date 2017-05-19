<template>
  <div>
    <div class="control has-icon has-icon-left">
      <input type="text" class="input" @keyup.enter="onSearchBoxSubmit" :placeholder="$t('admin.titles.searchUsers')"
        v-model="keyword">
      <span class="icon is-small">
        <i v-if="searching" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-search"></i>
      </span>
    </div>
    <div class="tile is-ancestor" v-if="!initing && users.length > 0">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child is-12">
          <div class="table-responsive">
            <table class="table is-narrow">
              <thead>
                <tr>
                  <th class="has-text-left">{{ $t('admin.user.fields.avatar') }}</th>
                  <th class="has-text-left">{{ $t('admin.user.fields.nickname') }}</th>
                  <th class="has-text-left">{{ $t('admin.user.fields.email') }}</th>
                  <th class="has-text-left">{{ $t('admin.user.fields.gender') }}</th>
                  <th class="has-text-left">{{ $t('admin.user.fields.age')}}</th>
                  <th class="has-text-left">{{ $t('admin.user.fields.insertedAt')}}</th>
                  <th class="has-text-left"></th>
                </tr>
              </thead>
              <tbody>
                <template v-for="user in users">
                  <tr>
                    <td class="is-icon">
                      <figure class="image is-48x48">
                        <img :src="user.avatar_url ? user.avatar_url: 'https://placehold.it/48x48'"></img>
                      </figure>
                    </td>
                    <td> {{ user.nickname }}</td>
                    <td> {{ user.email }}</td>
                    <td> {{ user.gender =='male' ? $t('admin.user.gender.male') : $t('admin.user.gender.famale') }} </td>
                    <td> {{ user.age }}</td>
                    <td> {{ user.inserted_at | formatServerDateTime }} </td>
                    <td class="is-icon">
                      <a @click.prevent="searchUsers">
                        <i class="fa fa-pencil"></i>
                      </a>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </article>
        <article class="tile is-child is-12">
          <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
        </article>
      </div>
    </div>
    <div class="box" v-else>
      <div class="hero-body has-text-centered">
        <div v-if="loading || initing" class="container">
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
            {{ $t('admin.titles.noUserToDisplay') }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  processAjaxError
} from 'admin/miscellaneous'

import {
  mapGetters,
  mapActions
} from 'vuex'

import * as getters from 'admin/store/getters'
import Pagination from 'admin/components/Pagination'
import Tooltip from 'vue-bulma-tooltip'

export default {
  data: function() {
    return {
      keyword: "",
      searching: false,
      loading: false,
      initing: true,
      users: [],
      page: 0,
      total: 1,
      recordsPerPage: 10,
    }
  },

  computed: {
    appIcon: function() {
      if (this.app && this.app.icon) {
        return this.app.icon
      } else {
        return 'https://placehold.it/32x32?text=' + this.app.name
      }
    },

    currency: function() {
      if (this.app && this.app.currency) {
        return this.app.currency
      } else {
        return ''
      }
    },

  },

  mounted: async function() {
    await this.searchUsers()
    this.initing = false
  },

  methods: {
    getOrderPlatformIcon: function(user) {
      let result = 'fa fa-'
      switch (user.platform) {
        case 'android':
          result = result + 'android'
          break
        case 'ios':
          result = result + 'apple '
          break
        case 'wp8':
          result = result + 'windows '
          break
        default:
          result = result + 'apple '
          break
      }

      switch (user.status) {
        case 0:
          result = result + ' is-primary'
          break;
        case 1:
          result = result + ' is-info'
          break;
        case 2:
          result = result + ' is-success'
          break;
        case 3:
          result = result + ' is-danger'
          break;
      }

      return result
    },

    onPageChange: async function(page) {
      this.page = page
      await this.searchUsers()
    },

    onSearchBoxSubmit: async function() {
      this.page = 0
      await this.searchUsers()
    },

    searchUsers: async function() {
      this.searching = true
      let result = await this.$acs.searchUsers({
        keyword: this.keyword,
        page: this.page + 1,
        records_per_page: this.recordsPerPage
      })
      if (result.success) {
        this.total = result.total
        this.users = result.users
        this.page = result.page

      }
      this.searching = false
    },
  },

  components: {
    Pagination,
    Tooltip
  }
}
</script>
<style lang="scss">
</style>