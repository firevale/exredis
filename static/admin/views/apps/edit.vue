<template>
  <div>
    <tabs class="box" type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.app.basicInfo')">
        <validation name="basicInfo" @submit.prevent="handleSubmitBasicInfo">
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
      </tab-pane>
      <tab-pane icon="fa fa-apple" :label="$t('admin.app.sdkInfo')">
        <div class="box columns is-multiline">
          <div class="column is-1 has-text-centered" v-for="sdk in app.sdk_bindings">
            <div class="sdk-icon" :class="sdk.sdk" @click.prevent="editSdkInfo(sdk)">
            </div>
            <h6 class="subtitle is-6">{{$t(`admin.sdks.${sdk.sdk}`)}} </h6>
          </div>
          <div class="column is-1 has-text-centered">
            <div class="add-sdk" @click.prevent="selectSdkToAdd">
              <span class="icon is-small"><i class="fa fa-plus"></i></span>
            </div>
            <h6 class="subtitle is-6">{{$t('admin.sdks.add')}} </h6>
          </div>
        </div>
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

  import Vue from 'admin/common/vue-i18n'

  import editSdkInfo from 'admin/components/dialogs/editSdkInfo'
  const editSdkInfoComponent = Vue.extend(editSdkInfo)

  const openSdkInfoEditor = (propsData = {
    visible: true
  }) => {
    return new editSdkInfoComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  import selectAddSdks from 'admin/components/dialogs/selectAddSdks'
  const selectAddSdksComponent = Vue.extend(selectAddSdks)

  const openSelectAddSdks = (propsData = {
    visible: true
  }) => {
    return new selectAddSdksComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  export default {
    created() {},

    mounted() {
      let app = this.apps[this.$route.params.appId]

      if (typeof app == 'undefined') {
        this.$router.replace({
          name: 'AppManage'
        })
      } else {
        this.app = app
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
        'apps', 'sdks'
      ]),
    },

    methods: {
      ...mapActions([
        'fetchPlatformApp'
      ]),

      handleSubmitBasicInfo: function() {
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

      editSdkInfo: function(sdkInfo) {
        openSdkInfoEditor({
          ...sdkInfo,
          app: this.app,
          visible: true,
        })
      },

      selectSdkToAdd: function() {
        let sdks = []
        let added = []

        this.app.sdk_bindings.forEach(x => {
          added.push(x.sdk)
        })

        added.push('alipay') // alipay and wechat are payment sdks
        added.push('wechat')
        added.push('applestore')
        added.push('appstore')
        added.push('firevale')
        added.push('qq')

        this.sdks.forEach(sdk => {
          if (added.indexOf(sdk) < 0) {
            sdks.push(sdk)
          }
        })

        openSelectAddSdks({
          visible: true,
          appName: this.app.name,
          callback: sdk => {
            this.$http.post('/admin_actions/generate_dummy_sdk_info', {
                sdk
              })
              .then(response => response.json())
              .then(result => {
                if (result.success) {
                  openSdkInfoEditor({
                    sdk,
                    binding: result.binding,
                    app: this.app,
                    visible: true
                  })
                } else {
                  return Promise.reject(this.$t(result.message))
                }
              })
          },
          sdks,
        })
      }
    },

    components: {
      Tabs,
      TabPane
    }
  }
</script>