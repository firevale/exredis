<template>
  <validation name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-4" >
        <label class="label"> {{ $t('admin.label.forumId')}}: {{forum.id}} </label>
      </div>
      <div class="column is-4">
        <label class="label"> {{ $t('admin.label.forumCreatedAt')}}: {{forum.inserted_at | formatServerDateTime}} </label>
      </div>
      <div class="column is-8" >
        <label class="label"> {{ $t('admin.label.forumAppId')}}: </label>
        <p class="control">
          <input class="input is-disabled" type="text" v-model.trim="forum.app_id">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.forumTitle')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="forum.title">
        </p>
      </div>
      <div class="column is-8">
        <p class="control">
          <label class="checkbox">
            <input class="checkbox" type="checkbox"  v-model.trim="forum.active">
            {{ $t('admin.label.forumActive')}}
          </label>
        </p>
      </div>
    </div>
    <div class="container has-text-centered" style="margin-top: 15px">
      <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
    </div>
  </validation>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import Vue from 'admin/vue-i18n'

  import {
    openNotification,
    processAjaxError,
  } from 'admin/miscellaneous'

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
        'addForum'
      ]),

      handleSubmit: function() {
        this.processing = true
        this.$http.post('/admin_actions/update_forum_info', {
            forum: this.forum
          })
          .then(response => response.json())
          .then(result => {
            this.processing = false
            if (result.success) {
              openNotification({
                title: this.$t('admin.notification.title.success'),
                message: this.$t('admin.notification.message.forumInfoUpdated', {
                  forumName: this.forum.title
                }),
                type: 'success',
                duration: 4500,
                container: '.notifications',
              })

              if (result.forum) {
                this.addForum(result.forum)
                this.$nextTick(_ => {
                  this.$router.replace({
                    path: `/admin/forums/edit/${result.forum.id}`
                  })
                })
              }
            } else {
              return Promise.reject(result.message)
            }
          })
          .catch(e => {
            this.processing = false
            processAjaxError(e)
          })
      },
    },

  }
</script>
