<template>
  <div class="login-box">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.quickTitle') }}</p>
      </div>
      <div class="row-login">
        <input type="text" onchange="return false" v-model.trim="accountId" name="accountId" readonly @focus="this.showAccounts = true"
        />

        <span class="icon addon-icon icon-user"></span>
        <span class="icon addon-icon pull-right icon-down" :class="{'flip-vertical': showAccounts}" @click="toggleAccounts"></span>

        <div v-if="showAccounts" ref="accountList" class="accountList">
          <div class="accountItem row-login" v-for="item in accounts" >
            <span @click="chooseAccountId(item)" style="width: 100%;padding: 0;">{{item}}</span>
            <span class="icon addon-icon pull-right icon-times icon-small" @click="toggleAccounts"></span> 
          </div>
        </div>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login" style="margin-top: 1rem;">
        <input type="submit" :value="$t('account.loginPage.btnSubmit')" />
      </div>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import Vue from 'vue'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    validators: {
      validAccountId: function(val) {
        return this.validateAccountId(val).then(result => {
          return result ? Promise.resolve() : Promise.reject()
        })
      },
    },

    beforeMount: function() {
      //this.accountId = this.loginAccount
    },

    data: function() {
      return {
        accountId: 'zhangshiqing@firevale.com',
        accounts: ['zhangshiqing@firevale.com', 'zsq@firevale.com'],
        errorMessage: '',
        showAccounts: false,
      }
    },

    computed: {
      ...mapGetters([
        'loginAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder', 'colors'
      ]),
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setLoginAccount', 'validateAccountId', 'setMessage'
      ]),

      handleValidate: function(e) {
        e.target.$validity.validate(_ => {

        })
      },

      handleSubmit: function() {
        if (this.accountId) {
          this.$http({
            method: 'post',
            url: '/user/create_token',
            params: {
              account_id: this.accountId
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              // TODO: handle login success
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
        }
      },
      toggleAccounts: function() {
        this.showAccounts = !this.showAccounts
      },

      chooseAccountId: function(item) {
        this.accountId = item
        this.showAccounts = false
      },

      deleteAccountId: function() {

      }
    },
  }
</script>