<template>
  <div class="box">
    <!-- <router-link class="button is-primary pull-right" style="position: absolute; top: 20px; right: 20px;" :to="{name: 'NewForum'}">
      <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{ $t('admin.forum.add') }}
    </router-link> -->
    <div class="columns is-multiline">
      <article class="column is-3" v-for="mall in mallList">
        <div class="tile is-parent">
          <figure class="image is-64x64 app-icon" @click.prevent="updateMallIcon(mall)">
            <img :src="mall.icon ? mall.icon : 'https://placehold.it/64x64?text=128x128'"></img>
          </figure>
          <div class="tile is-vertical is-child" style="padding-left: 5px;">
            <h3 style="font-weight: bold"> {{mall.title}} </h3>
            <router-link class="button is-small is-outlined" style="margin-top: 15px" :to="{name: 'EditMall', params: {appId: mall.app_id}}">
              <span class="icon is-small"><i class="fa fa-search"></i></span>
              <span> {{ $t('admin.routes.Malls') }} </span>
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

  export default {
    computed: {
      ...mapGetters([
        'mallList'
      ]),
    },

    methods: {
      updateMallIcon: function(mall) {
        showFileUploadDialog({
          postAction: '/admin_actions/update_mall_icon',
          accept: 'image/png',
          data: {
            mall_id: mall.id,
          },
          extensions: ['png'],
          title: this.$t('admin.titles.uploadMallIcon', {mallName: mall.title}),
          callback: response => mall.icon = response.icon_url,
        })
      },
    }
  }
</script>
