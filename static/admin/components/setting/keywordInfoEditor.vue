<template>
  <validation name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">

      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.keyword')}}: </label>
        <p class="control">
          <textarea class="textarea" placeholder="请输入关键词，以小写“,”分隔"></textarea>
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
    showMessageBox
  } from '../dialog/messageBox'

  import {
    openNotification,
    processAjaxError
  } from 'admin/miscellaneous'

  import Vue from 'admin/vue-i18n'
  import Tooltip from 'vue-bulma-tooltip'

  export default {

    methods: {

    },

    components: {
      Tooltip
    }

  }
</script>
