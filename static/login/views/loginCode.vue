<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.codePage.title') }}</p>
      </div>
      <p class="code-tip"> {{ $t('account.codePage.pleaseInputLoginCode') }}: </p>
      <div class="row-login">
        <input type="text" :placeholder="$t('account.codePage.pleaseInputLoginCode')" v-model.trim="loginCode" autocomplete="off"
          maxlength="10" class="outsideText" name="loginCode" @keyup="handleValidation($v.loginCode)" ></input>
        <span class="icon addon-icon icon-check"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <button type="submit" class="button" :class="{'is-loading': processing}">
          {{ $t('account.codePage.btnSubmit') }}
        </button>
      </div>
      <div v-if="obtainCodeUrl" class="row-login" style="-webkit-justify-content: flex-end; justify-content: flex-end;">
        <a class="pull-right" @click.prevent="gotoObtain">{{ $t('account.codePage.obtainCode') }} </a>
      </div>
    </form>
  </div>
</template>
<script>
import * as utils from 'common/js/utils'
import nativeApi from 'common/js/nativeApi'
import {obtainCodeUrl, isInApp} from 'common/js/acs'

import {
  mapGetters,
  mapActions
} from 'vuex'

import loginFormMixin from './loginFormMixin'
import {
  loginCode
} from './loginValidation'

export default {
  mixins: [loginFormMixin],

  validations: {
    loginCode
  },

  data: function() {
    return {
      loginCode: '',
      errorMessage: '',
      processing: false,
      obtainCodeUrl: obtainCodeUrl,
    }
  },

  computed: {
    ...mapGetters([
      'redirectUri'
    ]),
  },

  methods: {
    gotoObtain: function() {
      if (isInApp) {
        nativeApi.openBrowser(obtainCodeUrl)
      }
    },

    handleSubmit: async function() {
      if (!this.$v.$invalid && !this.processing) {
        this.processing = true
        try {
          let result = await this.$acs.bindLoginCode({
            login_code: this.loginCode
          })
          console.log(result)
          if (result.success) {
            if (window.acsConfig.inApp) {
              nativeApi.closeWebviewWithResult(result)
            } 
            else {
              if (this.redirectUri) {
                window.location = utils.updateQueryStringParameter(this.redirectUri, 'accessToken', result.access_token)
              }
            }
          } else {
            this.setErrorMessage(this.$t(result.i18n_message))
          }
        } catch (e) {
          console.error('exception encountered', e)
          this.setErrorMessage(this.$t('error.server.networkError'))
        }
        this.processing = false
      }
    },
  },
}
</script>