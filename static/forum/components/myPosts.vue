<template>
  <div class="my-posts-list-item row-line">
    <div style="flex: 1;text-align: left;">
      <div @click="showDetail">
        <span class="post-title">[{{ itemData.section.title }}] {{ itemData.title }}</span>
        <a v-show="itemData.newComment" class="button excellent-btn">{{ $t('forum.personal.newComment') }}</a>
      </div>
      <div class="post-info">
        <span>{{ itemData.inserted_at | formatServerDateTime }}</span>
        <span> | </span>
        <span>{{ itemData.comms + '/' + itemData.reads }}</span>
      </div>
    </div>
    <div>
      <span class="button" @click.prevent="confirmDeletePost">{{ $t('forum.personal.deleteBtn') }}</span>
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
            postId: this.itemData.id
          },
        })
      },

      confirmDeletePost() {
        AlertDialog.showModal({
          message: this.$t('forum.detail.deletePostTip'),
          onOk: async _ => {
            let result = await this.$acs.togglePostStatus({
              post_id: this.itemData.id,
              active: false
            })
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
