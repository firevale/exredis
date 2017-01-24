<template>
  <div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
    <div class="modal-background" @click="cancel"></div>
    <div class="modal-card" style="max-width: 100vw;width: 85%;">
      <section class="modal-card-body" style="border-radius: 1rem;width: 100%;margin: 0 auto;padding: 0;">
        <note-item-detail :item-data="item" @img-delete="deleteImgInPreview" :preView="true"></note-item-detail>
      </section>
    </div>
  </div>
</template>
<script>
  import noteItemDetail from "../noteItemDetail"

  export default {
    props: {
      visible: Boolean,
      transition: {
        type: String,
        default: 'fade'
      },
      item: {
        type: Object,
      },

      deleteImgFunc: {
        type: Function,
        required: true,
      }
    },

    mounted() {
      document.body.appendChild(this.$el)
    },

    watch: {
      visible(val) {
        this.show = val
      }
    },

    data: function () {
      return {

      }
    },

    compiled: function () {
      this.modal = this.$refs.modal
    },

    methods: {
      cancel() {
        this.visible = false
        if (typeof this.onCancel == 'function') {
          this.onCancel()
        }
      },

      deleteImgInPreview(item){
        if(typeof this.deleteImgFunc == 'function'){
          this.deleteImgFunc(item.id)
        }
      }
    },

    components: {
      noteItemDetail
    }
  }
</script>