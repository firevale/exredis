<template>
  <form name="basicInfo" @submit.prevent="handleSubmit">
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
  </form>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

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
    getKeyword: async function() {
      this.processing = true

      let result = await this.$acs.getSetting({
        setting_name: "keyword"
      })

      if (result.success) {
        this.keyword = result.setting.value
      }

      this.processing = false
    },

    handleSubmit: async function() {
      if (this.keyword.trim().length == 0) {
        alert("请输入关键字")
        return
      }

      this.processing = true

      let result = await this.$acs.updateSettingByName({
        setting_name: "keyword",
        setting_value: this.keyword.trim(),
        group: "keyword",
        memo: '网站敏感词过滤',
        active: true
      }, this.$t('admin.notification.message.sensitiveWordsUpdated'))

      this.processing = false
    },
  },

  components: {
    Tooltip
  }

}
</script>