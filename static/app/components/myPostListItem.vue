<template>
  <div class="content-item has-bottom-line">
    <div class="level is-mobile">
      <v-touch class="level-left level-item is-clickable" @tap="showDetail">
        <div class="tile is-vertical">
          <div class="tile">
            <h5 class="title is-5">[{{ itemData.section.title }}] {{ itemData.title | filterKeyword}}</h5>
            <a v-show="itemData.newComment" class="tag is-outlined">{{ $t('forum.personal.newComment') }}</a>
          </div>
          <div class="tile">
            <span class="subtitle">{{ itemData.inserted_at | formatServerDateTime }}</span>
            <span class="subtitle" style="margin: 0 1rem">|</span>
            <span class="subtitle">{{ itemData.comms + '/' + itemData.reads }}</span>
          </div>
        </div>
      </v-touch>
      <v-touch v-if="isManager && !itemData.active" class="level-right level-item is-narrow is-clickable" tag="div" style="height:4rem">
        <span class="icon image-icon icon-lock is-small"></span>
        <span class="is-danger" style="margin-left:0.25rem" @click.prevent="confirmDeArchivePost"> {{ $t('forum.detail.openPost')}}</span>
      </v-touch>
      <v-touch v-else class="level-right level-item is-narrow is-clickable" tag="div" style="height:4rem">
        <span class="icon image-icon icon-trash is-small"></span>
        <span class="is-danger" @click.prevent="confirmDeletePost"> {{ $t('forum.personal.deleteBtn') }}</span>
      </v-touch>
    </div>
  </div>
</template>
<script>
import AlertDialog from 'common/components/alertDialog'
import Toast from 'common/components/toast'

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
    isManager() {
      return window.acsConfig.isAdmin == true
    }
  },

  methods: {
    showDetail(e) {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.id
        },
      })
    },

    confirmDeletePost(e) {
      AlertDialog.show({
        visible: true,
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        message: this.$t('common.confirmDelete'),
        onOk: async _ => {
          let result = await this.$acs.togglePostStatus({
            forum_id: this.$route.params.forumId,
            post_id: this.itemData.id,
            active: false
          })
          if (result.success) {
            Toast.show(this.$t(result.i18n_message))
            this.$emit('item-deleted', 'myPost', this.itemIndex)
          }
        },
        onCancel: null,
      })
    },

    confirmDeArchivePost(e) {
      AlertDialog.show({
        visible: true,
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        message: this.$t('forum.personal.confirmDeArchive'),
        onOk: async _ => {
          let result = await this.$acs.togglePostStatus({
            forum_id: this.$route.params.forumId,
            post_id: this.itemData.id,
            active: true
          })
          if (result.success) {
            Toast.show(this.$t(result.i18n_message))
            this.$emit('item-deleted', 'banPost', this.itemIndex)
          }
        },
        onCancel: null,
      })
    }

  },
}
</script>