<template>
  <div class="login-box">
    <validation name="quickLogin" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.quickTitle') }}</p>
      </div>
      <div class="row-login">
        <input type="text" v-model.trim="currentAccount.label" name="accountLabel" readonly @focus="this.accountListVisible = true"
        />

        <span class="icon addon-icon icon-user"></span>
        <span class="icon addon-icon pull-right icon-down" :class="{'flip-vertical': accountListVisible}" @click="toggaleAccountsListVisibility"></span>

        <div v-if="accountListVisible" ref="accountList" class="account-list">
          <div class="account-item row-login" v-for="account in historyAccounts" >
            <span @click.prevent="chooseAccount(account)" style="width: 100%; padding: 0;">{{account.label}}</span>
            <span class="icon addon-icon pull-right icon-times icon-small" @click.prevent="toggaleAccountsListVisibility"></span> 
          </div>
        </div>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login" style="margin-top: .8rem; margin-bottom: 1.0rem;">
        <input type="submit" :value="$t('account.loginPage.btnSubmit')" />
      </div>
      <hr />
      <div class="row-login" style="-webkit-justify-content: center; justify-content: center;">
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
      this.currentAccount = this.historyAccounts[0]
    },

    data: function() {
      return {
        currentAccount: '' ,
        errorMessage: '',
        accountListVisible: false,
      }
    },

    computed: {
      ...mapGetters([
        'historyAccounts' 
      ]),
    },

    methods: {
      ...mapActions([
        'setLoginAccount', 'addLoginnedAccount' 
      ]),

      handleSubmit: function() {
        if (this.currentAccount) {
          this.$http({
            method: 'post',
            url: '/user/update_token',
            params: {
              access_token: this.currentAccount.access_token
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              this.addLoginnedAccount(result)
              this.currentAccount = result
              nativeApi.closeLoginDialog(result) 
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
        }
      },

      toggaleAccountsListVisibility: function() {
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