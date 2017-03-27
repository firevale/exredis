<template>
<div class="tile is-ancestor is-vertical root-container">
    <div class="columns is-multiline">
      <article class="tile is-child notification" v-for="forum in forumList" @click.prevent="showForum(forum.id)">
        <div class="tile is-parent" >
          <div class="tile is-vertical is-child">
            <img :src="forum.icon ? forum.icon : 'https://placehold.it/64x64?text=128x128'"></img>
            <h2 style="font-weight: bold"> {{forum.title}} </h2>
          </div>
        </div>
      </article>
    </div>
</div>
</template>
<script>
import Vue from '../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as acs from 'common/acs'

export default {
  mounted: async function() {
    await this.getForumList()
  },

  data: function() {
    return {
      inApp: window.acsConfig.inApp,
      canGoBack: false,
      processing: false,
      forumList: [],
    }
  },

  methods: {
    getForumList: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.getPagedForums()
        if (result.success) {
          this.forumList = result.forums
        }
        this.processing = false
      }
    },

    onBtnBackClicked: function() {
      if (this.canGoBack) {
        this.$router.back()
      } else if (this.inApp) {
        nativeApi.closeWebviewWithResult({
          success: false
        })
      }
    },

    showForum: function(forum_id) {
      this.$router.push({
        name: "postList",
        params: {
          forumId: forum_id
        },
      })
    }
  },

  watch: {
    '$route' (to, from) {
      this.canGoBack = (history.state != null)
    }
  },
}
</script>