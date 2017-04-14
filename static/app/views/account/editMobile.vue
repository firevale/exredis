<template>
  <div class="edit-account">
    <form class="account-fields" @submit.prevent="onSubmit">
      <div class="field">
        <p class="control has-icon">
          <input class="input" type="text" v-model.trim="mobile" :placeholder="$t('account.placeholder.inputMobileNumber')" />
          <span class="icon image-icon icon-mobile"></span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icon has-button has-button-right">
          <input class="input" type="text" :placeholder="$t('account.placeholder.inputVerifyCode')" />
          <span class="icon image-icon icon-shield"></span>
          <v-touch tag="a" class="button is-primary">
            {{ $t('account.fetchVeiryCode') }}
          </v-touch>
        </p>
      </div>
      <v-touch tag="input" type="submit" class="button is-info is-submit" :value="$t('account.bind')">
      </v-touch>
    </form>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {mobile, password, verifyCode} from './validators'

export default {
  data() {
    return {
      mobile: '',
      verifyCode: '',
      password: null,
    }
  },

  validations: {
    mobile,
    verifyCode
  },

  mounted() {

  },

  methods: {
    onSubmit() {

    }
  }
}
</script>