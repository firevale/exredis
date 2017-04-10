<template>
  <div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
    <div class="modal-background" @click="cancel"></div>
    <div class="modal-card" style="border-radius: 5px; width: 30%;min-width: 220px;">
      <section class="modal-card-body">
        <article class="media">
          <div class="media-content">
            <div class="content is-warning">
              <p style="text-align: center; font-size: 1.3rem;"> {{ message }}? </p>
            </div>
          </div>
        </article>
      </section>
      <footer class="modal-footer">
        <a class="button is-info" @click="cancel">{{ cancelText }}</a>
        <a class="button is-primary" @click="ok">{{ okText }}</a>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    transition: {
      type: String,
      default: 'fade'
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: '',
    },
    cancelText: {
      type: String,
      default: '',
    },
    onOk: {
      type: Function,
      default: null,
    }
  },

  mounted: function() {
    document.body.appendChild(this.$el)
    if (!this.okText) {
      this.okText = this.$t('common.ok') 
    }
    if (!this.cancelText) {
      this.cancelText = this.$t('common.cancel')
    }
  },

  watch: {
    visible(val) {
      this.show = val
    }
  },

  compiled: function() {
    this.modal = this.$refs.modal
  },

  methods: {
    ok() {
      this.visible = false

      if (typeof this.onOk == 'function') {
        this.onOk()
      }
    },

    cancel() {
      this.visible = false

      if (typeof this.onCancel == 'function') {
        this.onCancel()
      }
    }
  }
}
</script>