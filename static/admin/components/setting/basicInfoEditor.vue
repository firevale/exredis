<template>
  <validation name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">

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
    data() {
      return {
        processing: false
      }
    },

    methods: {
      ...mapActions([

      ]),

      handleSubmit: function() {

      },
    },

  }
</script>
