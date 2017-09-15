<template>
  <div>
    <template v-if="app && app.has_forum">
      <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
        <tab-pane icon="fa fa-clone" :label="$t('admin.forum.basicInfo')">
          <basic-info-editor v-if="forum" :forum="forum"></basic-info-editor>
        </tab-pane>
        <tab-pane icon="fa fa-support" :label="$t('admin.forum.sectionInfo')">
          <section-info-editor v-if="forum" :forum="forum"></section-info-editor>
        </tab-pane>
      </tabs>
    </template>
    <template v-else>
      <p>
        {{ $t('admin.forum.not_open') }}
      </p>
    </template>
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
    this.fetchAppForum()
  },

  data() {
    return {
      forum: {},
    }
  },

  watch: {
    app: function(newVal) {
      if (typeof newVal === 'object' && newVal.has_forum) {
        this.fetchAppForum()
      }
    }
  },

  computed: {
    ...mapGetters([
      'app'
    ]),
  },

  methods: {
    fetchAppForum: async function() {
      if (this.app && this.app.has_forum) {
        let result = await this.$acs.fetchAppForum({
          app_id: this.app.id
        })

        if (result.success) {
          this.forum = result.forum
        }
      }
    }
  },

  components: {
    Tabs,
    TabPane,
    basicInfoEditor,
    sectionInfoEditor,
  }
}
</script>