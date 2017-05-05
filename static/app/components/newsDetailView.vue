<template>
  <div class="content is-large" style="padding: 3rem; margin: 2rem; border: 2px solid #bababa;">
    <div class="has-text-centered" style="padding: 1rem;">
      <h4 class="title is-4">{{ itemData.title }}</h4>
    </div>
    <quill-content class="subtitle is-5" style='line-height:150%;' :content="itemData.content">
    </quill-content>
    <div class="has-text-centered" style="padding: 2rem;">
      <a class="button is-primary is-large" @click.prevent="goBack()">{{ $t('games.buttons.back') }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: null,
    },
  },

  methods: {
    goBack() {
      this.$emit('goBack')
    },
  }
}
</script>