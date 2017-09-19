<template>
  <div class="box">
    <basic-info-editor v-if="app" :app="app"></basic-info-editor>
  </div>
</template>

<script>
  import basicInfoEditor from 'admin/views/app/config/basicInfoEditor'

  export default {
    data() {
      return {
        app: {
          name: '',
          currency: 'CNY',
          payment_callback: 'https://',
          chaoxin_group_id: '',
          token_ttl: 604800,
          forum_name: '',
          forum_url: '',
        },
      }
    },

    components: {
      basicInfoEditor,
    }
  }
</script>