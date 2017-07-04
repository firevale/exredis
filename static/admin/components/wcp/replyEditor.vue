<template>
  <form name="params" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-10">
        <div class="field has-addons">
          <label class="label flex-take-rest"> {{ $t('admin.wcp.subscribedResponse')}}: </label>
          <div class="field has-addons flex-fixed-size">
            <p class="control flex-take-rest">
              <label class="label"> {{$t('admin.wcp.userLoginCode')}} </label>
            </p>
            <p class="control flex-fixed-size">
              <toggle-button :value="wcpParams.subscribed_response == this.loginCode" color="#4e9ed8" :sync="true"
                :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}" @change="x => setLoginCode(1, x)">
              </toggle-button>
            </p>
          </div>
        </div>
        <p class="control">
          <textarea :disabled="wcpParams.subscribed_response == this.loginCode" class="textarea" rows="4" v-model.trim="wcpParams.subscribed_response"
          />
        </p>
      </div>
      <div class="column is-10">
        <div class="field has-addons">
          <label class="label flex-take-rest"> {{ $t('admin.wcp.scanResponse')}}: </label>
          <div class="field has-addons flex-fixed-size">
            <p class="control flex-take-rest">
              <label class="label"> {{$t('admin.wcp.userLoginCode')}} </label>
            </p>
            <p class="control flex-fixed-size">
              <toggle-button :value="wcpParams.scan_response == this.loginCode" color="#4e9ed8" :sync="true" :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}"
                @change="x => setLoginCode(2, x)">
              </toggle-button>
            </p>
          </div>
        </div>
        <p class="control">
          <textarea :disabled="wcpParams.scan_response == this.loginCode" class="textarea" rows="4" v-model.trim="wcpParams.scan_response"
          />
        </p>
      </div>
      <div class="column is-10">
        <div class="field has-addons">
          <label class="label flex-take-rest"> {{ $t('admin.wcp.defaultResponse')}}: </label>
          <div class="field has-addons flex-fixed-size">
            <p class="control flex-take-rest">
              <label class="label"> {{$t('admin.wcp.userLoginCode')}} </label>
            </p>
            <p class="control flex-fixed-size">
              <toggle-button :value="wcpParams.default_response == this.loginCode" color="#4e9ed8" :sync="true" :labels="{checked: $t('admin.switchOn'), unchecked: $t('admin.switchOff')}"
                @change="x => setLoginCode(3, x)">
              </toggle-button>
            </p>
          </div>
        </div>
        <p class="control">
          <textarea :disabled="wcpParams.default_response == this.loginCode" class="textarea" rows="4" v-model.trim="wcpParams.default_response"
          />
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

export default {
  data() {
    return {
      loginCode: ':login_code',
      processing: false
    }
  },

  computed: {
    ...mapGetters([
      'wcpParams'
    ]),
  },

  methods: {
    ...mapActions([
      'updateWcpParams',
    ]),

    setLoginCode: function(msgtype, x) {
      switch (msgtype) {
        case 1:
          this.wcpParams.subscribed_response = (x.value ? this.loginCode : '')
          break;
        case 2:
          this.wcpParams.scan_response = (x.value ? this.loginCode : '')
          break;
        case 3:
          this.wcpParams.default_response = (x.value ? this.loginCode : '')
          break;
      }
    },

    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateWcpParams(this.wcpParams, this.$t(
        'admin.notification.message.wcpParamsUpdated'))
      if (result.success) {
        this.updateWcpParams(result.wcpconfig)
      }
      this.processing = false
    },
  },

}
</script>