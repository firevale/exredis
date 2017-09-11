<template>
  <div class="account">
    <form @submit.prevent="onSubmit">
      <div class="fields">
        <div v-if="userInfo.mobile" class="field binding-msg">
          <div class="control">
            <span class="title">{{ $t('forum.account.hint.currentBoundMobile') }}</span>
            <strong>{{initMobile}}</strong>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-primary" type="text" v-model.trim="mobile" @input="handleValidation" :placeholder="$t('forum.placeholder.inputMobileNumber')">
          </div>
        </div>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-fullwidth is-primary" type="text" v-model.trim="verifyCode" :placeholder="$t('forum.placeholder.inputVerifyCode')">
          </div>
          <div class="control">
            <v-touch tag="button" type="button" class="button is-primary btn-verfy" :class="{'is-disabled': $v.mobile.$invalid || cooldownCounter > 0,
                  'is-loading': sendingVerifyCode }" @tap="sendMobileVerifyCode" :disabled="$v.mobile.$invalid || cooldownCounter > 0">
              <small>{{ btnFetchVerifyCodeTitle }}</small>
            </v-touch>
          </div>
        </div>
        <div class="field" v-show="errorHint">
          <div class="control">
            <span class="icon icon-error-tip"></span>
            <strong>{{ errorHint }}</strong>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <v-touch tag="button" type="submit" class="button is-primary is-fullwidth has-radius" :disabled="$v.$invalid"
              :class="{'is-disabled': $v.$invalid,
                  'is-loading': processing}">
              <span class="title is-white">{{ $t('forum.account.bind') }}</span>
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
} from '../../components/validators'

import formMixin from '../../components/formMixin'
import * as utils from 'common/js/utils'
import Toast from 'common/components/toast'

export default {
  data() {
    return {
      mobile: '',
      verifyCode: '',
      errorMessage: '',
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
        return utils.isValidMobileNumber(this.userInfo.mobile) ? (val != this.userInfo.mobile) :
          true
      },
    }
    return {
      mobile,
      verifyCode
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    btnFetchVerifyCodeTitle() {
      if (this.cooldownCounter > 0) {
        return this.$t('forum.account.cooldownText', {
          timer: this.cooldownCounter
        })
      } else {
        return this.$t('forum.account.fetchVeiryCode')
      }
    },
    boundMobile() {
      return this.userInfo.mobile ? utils.mobileMask(this.userInfo.mobile) : ''
    },
    initMobile() {
      return this.userInfo.mobile ? utils.mobileMask(this.userInfo.mobile) : this.$t(
        'forum.account.notBound')
    }
  },
  methods: {
    ...mapActions(['updateUserMobile']),

    onSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.updateUserMobileNumber({
          mobile: this.mobile,
          verify_code: this.verifyCode
        })
        if (result.success) {
          this.updateUserMobile(this.mobile)
          window.acsConfig.user.mobile = this.mobile

          this.$nextTick(_ => {
            Toast.show(this.$t('forum.account.messages.mobileBindSuccess', {
              mobile: this.mobile
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
    sendMobileVerifyCode: async function() {
      try {
        if (utils.isValidMobileNumber(this.mobile)) {
          this.sendingVerifyCode = true
          let result = await this.$acs.sendBindMobileVerifyCode(this.mobile)
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