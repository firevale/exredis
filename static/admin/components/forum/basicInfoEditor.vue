<template>
  <form name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-12">
        <label class="label"> {{ $t('admin.label.forumTitle')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="forum.title">
        </p>
      </div>
    </div>
    <div class="has-text-centered" style="margin-top: 15px">
      <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
    </div>
  </form>
</template>
<script>
import axios from 'axios'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  props: {
    forum: Object,
  },

  data() {
    return {
      processing: false,
      states: ['TRUE', 'FALSE']
    }
  },

  methods: {
    ...mapActions([
      'addForum',
      'setApp'
    ]),

    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateForumInfo({
        forum: this.forum
      }, this.$t('admin.notification.message.forumInfoUpdated', {
        forumName: this.forum.title
      }))
      if (result.success) {
        axios.post('/admin_actions/fetch_app', {
            app_id: this.forum.app_id
          })
          .then(response => response.data)
          .then(result => {
            if (result.success) {
              this.setApp(result.app)
            }
          })
      }
      this.processing = false
      if (result.forum) {
        this.addForum(result.forum)
        this.$nextTick(_ => {
          this.$router.replace({
            path: '/admin/forums/edit/${result.forum.id}'
          })
        })
      }
    },
  },

}
</script>