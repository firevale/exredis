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
      <v-touch class="level-right level-item is-narrow is-clickable" @tap="confirmDeletePost">
        <span class="icon image-icon icon-trash is-small"></span>
        <span class="is-danger"> {{ $t('forum.personal.deleteBtn') }}</span>
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

  },
}
</script>