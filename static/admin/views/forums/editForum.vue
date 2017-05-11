<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.forum.basicInfo')">
        <basic-info-editor v-if="forum" :forum="forum"></basic-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-support" :label="$t('admin.forum.sectionInfo')">
        <section-info-editor v-if="forum" :forum="forum"></section-info-editor>
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

import basicInfoEditor from 'admin/components/forum/basicInfoEditor'
import sectionInfoEditor from 'admin/components/forum/sectionInfoEditor'

export default {
  mounted() {
    let forum = this.forumHash[this.$route.params.appId]

    if (typeof forum == 'undefined') {
      this.$router.replace({
        name: 'Forums'
      })
    } else {
      this.forum = forum
    }
  },

  data() {
    return {
      forum: {},
    }
  },

  computed: {
    ...mapGetters([
      'forumHash'
    ]),
  },

  components: {
    Tabs,
    TabPane,
    basicInfoEditor,
    sectionInfoEditor,
  }
}
</script>