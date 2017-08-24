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
    <div class="tile is-ancestor" v-if="!initing && users.length > 0">
      <div class="tile is-parent is-vertical">
        <el-table class="tile is-child box is-paddingless" ref="tbl" stripe :data="users" style="width: 100%"
          :default-sort="{prop: 'inserted_at', order: 'descending'}">
          <el-table-column type="expand" class="is-paddingless">
            <template scope="scope">
              <el-table :data="scope.row.app_users" style="width: 100%">
                <el-table-column prop="game_user_id" label="游戏角色ID" width="200">
                </el-table-column>
                <el-table-column prop="game_user_name" label="角色名称" width="200">
                </el-table-column>
                <el-table-column>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column :label="$t('admin.user.fields.avatar')" width="80">
            <template scope="scope">
              <figure class="image is-48x48">
                <img :src="scope.row.avatar_url ? scope.row.avatar_url : 'https://placehold.it/48x48' | imageStaticUrl"></img>
              </figure>
            </template>
          </el-table-column>
          <el-table-column :label="$t('admin.user.fields.nickname')" width="200">
            <template scope="scope">
              {{ scope.row.nickname }} </template>
          </el-table-column>
          <el-table-column :label="$t('admin.user.fields.email')" width="200">
            <template scope="scope">
              {{ scope.row.email }}
            </template>
          </el-table-column>
          <el-table-column prop="mobile" :label="$t('admin.user.fields.mobile')" width="180">
          </el-table-column>
          <el-table-column :label="$t('admin.user.fields.gender')" width="100">
            <template scope="scope">
              {{ scope.row.gender =='male' ? $t('admin.user.gender.male') : $t('admin.user.gender.famale')  }}
            </template>
          </el-table-column>
          <el-table-column :label="$t('admin.user.fields.insertedAt')" prop="inserted_at" sortable="custom" width="180">
            <template scope="scope">
              <span style="font-family:'microsoft yahei', Tahoma, Geneva, Verdana, sans-serif"> {{ scope.row.inserted_at | formatServerDateTime }}</span>
            </template>
          </el-table-column>
          <el-table-column></el-table-column>
        </el-table>
        <div v-if="users && users.length > 0" class="tile ele-pagination">
          <el-pagination layout="prev, pager, next" :page-count="total" :current-page.sync="page" @current-change="onPageChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="box" v-else>
      <div class="hero-body has-text-centered">
        <div v-if="loading || initing">
          <span class="icon is-large">
            <i class="fa fa-spinner fa-spin"></i>
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
      page: 1,
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
      await this.searchUsers()
    },

    onSearchBoxSubmit: async function() {
      this.page = 1
      await this.searchUsers()
    },

    searchUsers: async function() {
      this.searching = true
      let result = await this.$acs.searchUsers({
        keyword: this.keyword,
        page: this.page,
        records_per_page: this.recordsPerPage
      })
      if (result.success) {
        this.total = result.total
        this.users = result.users
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