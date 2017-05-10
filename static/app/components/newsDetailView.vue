<template>
  <div class="content is-large">
    <div class="has-text-centered" style="padding-top: 1rem;">
      <h4 class="title is-4" style="margin-bottom: 0">{{ itemData.title }}</h4>
    </div>
    <quill-content class="subtitle is-5" style='line-height:150%;' :content="itemData.content">
    </quill-content>
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
}
</script>