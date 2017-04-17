<template>
  <div class="edit-account">
    <form class="account-fields" @submit.prevent="onSubmit">
      <div class="field">
        <p class="control has-icon">
          <input class="input" type="text" v-model.trim="mobile" @input="handleValidation" :placeholder="$t('account.placeholder.inputMobileNumber')"
          />
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
      <div class="field">
        <p class="control is-danger"> {{ errorHint }} </p>
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

import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

import {
  password,
  verifyCode
} from './validators'

import formMixin from './formMixin'

import * as utils from 'common/js/utils'

export default {
  data() {
    return {
      mobile: '',
      verifyCode: '',
      password: null,
      errorMessage: '',
    }
  },

  validations: {
    mobile: {
      required,
      valid: function(val) {
        return utils.isValidMobileNumber(val)
      },
      changed: function(val) {
        return utils.isValidMobileNumber(this.userInfo.mobile) ? (val != this.userInfo.mobile) : true
      },
    },
    password: {
      required: function(val) {
        return this.userInfo.is_anonymous ? required(val) : true
      },
      minLength: function(val) {
        return this.userInfo.is_anonymous ? minLength(6)(val) : true
      },
      maxLength: function(val) {
        return this.userInfo.is_anonymous ? maxLength(20)(val) : true
      }
    },
    verifyCode
  },

  mounted() {

  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),
  },

  methods: {
    onSubmit() {

    }
  },

  mixins: [formMixin]
}
</script>