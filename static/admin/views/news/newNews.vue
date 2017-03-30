<template>
  <div class="box">
    <basic-info-editor v-if="app" :app="app"></basic-info-editor>
  </div>
</template>

<script>
  import basicInfoEditor from 'admin/components/app/basicInfoEditor'

  export default {
    mounted() {

    },

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