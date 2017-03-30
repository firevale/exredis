<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editActivityInfo') }}</h5>
      </div>
      <validation name="news" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.news.title') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="news.title">
        </p>     

        <label class="label"> {{ $t('admin.news.content') }}: </label>
        <p class="control">
          <textarea class="textarea" style="height:120px" v-model.trim="news.content"></textarea>
        </p>

        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
        </div>
      </validation>
    </div>
  </modal>
</template>

<script>
  import {
    Modal
  } from 'vue-bulma-modal'

  import {
    openNotification,
    processAjaxError
  } from 'admin/miscellaneous'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: true
      },
      news: Object,
      callback: Function,
    },

    data() {
      return {
        processing: false,
      }
    },

    methods: {
      handleSubmit: async function() {
        this.processing = true
        if(!this.news.id) this.news.id=0
          let result = this.$acs.addNews(this.news.app_id, this.news.title, this.news.content, "activity", false, "")
          this.processing = false
          if (result.success) {
              openNotification({
                title: this.$t('admin.titles.updateSuccess'),
                message: this.$t('admin.messages.sectionInfoUpdated'),
                type: 'success',
                duration: 4500,
                container: '.notifications',
              })

              if (this.callback) {
                this.callback(result.news)
              }
          }
      }
    },

    components: {
      Modal,
    },
  }
</script>
