<template>
  <div class="edit-account">
    <form class="account-fields" @submit.prevent="onSubmit">
      <p v-show="userInfo.mobile" class="help is-primary"> {{ $t('account.hint.currentBoundModile', {mobile: boundMobile}) }} </p>
      <div>
        <div class="field">
          <p class="control has-icon">
            <input class="input" type="number" v-model.trim="mobile" @input="handleValidation" :placeholder="$t('account.placeholder.inputMobileNumber')"
            />
            <span class="icon image-icon icon-mobile"></span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icon has-button has-button-right">
            <input class="input" type="number" v-model.trim="verifyCode" :placeholder="$t('account.placeholder.inputVerifyCode')" />
            <span class="icon image-icon icon-shield"></span>
            <v-touch tag="a" class="button is-primary" :class="{'is-disabled': $v.mobile.$invalid || cooldownCounter > 0,
             'is-loading': sendingVerifyCode }" @tap="sendMobileVerifyCode">
              {{ btnFetchVerifyCodeTitle }}
            </v-touch>
          </p>
        </div>
        <div class="field" v-if="userInfo.is_anonymous">
          <p class="control has-icons-left has-icons-right">
            <input ref="password" class="input" type="password" v-model.trim="password" :placeholder="$t('account.placeholder.inputPassword')"
            />
            <span class="icon is-left image-icon icon-lock"></span>
            <v-touch tag="span" v-if="showPassword" class="icon is-right image-icon icon-eye is-clickable" @tap="togglePasswordVisibility"></v-touch>
            <v-touch tag="span" v-else class="icon is-right image-icon icon-eye-slash is-clickable" @tap="togglePasswordVisibility"></v-touch>
          </p>
        </div>
      </div>
      <p v-show="errorHint" class="help is-danger"> <span class="icon image-icon icon-error-sign"></span> {{ errorHint }} </p>
      <v-touch tag="input" type="submit" class="button is-info is-submit" :class="{'is-disabled': $v.$invalid,
        'is-loading': processing}" :value="$t('account.bind')">
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

import Toast from 'common/components/toast'

export default {
  data() {
    return {
      mobile: '',
      verifyCode: '',
      password: null,
      errorMessage: '',
      showPassword: false,
      sendingVerifyCode: false,
      cooldownCounter: 0,
      processing: false,
    }
  },

  validations() {
    let mobile = {
      required,
      valid: function(val) {
        return utils.isValidMobileNumber(val)
      },
      changed: function(val) {
        return utils.isValidMobileNumber(this.userInfo.mobile) ? (val != this.userInfo.mobile) : true
      },
    }

    let password = {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20)
    }
    if (this.userInfo.is_anonymous) {
      return {
        mobile,
        password,
        verifyCode
      }
    } else {
      return {
        mobile,
        verifyCode
      }
    }
  },

  mounted() {

  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),

    btnFetchVerifyCodeTitle() {
      if (this.cooldownCounter > 0) {
        return this.$t('account.cooldownText', {
          timer: this.cooldownCounter
        })
      } else {
        return this.$t('account.fetchVeiryCode')
      }
    },

    boundMobile() {
      return this.userInfo.mobile ? utils.mobileMask(this.userInfo.mobile) : ''
    }
  },

  methods: {
    ...mapActions(['updateUserMobile']),

    onSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.updateUserMobileNumber({
          mobile: this.mobile,
          verify_code: this.verifyCode,
          password: this.password,
        })
        if (result.success) {
          this.updateUserMobile(this.mobile)
          
          this.$nextTick(_ => {
            Toast.show(this.$t('account.messages.mobileBindSuccess', {
              mobile: this.mobile
            }))
            this.$router.back()
          })
        }
        this.processing = false
      }
    },

    cooldownTimer: function() {
      if (this.cooldownCounter > 0) {
        this.cooldownCounter--;
        setTimeout(this.cooldownTimer, 1000);
      }
    },

    sendMobileVerifyCode: async function() {
      try {
        this.sendingVerifyCode = true
        let result = await this.$acs.sendBindMobileVerifyCode(this.mobile)
        if (result.success) {
          this.cooldownCounter = 60
          setTimeout(this.cooldownTimer, 1000)
        } else {
          this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object))
        }
        this.sendingVerifyCode = false
      } catch (_) {
        this.setErrorMessage(this.$t('error.server.networkError'))
        this.sendingVerifyCode = false
      }
    },
  },

  mixins: [formMixin]
}
</script>