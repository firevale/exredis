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

        <label class="label"> {{ $t('admin.news.pic') }}: </label>
        <p class="control">
          <figure class="image is-172x70 news-pic" @click="updateNewsPic(news)">
            <img :src="news.pic ? news.pic: 'https://placehold.it/172x70?text=860X350'"></img>
          </figure>
        </p>        

        <label class="label"> {{ $t('admin.news.content') }}: </label>
        <p class="control">
          <textarea class="textarea" style="height:120px" v-model.trim="news.content"></textarea>
        </p>

        <p class="control">
          <label class="checkbox">
            <input class="checkbox" type="checkbox"  v-model.trim="section.active">
            {{ $t('admin.forum.section.active') }}
          </label>
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
    showFileUploadDialog
  } from '../fileUpload'

  import {
    showMessageBox
  } from '../messageBox'

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
      section: Object,
      callback: Function,
    },

    data() {
      return {
        processing: false,
      }
    },

    methods: {
      updateNewsPic: function(news) {
        showFileUploadDialog({
          postAction: '/admin_actions/update_news_pic',
          accept: 'image/png',
          data: {
            news_id: this.news.id
          },
          extensions: ['png'],
          title: this.$t('admin.titles.uploadNewsPic'),
          callback: response => news.pic = response.pic,
        })
      },

      handleSubmit() {
        this.processing = true
        if(!this.section.id) this.section.id=0
        this.$http.post('/admin_actions/update_section_info', {
            section: this.section,
          })
          .then(response => response.json())
          .then(result => {
            this.processing = false
            if (result.success) {
              openNotification({
                title: this.$t('admin.titles.updateSuccess'),
                message: this.$t('admin.messages.sectionInfoUpdated', {
                  sectionTitle: result.section.title
                }),
                type: 'success',
                duration: 4500,
                container: '.notifications',
              })

              if (this.callback) {
                this.callback(result.section)
              }
              this.visible = false
            } else {
              return Promise.reject(result)
            }
          })
          .catch(e => {
            this.processing = false
            this.visible = false

            processAjaxError(e)
          })
      }
    },

    components: {
      Modal,
    },
  }
</script>
