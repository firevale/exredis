<template>
<div class="has-bottom-line">
  <div class="columns " style="margin: 0;">
    <div style="padding: 1rem 0 1rem .5rem;">
      <figure class="image is-64x64" style="margin: auto;border-radius:50%;border: 1px solid;overflow: hidden;">
        <img v-if :src="itemData.user.avatar_url"></img>
      </figure>
      <div class="title is-6 has-text-centered" :class="{'red': itemIndex < 2 }">{{itemData.rank}}</div>
    </div>
    <div class="column is-10.5 ql-editor">
      <div class="column detail-info">
        <span class="note-time dark" style="font-size: .8rem;">{{ itemData.created_at | formatServerDateTime }}</span>
        <span class="note-author" style="font-size: .9rem;">{{ itemData.user.nickname }}</span>
        <span v-if="itemData.rank != $t('forum.detail.author') && !preview" class="note-delete" @click="confirmDeleteComment()"
          style="font-size: .9rem;">{{ $t('forum.detail.delete')}}</span>
      </div>
      <div ref="contentContainer" class="column" style="font-weight: bold;" v-html="itemData.content">
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import AlertDialog from './alertDialog'
import message from './message'

export default {
  props: {
    itemData: {
      type: Object,
      default: null,
    },
    itemIndex: {
      type: Number,
    },
    preview: {
      type: Boolean,
      default: false,
    },
    onItemDeleted: {
      type: Function,
      default: undefined
    }
  },

  methods: {
    confirmDeleteComment() {
      AlertDialog.showModal({
        message: this.$t('forum.detail.deleteTip'),
        onOk: async _ => {
          let result = await this.$acs.deleteComment(this.itemData.id)
          if (result.success) {
            message.showMsg(this.$t(result.i18n_message))
            if(this.onItemDeleted)
              this.onItemDeleted(this.itemIndex)
          }
        },
        onCancel: null,
      })
    },

  }
}
</script>
