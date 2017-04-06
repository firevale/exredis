<template>
<div class="content-item">
  <div  class="title-line" @click="showDetail">
      <h5 class="title is-5">[{{ itemData.post.section.title }}] {{ itemData.post.title | filterKeyword }}</h5>
  </div>
      <div class="level is-mobile">
         <div class="level-left level-item">
           <span class="subtitle">{{ itemData.post.inserted_at | formatServerDateTime }}</span>
           <span class="subtitle" style="margin:0 1em">|</span>
           <span class="subtitle">{{ itemData.post.comms + '/' + itemData.post.reads }}</span>
         </div>
         <div class="level-right level-item">
            <span class="icon image-icon icon-trash is-small" @click.prevent="confirmDeletePost"></span>
            <span class="is-danger" @click.prevent="confirmDeleteFavorite"> {{ $t('forum.personal.cancelFavor') }}</span>
         </div>
      </div>
       <div/>
</div>
</template>
<script>
import AlertDialog from './alertDialog'
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
      AlertDialog.showModal({
        message: this.$t('forum.writeComment.deleteTip'),
        onOk: async _ => {
          let result = await this.$acs.togglePostFavorite(this.itemData.post.id)
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