<template>
  <div class="users-page">
    <div class="control has-icon has-icon-left">
      <input type="text" class="input" @keyup.enter="onSearchBoxSubmit" :placeholder="$t('admin.titles.searchWcsUsers')" v-model="keyword">
      <span class="icon is-small">
        <i v-if="searching" class="fa fa-spinner fa-spin"></i>
        <i v-else class="fa fa-search"></i>
      </span>
    </div>
    <div class="box" v-if="!initing && users.length > 0">
      <div class="columns is-multiline">
        <div class="column is-6" v-for="user in users" :key="user.id">
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="user.avatar_url || ('/images/default_avatar.png' | imageStaticUrl)" alt="user avatar">
                </figure>
              </div>
              <div class="media-content">
                <nav class="level is-mobile" style="margin-bottom: 0.25rem">
                  <div class="level-left">
                    <span class="level-item">
                      <strong>{{user.openid}}</strong>
                    </span>
                  </div>
                  <div class="level-right">
                    <router-link class="level-item" :to="{name: 'PointLog', params: {appId: $route.params.appId, keyword: user.openid}}">
                      <tooltip :label="$t('admin.routes.PointLog')" placement="top">
                        <span class="icon is-small is-primary" style="cursor: pointer"><i class="fa fa-bars"></i></span>
                      </tooltip>
                    </router-link>
                    <span class="level-item">
                      <tooltip :label="$t('admin.point.add')" placement="top">
                        <span class="icon is-small is-primary" style="cursor: pointer" @click="addPoint(user.id, user.nickname)"><i class="fa fa-plus"></i></span>
                      </tooltip>
                    </span>
                  </div>
                </nav>
                <div class="content">
                  <span>昵称:&nbsp<small>{{user.nickname}}</small><br/></span>
                  <span>积分:&nbsp<small>{{user.point}}</small><br/></span>
                  <span v-show="user.city">城市:&nbsp<small>{{user.city}}</small><br/></span>
                  <span v-show="user.user_id">平台用户ID:&nbsp<small>{{user.user_id}}</small><br/></span>
                  <span>加入时间: <small><timeago :since="user.inserted_at | convertServerDateTime" :auto-update="60"></timeago></small></span>
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
import Vue from 'vue'
import {
  i18n
} from 'admin/vue-i18n'
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

import pointDialog from 'admin/components/dialog/app/addPoint'

const pointDialogComponent = Vue.extend(pointDialog)
const openPointDialog = (propsData = {
  visible: true
}) => {
  return new pointDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

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
      let result = await this.$acs.listWcsUsers({
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
    addPoint: function(wcs_user_id, nickname) {
      openPointDialog({
        pointLog: {
          id: 0,
          log_type: 'admin_op',
          memo: '',
          point: 0,
          wcs_user_id: wcs_user_id,
          nickname: nickname,
        },
        visible: true,
        callback: log => {
          this.page = 1
          this.keyword = ''
          this.searchUsers(this.page)
        },
      })
    },
  },

  components: {
    Pagination,
    Tooltip
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