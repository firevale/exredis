<template>
  <div class="box">
    <router-link class="button is-primary pull-right" style="position: absolute; top: 20px; right: 20px;" :to="{name: 'NewApp'}">
      <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{ $t('admin.app.add') }}
    </router-link>
    <div class="columns is-multiline">
      <article class="column is-3" v-for="app in appList">
        <div class="tile is-parent">
          <figure class="image is-64x64 app-icon" @click.prevent="updateAppIcon(app)">
            <img :src="app.icon ? app.icon : 'https://placehold.it/64x64?text=128x128'"></img>
          </figure>
          <div class="tile is-vertical is-child" style="padding-left: 5px;">
            <h3 style="font-weight: bold"> {{app.name}} </h3>
            <router-link class="button is-small is-outlined" style="margin-top: 15px" :to="{name: 'EditApp', params: {appId: app.id}}">
              <span class="icon is-small"><i class="fa fa-search"></i></span>
              <span> {{ $t('admin.showDetail') }} </span>
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
  showFileUploadDialog
} from 'common/components/fileUpload'

import {
  openNotification,
  processAjaxError,
} from 'admin/miscellaneous'

export default {
  computed: {
    ...mapGetters([
      'appList'
    ]),
  },

  methods: {
    updateAppIcon: function(app) {
      showFileUploadDialog({
        postAction: '/admin_actions/update_app_icon',
        accept: 'image/png',
        data: {
          app_id: app.id,
        },
        extensions: ['png'],
        title: this.$t('admin.titles.uploadAppIcon', {
          appName: app.name
        }),
        imageValidator: {
          square: true,
          minWidth: 128,
        },
        callback: response => {
          if (response.success) {
            app.icon = response.icon_url
            openNotification({
              title: this.$t('admin.titles.updateSuccess'),
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
    },
  }
}
</script>