<template>
  <form name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-12" v-if="app.id">
        <label class="label"> {{ $t('admin.label.appId')}}: </label>
        <div class="field has-addons">
          <p class="control flex-take-rest">
            <input class="input disabled" disabled type="text" v-model.trim="app.id">
          </p>
          <p class="control flex-fixed-size">
            <a class="button" style="margin: 2px" v-clipboard:copy="app.id" v-clipboard:success="toastClipboardSuccess">
              <span class="icon is-small"> <i class="fa fa-clipboard"></i> </span>
              <span> {{$t('admin.copy')}} </span>
            </a>
          </p>
        </div>
      </div>
      <div class="column is-12" v-if="app.id">
        <label class="label"> {{ $t('admin.label.appKey')}}: </label>
        <div class="field has-addons">
          <p class="control flex-take-rest">
            <input class="input disabled" disabled type="text" v-model.trim="app.secret">
          </p>
          <p class="control flex-fixed-size">
            <a class="button" style="margin: 2px" v-clipboard:copy="app.secret" v-clipboard:success="toastClipboardSuccess">
              <span class="icon is-small"> <i class="fa fa-clipboard"></i> </span>
              <span> {{$t('admin.copy')}} </span>
            </a>
          </p>
        </div>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.appName')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.name">
        </p>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.appAlias')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.alias">
        </p>
      </div>
      <div class="column is-4">
        <label class="label"> {{ $t('admin.label.itcAppId')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.itc_app_id">
        </p>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.currency')}}: </label>
        <p class="control">
          <span class="select" style="width: 80%">
            <select v-model.trim="app.currency" style="width: 100%">
              <option v-for="currency in currencies" :key="currency" :value="currency">{{$t('admin.currency.' + currency)}}</option>
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
      <div class="column is-12">
        <label class="label"> {{ $t('admin.label.paymentCallbackUrl')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.payment_callback">
        </p>
      </div>
      <div class="column is-12">
        <label class="label"> {{ $t('admin.label.obtainCodeUrl')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="app.obtain_code_url">
        </p>
      </div>

      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.appHasForum')}}: </label>
        <p class="control">
          <toggle-button :value="app.has_forum" color="#4e9ed8" :sync="true" 
          :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}"
          @change="x => app.has_forum = x.value" ></toggle-button>
        </p>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.appHasMall')}}: </label>
        <p class="control">
          <toggle-button :value="app.has_mall" color="#4e9ed8" :sync="true" 
          :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}" 
          @change="x => app.has_mall = x.value" ></toggle-button>
        </p>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.appHasPMall')}}: </label>
        <p class="control">
          <toggle-button :value="app.has_pmall" color="#4e9ed8" :sync="true" 
          :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}" 
          @change="x => app.has_pmall = x.value" ></toggle-button>
        </p>
      </div>      
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.appRestrictLogin')}}: </label>
        <p class="control">
          <toggle-button :value="app.restrict_login" color="#4e9ed8" :sync="true" 
          :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}" 
          @change="x => app.restrict_login = x.value"> </toggle-button>
        </p>
      </div>
      <div class="column is-2">
        <label class="label"> {{ $t('admin.label.appCanAssignCode')}}: </label>
        <p class="control">
          <toggle-button :value="app.can_assign_code" color="#4e9ed8" :sync="true" 
          :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}" 
          @change="x => app.can_assign_code = x.value"> </toggle-button>
        </p>
      </div>
      <div class="column is-3">
        <label class="label"> {{ $t('admin.label.wcpDownloadEnabled')}}: </label>
        <p class="control">
          <toggle-button :value="app.wcp_download_enabled" color="#4e9ed8" :sync="true" 
          :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}" 
          @change="x => app.wcp_download_enabled = x.value"> </toggle-button>
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

import Toast from 'common/components/toast'

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
      'setApp',
      'addForum',
      'listMalls',
      'setMalls',
    ]),

    toastClipboardSuccess: function() {
      Toast.show(this.$t('admin.messages.copyClipboardSuccess'))
    },

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
        if (result.app) {
          this.setApp(result.app)
          this.$nextTick(_ => {
            this.$router.replace({
              path: `/admin/app/${result.app.id}/config/`
            })
          })
        }
      }

      this.processing = false
    },
  },

}
</script>

<style lang="scss">
.fv-toast-wrapper {
  top: 10%;
  opacity: 80;
}
</style>