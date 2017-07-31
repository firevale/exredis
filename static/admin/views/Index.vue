<template>
  <div class="box">
    <router-link v-if="this.adminLevel == 1" class="button is-primary pull-right" style="position: absolute; top: 20px; right: 20px;"
      :to="{name: 'NewApp'}">
      <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{ $t('admin.app.add')
      }}
    </router-link>
    <div class="columns is-multiline">
      <article class="column is-3" v-for="app in appList" :key="app.id">
        <div class="tile is-parent">
          <figure class="image is-64x64 app-icon" @click.prevent="updateAppIcon(app)">
            <img :src="app.icon ? app.icon : 'https://placehold.it/64x64?text=128x128'"></img>
          </figure>
          <div class="tile is-vertical is-child" style="padding-left: 5px;">
            <h3 style="font-weight: bold"> {{app.name}} </h3>
            <router-link class="button is-small is-outlined" style="margin-top: 15px" :to="{name: 'AppDashboard', params: {appId: app.id}}">
              <span class="icon is-small"><i class="fa fa-search"></i></span>
              <span> {{ $t('admin.enterManage') }} </span>
            </router-link>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  showImageUploadDialog
} from 'common/components/imageUpload'

import {
  openNotification,
  processAjaxError,
} from 'admin/miscellaneous'

export default {
  data() {
    return {
      appList: undefined
    }
  },

  created: async function() {
    let result = await this.$acs.fetchAppList()
    if (result.success) {
      this.appList = result.apps
    }
  },

  computed: {
    ...mapGetters([
      'adminLevel'
    ]),
  },

  methods: {
    updateAppIcon: function(app) {
      if (this.adminLevel < 3) {
        showImageUploadDialog(this.$i18n, {
          postAction: '/admin_actions/app/update_app_icon',
          width: 128,
          height: 128,
          data: {
            app_id: app.id,
          },
          headers: {
            'x-csrf-token': window.acsConfig.csrfToken
          },
          title: this.$t('admin.titles.uploadAppIcon', {
            appName: app.name
          }),
          callback: response => {
            if (response.success) {
              app.icon = response.icon_url
              openNotification({
                title: this.$t('admin.notification.title.success'),
                message: this.$t('admin.app.message.appIconUpdated', {
                  appName: app.name
                }),
                type: 'success',
                duration: 4500,
                container: '.notifications',
              })
            } else {
              processAjaxError(response)
            }
          },
        })
      }
    },
  }
}
</script>