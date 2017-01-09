<template>
  <validation name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-4">
        <label class="label"> {{ $t('admin.label.appId')}}: </label>
        <p class="control">
          <input class="input is-disabled" type="text" v-model.trim="app.id">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.appKey')}}: </label>
        <p class="control">
          <input class="input is-disabled" type="text" v-model.trim="app.secret">
        </p>
      </div>

      <div class="column is-4">
        <label class="label"> {{ $t('admin.label.appName')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.name">
        </p>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.currency')}}: </label>
        <p class="control">
          <span class="select">
            <select v-model.trim="app.currency">
              <option v-for="currency in currencies" :value="currency">{{$t('admin.currency.' + currency)}}</option>
            </select>
          </span>
        </p>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.chaoxinGroupId')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.chaoxin_group_id">
        </p>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.csPhoneNumber')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.cs_phone_number">
        </p>
      </div>

      <div class="column is-12">
        <label class="label"> {{ $t('admin.label.paymentCallbackUrl')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.payment_callback">
        </p>
      </div>

      <div class="column is-4">
        <label class="label"> {{ $t('admin.label.publicWeixinName')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.public_weixin_name">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.publicWeixinUrl')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.public_weixin_url">
        </p>
      </div>

      <div class="column is-4">
        <label class="label"> {{ $t('admin.label.weiboName')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.weibo_name">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.weiboUrl')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.weibo_url">
        </p>
      </div>

      <div class="column is-4">
        <label class="label"> {{ $t('admin.label.baiduTiebaName')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.baidu_tieba_name">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.baiduTiebaUrl')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.baidu_tieba_url">
        </p>
      </div>

      <div class="column is-4">
        <label class="label"> {{ $t('admin.label.forumName')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.forum_name">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.forumUrl')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.forum_url">
        </p>
      </div>

      <div class="column is-4"></div>
      <div class="column is-4">
        <input type="submit" class="button is-primary" :value="$t('admin.submit')"></input>
      </div>
      <div class="column is-4"></div>

    </div>
  </validation>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import Vue from 'admin/common/vue-i18n'

  export default {
    props: {
      app: Object,
    },

    data() {
      return {
        currencies: ['CNY', 'HKD', 'USD']
      }
    },

    computed: {
      ...mapGetters([
        'apps', 'sdks'
      ]),
    },

    methods: {
      handleSubmit: function() {
        this.$http.post('/admin_actions/update_app_info', {
            app: this.app
          })
          .then(response => response.json())
          .then(result => {
            if (result.success) {} else {
              return Promise.reject(this.$t(result.message))
            }
          })
          .catch(x => {
            console.error(x)
          })
      },
    },

  }
</script>