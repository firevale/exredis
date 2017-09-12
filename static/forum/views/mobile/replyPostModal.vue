<template>
  <modal ref="modal" @deactive="deactive">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title title is-5 is-ellipsis">
          <strong>[综合讨论]</strong> 如何评价 LPL 夏季总决赛总决赛 EDG vs RNG 3:2 胜利？
        </p>
      </header>
      <section class="modal-card-body">
        <div class="field">
          <div class="control">
            <quill-editor class="editor" v-model.trim="content" placeholder="请填写帖子内容" @ready="setEditor">
            </quill-editor>
          </div>
          <p class="help is-primary">This username is available</p>
        </div>
      </section>
      <footer class="modal-card-foot is-centred">
        <a class="button is-grey is-medium" @click="deactive">
                取消
        </a>
        <a class="button is-primary is-medium">
                回帖
        </a>
      </footer>
    </div>
  </modal>
</template>
<script>
import {
  Modal
} from 'common/components/vue-bulma-modal'

export default {
  props: {

  },
  data() {
    return {
      content: '',
      editor: undefined,
    }
  },

  methods: {
    setEditor: function(editor) {
      this.editor = editor
    },
    show() {
      this.$refs.modal.active()
    },
    deactive() {
      this.$refs.modal.deactive()
    }
  },

  components: {
    Modal,
  },
}
</script>
<style lang="scss">
.ql-container {
  min-height: 20rem;
}
</style>