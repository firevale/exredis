<template>
  <div>
    <tabs class="box" type="boxed" layout="top" alignment="left" size="normal">
      <tab-pane icon="fa fa-clone" :label="$t('admin.app.basicInfo')">
        <div class="columns is-multiline">

          <div class="column is-4">
            <label class="label"> {{ $t('admin.label.appId')}}: </label>
            <p class="control">
              <input class="input is-disabled" type="text" v-model="app.id">
            </p>
          </div>
          <div class="column is-8">
            <label class="label"> {{ $t('admin.label.appKey')}}: </label>
            <p class="control">
              <input class="input is-disabled" type="text" v-model="app.secret">
            </p>
          </div>

          <div class="column is-4">
            <label class="label"> {{ $t('admin.label.appName')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.name">
            </p>
          </div>
          <div class="column is-2">
            <label class="label"> {{ $t('admin.label.currency')}}: </label>
            <p class="control">
              <span class="select">
                <select v-model="app.currency">
                  <option v-for="currency in currencies" :value="currency">{{$t('admin.currency.' + currency)}}</option>
                </select>
              </span>
            </p>
          </div>
          <div class="column is-2">
            <label class="label"> {{ $t('admin.label.chaoxinGroupId')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.chaoxin_group_id">
            </p>
          </div>
          <div class="column is-2">
            <label class="label"> {{ $t('admin.label.csPhoneNumber')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.cs_phone_number">
            </p>
          </div>

          <div class="column is-12">
            <label class="label"> {{ $t('admin.label.paymentCallbackUrl')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.payment_callback">
            </p>
          </div>

          <div class="column is-4">
            <label class="label"> {{ $t('admin.label.publicWeixinName')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.public_weixin_name">
            </p>
          </div>
          <div class="column is-8">
            <label class="label"> {{ $t('admin.label.publicWeixinUrl')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.public_weixin_url">
            </p>
          </div>

          <div class="column is-4">
            <label class="label"> {{ $t('admin.label.weiboName')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.weibo_name">
            </p>
          </div>
          <div class="column is-8">
            <label class="label"> {{ $t('admin.label.weiboUrl')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.weibo_url">
            </p>
          </div>

          <div class="column is-4">
            <label class="label"> {{ $t('admin.label.baiduTiebaName')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.baidu_tieba_name">
            </p>
          </div>
          <div class="column is-8">
            <label class="label"> {{ $t('admin.label.baiduTiebaUrl')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.baidu_tieba_url">
            </p>
          </div>

          <div class="column is-4">
            <label class="label"> {{ $t('admin.label.forumName')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.forum_name">
            </p>
          </div>
          <div class="column is-8">
            <label class="label"> {{ $t('admin.label.forumUrl')}}: </label>
            <p class="control">
              <input class="input" type="text" v-model="app.forum_url">
            </p>
          </div>


        </div>
      </tab-pane>
      <tab-pane icon="fa fa-apple" :label="$t('admin.app.sdkInfo')">
      </tab-pane>
    </tabs>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import {
    Tabs,
    TabPane
  } from 'vue-bulma-tabs'

  export default {
    created() {},

    mounted() {
      let app = this.apps[this.$route.params.appId]

      if (typeof app == 'undefined') {
        this.$router.replace({
          name: 'AppManage'
        })
      } else {
        this.app = JSON.parse(JSON.stringify(app))
      }
    },

    data() {
      return {
        app: {},
        currencies: ['CNY', 'HKD', 'USD']
      }
    },

    computed: {
      ...mapGetters([
        'apps'
      ]),
    },

    methods: {
      ...mapActions([
        'fetchPlatformApp'
      ]),
    },

    components: {
      Tabs,
      TabPane
    }
  }
</script>