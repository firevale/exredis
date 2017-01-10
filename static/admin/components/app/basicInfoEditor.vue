<template>
  <validation name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-4" v-if="app.id">
        <label class="label"> {{ $t('admin.label.appId')}}: </label>
        <p class="control">
          <input class="input is-disabled" type="text" v-model.trim="app.id">
        </p>
      </div>
      <div class="column is-8" v-if="app.id">
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

  import Vue from 'admin/common/vue-i18n'

  import {
    openNotification
  } from 'admin/common/notification'

  export default {
    props: {
      app: Object,
    },

    data() {
      return {
        processing: false,
        currencies: ['CNY', 'HKD', 'USD']
      }
    },

    computed: {
      ...mapGetters([
        'apps', 'sdks'
      ]),
    },

    methods: {
      ...mapActions([
        'addApp'
      ]),

      handleSubmit: function() {
        this.processing = true
        this.$http.post('/admin_actions/update_app_info', {
            app: this.app
          })
          .then(response => response.json())
          .then(result => {
            this.processing = false
            if (result.success) {
              openNotification({
                title: this.$t('admin.titles.updateSuccess'),
                message: this.$t('admin.messages.appInfoUpdated', {
                  appName: this.app.name
                }),
                type: 'success',
                duration: 4500,
                container: '.notifications',
              })

              if (result.app) {
                this.addApp(result.app)
                this.$nextTick(_ => {
                  this.$router.replace({
                    name: 'EditApp',
                    params: {
                      appId: app.id
                    }
                  })
                })
              }
            } else {
              return Promise.reject(result.message)
            }
          })
          .catch(e => {
            this.processing = false
            openNotification({
              title: this.$t('admin.titles.updateFailed'),
              message: e,
              type: 'danger',
              duration: 6000,
            })
          })
      },
    },

  }
</script>