<template>
  <div class="login-box">
    <validation name="login" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.quickTitle') }}</p>
      </div>
      <div class="row-login">
        <input type="text" onchange="return false" v-model.trim="accountId" name="accountId" readonly @focus="this.showAccounts = true"
        />
        <div class="header-icon">
          <icon name="user-o" scale="1.2" :fill-color="colors.white"></icon>
        </div>
        <div class="tail-icon" @click="toggleAccounts">
          <icon name="caret-down" :fill-color="colors.black"></icon>
        </div>
        <div v-if="showAccounts" ref="accountList" class="accountList">
          <div class="accountItem row-login" v-for="item in accounts" >
            <div @click="chooseAccountId(item)" style="width: 100%;padding: 0;">{{item}}</div>
            <div class="tail-icon" @click="deleteAccountId" style="top:.3rem;height:1rem;">
              <icon name="times"></icon>
            </div>
          </div>
        </div>
      </div>
      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" :fill-color="colors.danger"></icon>&nbsp{{ errorMessage }}
      </p>
      <div class="row-login" style="margin-top: 1rem;">
        <input type="submit" :value="$t('account.loginPage.btnSubmit')" />
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  import '../components/fvIcon/icons/caret-down'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/user-o'
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
        passwordIcon: 'eye',
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
          if (this.$refs.accountId &&
            this.$refs.accountId.invalid &&
            this.$refs.accountId.result.errors &&
            this.$refs.accountId.result.errors.length > 0) {
            this.errorMessage = this.$refs.accountId.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
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
      toggleAccounts: function(){
        this.showAccounts = !this.showAccounts
      },

      chooseAccountId: function(item){
        this.accountId = item
        this.showAccounts = false
      },

      deleteAccountId: function(){
        
      }
    },

    components: {
      'icon': Icon,
    }
  }
</script>
<style lang="scss">

</style>