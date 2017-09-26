<template>
  <div class="users-page">
    <div class="control has-icon has-icon-left">
      <input type="text" class="input" @keyup.enter="onSearchBoxSubmit" :placeholder="$t('admin.titles.searchUsers')"
        v-model="keyword">
      <span class="icon is-small">
        <i v-if="searching" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-search"></i>
      </span>
    </div>
    <div class="box" v-if="!initing && users.length > 0">
      <div class="columns is-multiline">
        <div class="column is-3" v-for="user in users" :key="user.id">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="(user.avatar_url || '/images/default_avatar.png') | imageStaticUrl" alt="user avatar">
                </figure>
              </div>
              <div class="media-content">
                <nav class="level is-mobile" style="margin-bottom: 0.25rem">
                  <div class="level-left">
                    <span class="level-item">
                      <strong>{{user.id}}</strong>
                    </span>
                  </div>
                  <div class="level-right">
                    <span class="level-item">
                      <span class="icon is-small is-primary" style="cursor: pointer" @click="showDetail(user.id)"><i class="fa fa-clone"></i></span>
                    </span>
                  </div>
                </nav>
                <div class="content">
                  <span>昵称:&nbsp<small>{{user.nickname}}</small><br/></span>
                  <span v-show="user.email">email:&nbsp<small>{{user.email}}</small><br/></span>
                  <span v-show="user.mobile">手机:&nbsp<small>{{user.mobile}}</small><br/></span>
                </div>
              </div>
            </article>          
          </div>
        </div>
      </div>
    </div>
    <div class="box" v-else>
      <div class="hero-body has-text-centered">
        <div v-if="loading || initing">
          <span class="icon is-large">
            <i class="fa fa-3x fa-spinner fa-spin"></i>
          </span>
          <h2 class="subtitle" style="margin-top: 10px">
            {{ $t('admin.titles.loading') }}
          </h2>
        </div>
        <div v-else>
          <h1 class="title">
            {{ $t('admin.titles.oops') }}
          </h1>
          <h2 class="subtitle">
            {{ $t('admin.titles.noUserToDisplay') }}
          </h2>
        </div>
      </div>
    </div>
    <article class="tile is-child is-12">
      <pagination :page-count="total" :current-page="page" :on-page-change="onPageChange"></pagination>
    </article>
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
import UserDetail from 'admin/components/user'

export default {
  data: function() {
    return {
      keyword: "",
      searching: false,
      loading: false,
      initing: true,
      users: [],
      page: 1,
      total: 1,
      recordsPerPage: 20,
    }
  },

  mounted: async function() {
    await this.searchUsers(1)
    this.initing = false
  },

  methods: {
    onPageChange: async function(page) {
      await this.searchUsers(page)
    },

    onSearchBoxSubmit: async function() {
      await this.searchUsers(1)
    },

    searchUsers: async function(page) {
      this.searching = true
      let result = await this.$acs.searchUsers({
        keyword: this.keyword,
        page: page,
        records_per_page: this.recordsPerPage
      })
      if (result.success) {
        this.total = result.total
        this.users = result.users
        this.page = page
      }
      this.searching = false
    },
    showDetail: function(user_id) {
      UserDetail.show(user_id)
    },
  },

  components: {
    Pagination,
    Tooltip,
    UserDetail
  }
}
</script>
<style lang="scss">
.users-page {
  .el-table__expanded-cell {
    padding: 5px;
  }
}

.control {
  padding-bottom: 1rem;
}

.table {
  tbody {
    td {
      vertical-align: middle;
    }
  }
}
</style>