<template>
  <div class="content-item has-bottom-line">
    <div class="level is-mobile">
      <v-touch class="level-left level-item is-clickable" @tap="showDetail">
        <div class="tile is-vertical">
          <div class="tile">
            <h5 class="title is-5">[{{ itemData.post.section.title }}] {{ itemData.post.title | filterKeyword }}</h5>
          </div>
          <div class="tile" style="font-size:1.1rem">
            <span class="subtitle">{{ itemData.post.inserted_at | formatServerDateTime }}</span>
            <span class="subtitle" style="margin: 0 1rem">|</span>
            <span class="subtitle">{{ itemData.post.comms + '/' + itemData.post.reads }}</span>
          </div>
        </div>
      </v-touch>
      <v-touch class="level-right level-item is-narrow is-clickable" >
        <span class="icon image-icon icon-trash is-small"></span>
        <span class="is-danger" @click.prevent="confirmDeleteFavorite"> {{ $t('forum.personal.cancelFavor') }}</span>
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
    showDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.post.id
        },
      })
    },

    confirmDeleteFavorite() {
      AlertDialog.show({
        visible: true,
        okText: this.$t('common.ok'),
        cancelText: this.$t('common.cancel'),
        message: this.$t('common.confirmDelete'),
        onOk: async _ => {
          let result = await this.$acs.togglePostFavorite(this.itemData.post.id)
          if (result.success) {
            Toast.show(this.$t(result.i18n_message, result.i18n_message_object))
            this.$emit('item-deleted', 'myFavorite', this.itemIndex)
          }
        },
        onCancel: null,
      })
    },

  },
}
</script>