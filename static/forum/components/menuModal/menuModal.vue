<template>
<div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
  <div class="modal-background" @click="cancel"></div>
  <div class="modal-card">
    <section class="modal-card-body" style="border-radius: 3px;">
      <article class="media">
        <div class="media-content">
          <div v-for="item in menuItems" class="columns modal-item pointer" @click="ok(item)">
            <span class="column item-name" :class="{'olive': selectedValue == item.value}"> {{ item.title }} </span>
            <span v-show="selectedValue == item.value" class="fa fa-check item-check" aria-hidden="true" style="font-size: 2rem;color: red; vertical-align: middle;padding: 10px;"></span>
          </div>
        </div>
      </article>
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
