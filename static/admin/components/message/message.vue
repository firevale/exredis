<template>
<div v-if="visible" class="tip-message">
  <div class="body-message">
    {{message}}
  </div>
</div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },

  mounted() {
    document.body.appendChild(this.$el)
  },
}
</script>
