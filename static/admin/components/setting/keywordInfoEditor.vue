<template>
  <validation name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">

      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.keyword')}}: </label>
        <p class="control">
          <textarea class="textarea" style="height:500px" placeholder="请输入敏感词，以小写“,”分隔" v-model="keyword"></textarea>
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

import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import Vue from 'admin/vue-i18n'
import Tooltip from 'vue-bulma-tooltip'

export default {
  mounted: function() {
    this.getKeyword()
  },

  data() {
    return {
      keyword: "",
      processing: false,
    }
  },

  methods: {
    getKeyword: function() {
      this.processing = true
      this.$http.post('/admin_actions/get_setting', {
          setting_name: "keyword"
        }).then(res => res.json())
        .then(result => {
          this.processing = false
          if (result.success) {
            this.keyword = result.setting.value
          } 
        }).catch(e => {
          this.processing = false
          processAjaxError(e)
        })
    },

    handleSubmit: function() {
      if (this.keyword.trim().length == 0) {
        alert("请输入关键字")
        return
      }
      this.processing = true
      this.$http.post('/admin_actions/update_setting_by_name', {
        setting_name: "keyword",
        setting_value: this.keyword.trim(),
        group: "keyword",
        memo: '网站敏感词过滤',
        active: true
      }).then(res => res.json())
      .then(result => {
        this.processing = false
        if (result.success) {
          openNotification({
            title: this.$t('admin.notification.title.success'),
            message: this.$t(result.i18n_message),
            type: 'success',
            duration: 4500,
            container: '.notifications',
          })
        } else {
          return Promise.reject(result)
        }
      }).catch(e => {
        this.processing = false
        processAjaxError(e)
      })

    },
  },

  components: {
    Tooltip
  }

}
</script>