<template>
  <div class="login-box">
    <div class="row-login">
      <p class="title">{{ $t('account.loginPage.otherWays') }}</p>
    </div>
    <div class="horizontal-stack-box">
      <div class="tile" v-for="accountType in accountTypes" :key="accountType">
        <a class="sdk-icon" :class="accountType + ((accountType == currentAccountType && processing) ? ' rotating' : '')"
          @click="onLoginByType(accountType)">
      </a>
        <p>{{ $t(`account.types.${accountType}`) }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import nativeApi from 'common/js/nativeApi'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data: function() {
    let accountTypes = ['anonymous', 'firevale']
    if (window.acsConfig.isFbLoginSupported) {
      accountTypes.push('facebook')
    }
    if (window.acsConfig.isWechatLoginSupported) {
      accountTypes.push('wechat')
    }
    return {
      currentAccountType: '',
      accountTypes: accountTypes,
      processing: false,
    }
  },

  methods: {
    ...mapActions([
      'addLoginnedAccount'
    ]),

    onLoginByType: function(accountType) {
      this.currentAccountType = accountType
      switch (accountType) {
        case 'firevale':
          this.$router.push({
            name: 'login'
          })
          break;
        case 'facebook':
          nativeApi.closeWebviewWithResult({
            success: false,
            native: 'facebook',
          })
          break;
        case 'anonymous':
          this.anonymousLogin()
          break;
        case 'wechat':
          this.wechatLogin()
          break;
      }
    },

    wechatLogin: async function() {
      this.processing = true
      let result = await this.$acs.generateState()
      if (result.success) {
        this.showWechatLogin(result.state)
      }
    },

    showWechatLogin: function(mystate) {
      nativeApi.showWechatLogin(mystate,
        async(state, code) => {
          let result = await this.$acs.createWechatToken(state, code)
          if (result.success) {
            this.addLoginnedAccount(result)
            nativeApi.closeWebviewWithResult(result)
          } else if (result.action == 'show_login_code') {
            this.$router.push({
              name: 'inputLoginCode'
            })
          }
        })
    },

    anonymousLogin: function() {
      nativeApi.showAlertDialog(this.$t('account.alert.hint'),
        this.$t('account.alert.anonymousHintMessage'),
        this.$t('account.alert.cancel'),
        this.$t('account.types.anonymous'),
        async result => {
          if (result == 'ok') {
            this.processing = true
            try {
              let result = await this.$acs.createAnonymousToken()
              if (result.success) {
                this.addLoginnedAccount(result)
                nativeApi.closeWebviewWithResult(result)
              } else if (result.action == 'show_login_code') {
                this.$router.push({
                  name: 'inputLoginCode'
                })
              }
            } catch (e) {
              console.error(e)
            }
          }
        })
    }
  },
}
</script>