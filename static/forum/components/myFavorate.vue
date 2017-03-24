<template>
<div class="my-favorite-list-item row-line">
  <div style="flex: 1;text-align: left;">
    <div @click="showDetail">
      <span class="post-title">[{{ itemData.post.section.title }}] {{ itemData.post.title | filterKeyword }}</span>
    </div>
    <div class="post-info">
      <span>{{ itemData.post.inserted_at | formatServerDateTime }}</span>
      <span> | </span>
      <span>{{ itemData.post.comms + '/' + itemData.post.reads }}</span>
    </div>
  </div>
  <div>
    <span class="button" @click.prevent="confirmDeleteFavorite">{{ $t('forum.personal.cancelFavor') }}</span>
  </div>
</div>
</template>
<script>
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
    onItemDeleted: {
      type: Function,
      default: undefined
    }
  },

  computed: {

  },

  methods: {
    showDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.post.id
        },
      })
    },

    confirmDeleteFavorite() {
      AlertDialog.showModal({
        message: this.$t('forum.writeComment.deleteTip'),
        onOk: async _ => {
          let result = await this.$acs.togglePostFavorite(this.itemData.post.id)
          if (result.success) {
            message.showMsg(this.$t(result.i18n_message))
            if (this.onItemDeleted)
              this.onItemDeleted(this.itemIndex)
          }
        },
        onCancel: null,
      })
    },

  },
}
</script>
