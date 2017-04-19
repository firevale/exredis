<template>
  <div class="edit-account">
    <form class="account-fields" @submit.prevent="onSubmit">
      <p v-show="userInfo.email" class="help is-primary"> {{ $t('account.hint.currentBoundEmail', {email: boundEmail}) }} </p>
      <div>
        <div class="field">
          <p class="control has-icon">
            <input class="input" type="email" v-model.trim="email" @input="handleValidation" :placeholder="$t('account.placeholder.inputEmail')"
            />
            <span class="icon image-icon icon-envelope"></span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icon has-button has-button-right">
            <input class="input" type="number" v-model.trim="verifyCode" :placeholder="$t('account.placeholder.inputVerifyCode')" />
            <span class="icon image-icon icon-shield"></span>
            <v-touch tag="a" class="button is-primary" :class="{'is-disabled': $v.email.$invalid || cooldownCounter > 0,
             'is-loading': sendingVerifyCode }" @tap="sendEmailVerifyCode">
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
      <v-touch tag="button" type="submit" class="button is-info is-submit" :class="{'is-disabled': $v.$invalid,
        'is-loading': processing}">
        {{ $t('account.bind') }}
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
      email: '',
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
    let email = {
      required,
      valid: function(val) {
        return utils.isValidEmail(val)
      },
      changed: function(val) {
        return utils.isValidEmail(this.userInfo.email) ? (val != this.userInfo.email) : true
      },
    }

    let password = {
      required,
      minLength: utils.minLength(6),
      maxLength: utils.maxLength(20)
    }
    if (this.userInfo.is_anonymous) {
      return {
        email,
        password,
        verifyCode
      }
    } else {
      return {
        email,
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

    boundEmail() {
      return this.userInfo.email ? utils.emailMask(this.userInfo.email) : ''
    }
  },

  methods: {
    ...mapActions(['updateUserEmail']),

    onSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.updateUserEmail({
          email: this.email,
          verify_code: this.verifyCode,
          password: this.password,
        })
        if (result.success) {
          this.updateUserEmail(this.email)

          this.$nextTick(_ => {
            Toast.show(this.$t('account.messages.emailBindSuccess', {
              email: this.email
            }))
            this.$router.back()
          })
        } else {
          this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object))
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

    sendEmailVerifyCode: async function() {
      try {
        this.sendingVerifyCode = true
        let result = await this.$acs.sendBindEmailVerifyCode(this.email)
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