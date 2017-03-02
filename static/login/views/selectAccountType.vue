<template>
<div class="login-box">
  <div class="row-login">
    <p class="title">{{ $t('account.loginPage.otherWays') }}</p>
  </div>
  <div class="horizontal-stack-box">
    <div class="tile" v-for="accountType in accountTypes">
      <a class="sdk-icon" :class="accountType + ((accountType == 'anonymous' && processing) ? ' rotating' : '')"
          @click="onLoginByType(accountType)">
      </a>
      <p>{{ $t(`account.types.${accountType}`) }}</p>
    </div>
  </div>
</div>
</template>
<script>
import nativeApi from 'common/nativeApi'

import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  data: function() {
    return {
      accountTypes: ['anonymous', 'firevale'],
      processing: false,
    }
  },

  methods: {
    ...mapActions([
      'addLoginnedAccount'
    ]),

    onLoginByType: function(accountType) {
      switch (accountType) {
        case 'firevale':
          this.$router.push({
            name: 'login'
          })
          break;
        case 'anonymous':
          this.anonymousLogin()
          break;
      }
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
              }
              nativeApi.closeWebviewWithResult(result)
            } catch (e) {
              console.error(e)
            }
          }
        })
    }
  },
}
</script>
