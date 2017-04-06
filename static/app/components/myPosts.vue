<template>
  <article class="content-item">
    <div class="title-line" @click="showDetail">
      <h5 class="title is-5">[{{ itemData.section.title }}] {{ itemData.title | filterKeyword}}</h5>
      <a v-show="!itemData.newComment" class="tag is-outlined">{{ $t('forum.personal.newComment') }}</a>
    </div>
    <div class="level is-mobile">
      <div class="level-left level-item">
        <span class="subtitle">{{ itemData.inserted_at | formatServerDateTime }}</span>
        <span class="subtitle" style="margin:0 1em">|</span>
        <span class="subtitle">{{ itemData.comms + '/' + itemData.reads }}</span>
      </div>
      <div class="level-right level-item">
        <span class="icon image-icon icon-trash is-small" @click.prevent="confirmDeletePost"></span>
        <span class="is-danger" @click.prevent="confirmDeletePost"> {{ $t('forum.personal.deleteBtn') }}</span>
      </div>
    </div>
    <div/>
  </article>
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
    showDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.id
        },
      })
    },

    confirmDeletePost() {
      AlertDialog.show({
        message: this.$t('forum.detail.deletePostTip'),
        onOk: async _ => {
          let result = await this.$acs.togglePostStatus({
            post_id: this.itemData.id,
            active: false
          })
          if (result.success) {
            Toast.show(this.$t(result.i18n_message))
            if (this.onItemDeleted) {
              this.onItemDeleted(this.itemIndex)
            }
          }
        },
        onCancel: null,
      })
    },

  },
}
</script>