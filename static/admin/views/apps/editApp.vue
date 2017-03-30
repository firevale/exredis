<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.app.basicInfo')">
        <basic-info-editor v-if="app" :app="app"></basic-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.app.sdkInfo')">
        <sdk-info-editor v-if="app" :app="app"></sdk-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-shopping-cart" :label="$t('admin.app.goodsInfo')">
        <goods-info-editor v-if="app" :app="app"></goods-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-joomla" :label="$t('admin.news.activityInfo')">
        <activity-info-editor v-if="app" :app="app"></activity-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-bullhorn" :label="$t('admin.news.noticeInfo')">
        <notice-info-editor v-if="app" :app="app"></notice-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-newspaper-o" :label="$t('admin.news.newsInfo')">
        <news-info-editor v-if="app" :app="app"></news-info-editor>
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
  import goodsInfoEditor from 'admin/components/app/goodsInfoEditor'
  import activityInfoEditor from 'admin/components/news/activityInfoEditor'
  import noticeInfoEditor from 'admin/components/news/noticeInfoEditor'
  import newsInfoEditor from 'admin/components/news/newsInfoEditor'  

  export default {
    mounted() {
      let app = this.appHash[this.$route.params.appId]

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
        'appHash', 'sdks'
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
      goodsInfoEditor,
      activityInfoEditor,
      noticeInfoEditor,
      newsInfoEditor,      
    }
  }
</script>