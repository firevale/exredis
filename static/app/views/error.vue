<template>
<div class="tile is-ancestor is-vertical root-container">
  <div class="tile is-child is-full stay-top title-bar has-text-centered has-bottom-thick-line">
    <span class="icon nav-icon pull-right icon-close " @click="onClose"></span>
    <h4 class="title is-4" style="font-weight: 400">{{$t('forum.error.pageTitle')}}</h4>
  </div>
</div>
</template>

<script>
import Vue from '../vue-installed'
import {
  mapGetters,
  mapActions
} from 'vuex'

import nativeApi from 'common/js/nativeApi'

export default {
  data: function() {
    return {}
  },

  methods: {
    onClose: function() {
      nativeApi.closeWebviewWithResult({
        success: false
      })
    },
  },
}
</script>
