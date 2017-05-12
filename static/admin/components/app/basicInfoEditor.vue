<template>
  <form name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-4" v-if="app.id">
        <label class="label"> {{ $t('admin.label.appId')}}: </label>
        <p class="control">
          <input class="input is-disabled" disabled type="text" v-model.trim="app.id">
        </p>
      </div>
      <div class="column is-8" v-if="app.id">
        <label class="label"> {{ $t('admin.label.appKey')}}: </label>
        <p class="control">
          <input class="input is-disabled" disabled type="text" v-model.trim="app.secret">
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
        <label class="label"> {{ $t('admin.label.websiteName')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.website_name">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.websiteUrl')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.website_url">
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
      <div class="column">
        <label class="label"> {{ $t('admin.label.appHasForum')}}: </label>
        <p class="control">
          <input type="checkbox" v-model.trim="app.has_forum">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.label.appHasMall')}}: </label>
        <p class="control">
          <input type="checkbox" v-model.trim="app.has_mall">
        </p>
      </div>
    </div>
    <div class="has-text-centered" style="margin-top: 15px">
      <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
    </div>
  </form>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  openNotification,
  processAjaxError,
} from 'admin/miscellaneous'

export default {
  props: {
    app: {
      type: Object, 
      required: true,
    }
  },

  data() {
    return {
      processing: false,
      currencies: ['CNY', 'HKD', 'USD']
    }
  },

  computed: {
    ...mapGetters([
      'sdks'
    ]),
  },

  methods: {
    ...mapActions([
      'addApp',
      'addForum',
      'fetchForums',
      'fetchMalls'
    ]),

    handleSubmit: async function() {
      if (this.app.has_forum) {
        if (!this.app.forum_name) this.app.forum_name = this.app.name
      }
      this.processing = true

      let result = await this.$acs.updateAppInfo({
        app: this.app
      }, this.$t('admin.notification.message.appInfoUpdated', {
        appName: this.app.name
      }))

      if (result.success) {
        this.fetchForums()
        this.fetchMalls()
        if (result.forum) {
          this.addForum(result.forum)
        }

        if (result.app) {
          this.addApp(result.app)
          this.$nextTick(_ => {
            this.$router.replace({
              path: '/admin/apps/edit/${result.app.id}'
            })
          })
        }
      }
      this.processing = false
    },
  },

}
</script>