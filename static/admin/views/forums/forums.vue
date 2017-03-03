<template>
  <div class="box">
    <!-- <router-link class="button is-primary pull-right" style="position: absolute; top: 20px; right: 20px;" :to="{name: 'NewForum'}">
      <span class="icon is-small" style="margin-right: 5px;"><i class="fa fa-plus"></i></span>{{ $t('admin.forum.add') }}
    </router-link> -->
    <div class="columns is-multiline">
      <article class="column is-3" v-for="forum in forumList">
        <div class="tile is-parent">
          <figure class="image is-64x64 app-icon" @click.prevent="updateForumIcon(forum)">
            <img :src="forum.icon ? forum.icon : 'https://placehold.it/64x64?text=128x128'"></img>
          </figure>
          <div class="tile is-vertical is-child" style="padding-left: 5px;">
            <h3 style="font-weight: bold"> {{forum.title}} </h3>
            <router-link class="button is-small is-outlined" style="margin-top: 15px" :to="{path: '/forums/:forumId', params: {forumId: forum.id}}">
              <span class="icon is-small"><i class="fa fa-search"></i></span>
              <span> {{ $t('admin.forum.enterForum') }} </span>
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
  } from 'admin/components/dialog/fileUpload'

  export default {
    computed: {
      ...mapGetters([
        'forumList'
      ]),
    },

    methods: {
      updateForumIcon: function(forum) {
        showFileUploadDialog({
          postAction: '/admin_actions/update_forum_icon',
          accept: 'image/png',
          data: {
            forum_id: forum.id,
          },
          extensions: ['png'],
          title: this.$t('admin.titles.uploadForumIcon', {forumName: forum.title}),
          callback: response => forum.icon = response.icon_url,
        })
      },
    }
  }
</script>
