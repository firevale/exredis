<template>
  <div class="login-box">
    <form @submit.prevent="handleSubmit" v-if="currentAccount">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.quickTitle') }}</p>
      </div>
      <div class="row-login">
        <input type="text" v-model.trim="currentAccount.label" @click.prevent="toggleAccountsListVisibility" name="accountLabel"
          readonly></input>
        <span class="icon addon-icon icon-user"></span>
        <span class="icon addon-icon pull-right icon-down" @click="toggleAccountsListVisibility" :class="{'flip-vertical': accountListVisible}"></span>
        <div v-if="accountListVisible" ref="accountList" class="account-list">
          <div class="account-item row-login" v-for="account in historyAccounts" :key="account.label">
            <span @click.prevent="chooseAccount(account)" style="width: 100%; padding: 0;">{{account.label}}</span>
            <span class="icon addon-icon pull-right icon-times icon-small" @click.prevent="toggleAccountsListVisibility"></span>
          </div>
        </div>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login" style="margin-top: .8rem; margin-bottom: 1.0rem;">
        <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.loginPage.btnSubmit')" :disabled="processing"></input>
        <span v-show="processing" class="icon progress-icon rotating"></span>
      </div>
      <hr class="show-in-app"></hr>
      <div class="row-login show-in-app" style="-webkit-justify-content: center; justify-content: center;">
        <router-link class="pull-right" :to="{name: 'selectAccountType'}">{{ $t('account.quickLoginPage.gotoSelectAccount') }}</router-link>
      </div>
    </form>
  </div>
</template>
<script>
import nativeApi from 'common/js/nativeApi'

import {
  mapGetters,
  mapActions
} from 'vuex'

import loginFormMixin from './loginFormMixin'

export default {
  mixins: [loginFormMixin],

  beforeMount: async function() {
    let activeSession = await nativeApi.getActiveSession()
    if (activeSession) {
      this.addLoginnedAccount(activeSession)
    }
    this.currentAccount = this.historyAccounts[0]
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.historyAccounts.length <= 0) {
        vm.$router.replace({
          name: 'selectAccountType'
        })
      }
    })
  },

  data: function() {
    return {
      currentAccount: undefined,
      errorMessage: '',
      accountListVisible: false,
      processing: false,
    }
  },

  computed: {
    ...mapGetters([
      'historyAccounts'
    ]),
  },

  methods: {
    ...mapActions([
      'setLoginAccountId', 'addLoginnedAccount'
    ]),

    handleSubmit: async function() {
      if (!this.processing) {
        try {
          this.processing = true
          let result = await this.$acs.updateToken(this.currentAccount.access_token)
          if (result.success) {
            if (!result.is_anonymous && result.sdk == 'firevale') {
              this.setLoginAccountId(result.user_email || result.user_mobile)
            }
            this.addLoginnedAccount(result)
            this.currentAccount = result
            if (window.acsConfig.inApp) {
              nativeApi.closeWebviewWithResult(result)
            }
          } else {
            if (!this.currentAccount.is_anonymous && this.currentAccount.sdk == 'firevale') {
              this.setLoginAccountId(this.currentAccount.user_email || this.currentAccount.user_mobile)
              this.$router.replace({
                name: 'login'
              })
            } else if (this.currentAccount.is_anonymous && this.currentAccount.sdk == 'firevale') {
              this.$router.replace({
                name: 'selectAccountType'
              })
            } else {
              // TODO: goto some other page when
              this.$router.replace({
                name: 'login'
              })
            }
          }
        } catch (_) {
          this.setErrorMessage(this.$t('error.server.networkError'))
        }
        this.processing = false
      }
    },

    toggleAccountsListVisibility: function() {
      this.accountListVisible = !this.accountListVisible
    },

    chooseAccount: function(account) {
      this.accountListVisible = false
      this.currentAccount = account
    },
  },
}
</script>