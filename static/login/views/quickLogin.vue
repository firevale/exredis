<template>
  <div class="login-box">
    <validation name="quickLogin" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.quickTitle') }}</p>
      </div>
      <div class="row-login">
        <input type="text" v-model.trim="currentAccount.label" name="accountLabel" readonly @click.prevent="toggleAccountsListVisibility" 
        />

        <span class="icon addon-icon icon-user"></span>
        <span class="icon addon-icon pull-right icon-down" :class="{'flip-vertical': accountListVisible}" @click="toggleAccountsListVisibility"></span>

        <div v-if="accountListVisible" ref="accountList" class="account-list">
          <div class="account-item row-login" v-for="account in historyAccounts" >
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
        <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.loginPage.btnSubmit')" :disabled="processing"/>
        <span v-show="processing" class="icon progress-icon rotating"></span>
      </div>
      <hr class="show-in-app" />
      <div class="row-login show-in-app" style="-webkit-justify-content: center; justify-content: center;">
        <router-link :to="{name: 'selectAccountType'}">{{ $t('account.quickLoginPage.gotoSelectAccount') }}</router-link>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import nativeApi from '../common/nativeApi'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    beforeMount: function() {
      let activeSession = nativeApi.getActiveSession()
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

      handleSubmit: function() {
        if (this.currentAccount) {
          this.processing = true
          this.$http({
            method: 'post',
            url: '/user/update_token',
            params: {
              access_token: this.currentAccount.access_token
            }
          }).then(response => {
            this.processing = false
            return response.json()
          }).then(result => {
            if (result.success) {
              if (!result.is_anonymous && result.sdk == 'firevale') {
                this.setLoginAccountId(result.user_email || result.user_mobile)
              }
              this.addLoginnedAccount(result)
              this.currentAccount = result
              if (window.acsConfig.inApp) {
                nativeApi.closeLoginDialog(result)
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
          }).catch(e => {
            this.processing = false
            this.errorMessage = this.$t('account.error.networkError')
          })
        }
      },

      toggleAccountsListVisibility: function() {
        this.accountListVisible = !this.accountListVisible
      },

      chooseAccount: function(account) {
        this.accountListVisible = false
        this.currentAccount = account
      },

      deleteaccountLabel: function() {

      }
    },
  }
</script>