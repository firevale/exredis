<template>
  <div class="login-box">
    <div class="row-login">
      <p class="title">{{ $t('account.loginPage.otherWays') }}</p>
    </div>
    <div class="horizontal-stack-box">
      <div class="tile" v-for="accountType in accountTypes">
        <a class="sdk-icon" :class="accountType" @click="onLoginByType(accountType)">
        </a>
        <p>{{ $t(`account.types.${accountType}`) }}</p>
      </div>
    </div>
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
        accountTypes: ['anonymous', 'firevale']
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

      onLoginByType: function(accountType) {
        switch(accountType) {
          case 'firevale':
            this.$router.push({
              name: 'login'
            })
            break;
          case 'anonymous':
            break;
        }
      },
    },

    components: {
      'icon': Icon,
    }
  }
</script>