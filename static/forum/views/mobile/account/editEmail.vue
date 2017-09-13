<template>
  <div class="account">
    <form @submit.prevent="onSubmit">
      <div class="fields">
        <div v-if="userInfo.email" class="field">
          <div class="control">
            <span class="title">{{ $t('forum.account.hint.currentBoundEmail') }}</span>
            <strong>{{initEmail}}</strong>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-primary is-radiusless" type="text" v-model.trim="email" @input="handleValidation" :placeholder="$t('forum.placeholder.inputEmail')">
          </div>
        </div>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-primary is-radiusless is-fullwidth" type="text" v-model.trim="verifyCode" :placeholder="$t('forum.placeholder.inputVerifyCode')">
          </div>
          <div class="control">
            <v-touch tag="button" type="button" class="button is-primary is-radiusless" :class="{'is-disabled': $v.email.$invalid || cooldownCounter > 0,
                    'is-loading': sendingVerifyCode }" @tap="sendEmailVerifyCode" :disabled="$v.email.$invalid || cooldownCounter > 0">
              {{ btnFetchVerifyCodeTitle }}
            </v-touch>
          </div>
        </div>
        <p class="help" v-show="errorHint">
          <span class="icon icon-error-tip"></span>
          <strong>{{ errorHint }}</strong>
        </p>
        <div class="field">
          <div class="control">
            <v-touch tag="button" type="submit" class="button is-primary is-small is-fullwidth has-radius" :disabled="$v.$invalid"
              :class="{'is-disabled': $v.$invalid,
                'is-loading': processing}">
              {{ $t('forum.account.bind') }}
            </v-touch>
          </div>
        </div>
      </div>
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
  email,
  verifyCode
} from '../../../components/validators'

import formMixin from '../../../components/formMixin'
import * as utils from 'common/js/utils'
import Toast from 'common/components/toast'

export default {
  data() {
    return {
      email: '',
      verifyCode: '',
      errorMessage: '',
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
    return {
      email,
      verifyCode
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    initEmail() {
      return this.userInfo.email ? utils.emailMask(this.userInfo.email) : this.$t(
        'forum.account.notBound')
    },
    btnFetchVerifyCodeTitle() {
      if (this.cooldownCounter > 0) {
        return this.$t('forum.account.cooldownText', {
          timer: this.cooldownCounter
        })
      } else {
        return this.$t('forum.account.fetchVeiryCode')
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
          verify_code: this.verifyCode
        })
        if (result.success) {
          this.updateUserEmail(this.email)
          window.acsConfig.user.email = this.email

          this.$nextTick(_ => {
            Toast.show(this.$t('forum.account.messages.emailBindSuccess', {
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
        if (this.email == "") {
          return;
        } else if (!utils.isValidEmail(this.email)) {
          this.errorHint = this.$t('error.validation.invalidEmailAddress')
        } else {
          this.sendingVerifyCode = true
          let result = await this.$acs.sendBindEmailVerifyCode(this.email)
          if (result.success) {
            this.cooldownCounter = 60
            setTimeout(this.cooldownTimer, 1000)
          } else {
            this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object))
          }
          this.sendingVerifyCode = false
        }
      } catch (_) {
        this.setErrorMessage(this.$t('error.server.networkError'))
        this.sendingVerifyCode = false
      }
    },
  },

  mixins: [formMixin]
}
</script>