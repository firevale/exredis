<template>
  <div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
    <div class="modal-background" @click="cancel"></div>
    <div class="modal-content" :class="{'is-menu': menus.length>0}">
      <ul>
        <li v-for="menu in menus" @click="">{{menu}}</li>
      </ul>
      <template v-if="message">
        <p> {{message}}</p>
        <button class="modal-close" @click="cancel"></button>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    },

    transition: {
      type: String,
      default: 'fade'
    },

    menus: {
      default: []
    },
    message: '',
    onSelect: {
      type: Function,
      default: undefined
    },
  },

  mounted() {
    document.body.appendChild(this.$el)
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
    select(menuItem) {
      this.visible = false
      if (typeof this.onSelect == 'function') {
        this.onSelect(menuItem)
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