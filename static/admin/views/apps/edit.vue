<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.app.basicInfo')">
        <basic-info-editor v-if="app" :app="app"></basic-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-apple" :label="$t('admin.app.sdkInfo')">
        <sdk-info-editor v-if="app" :app="app"></sdk-info-editor>
      </tab-pane>
    </tabs>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import {
    Tabs,
    TabPane
  } from 'vue-bulma-tabs'

  import basicInfoEditor from 'admin/components/app/basicInfoEditor'
  import sdkInfoEditor from 'admin/components/app/sdkInfoEditor'

  export default {
    created() {},

    mounted() {
      let app = this.apps[this.$route.params.appId]

      if (typeof app == 'undefined') {
        this.$router.replace({
          name: 'AppManage'
        })
      } else {
        this.app = app
      }
    },

    data() {
      return {
        app: {},
      }
    },

    computed: {
      ...mapGetters([
        'apps', 'sdks'
      ]),
    },

    methods: {
      ...mapActions([
        'fetchPlatformApp'
      ]),
    },

    components: {
      Tabs,
      TabPane,
      basicInfoEditor,
      sdkInfoEditor,
    }
  }
</script>