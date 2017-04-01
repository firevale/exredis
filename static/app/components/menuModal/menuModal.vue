<template>
<div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
  <div class="modal-background" @click="cancel"></div>
  <div class="modal-card">
    <section class="modal-card-body modal-menu">
      <div v-for="item in menuItems" class="level is-mobile modal-menu-item has-bottom-line" @click="ok(item)">
        <div class="level-item level-left has-text-left">
          <h5 class="title is-4" :class="selectedValue == item.value ? 'active': ''" style="font-weight: 400; margin-left: 1rem">{{item.title}}</h5>
        </div>
        <div class="level-item level-right has-text-right">
          <span v-show="selectedValue == item.value" class="icon image-icon icon-check" style="margin-right: 1rem"></span>
        </div>
      </div>
    </section>
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

    menuItems: {
      default: []
    },

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
