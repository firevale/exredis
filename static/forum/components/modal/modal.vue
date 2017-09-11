<template>
  <div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
    <div class="modal-background" @click="cancel"></div>
    <div class="modal-content" :class="{'is-menu': menus.length>0}">
      <ul>
        <li v-for="menu in menus">{{menu}}</li>
      </ul>
      <template v-if="message">
        <p class="title"> {{message}}</p>
        <button class="modal-close" aria-label="close"></button>
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
    selectedValue: undefined,
    onOk: {
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
    ok(menuItem) {
      this.selectedValue = menuItem.value
      this.visible = false
      if (typeof this.onOk == 'function') {
        this.onOk(menuItem)
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