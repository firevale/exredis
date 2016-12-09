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
  import nativeApi from '../common/nativeApi'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {
    data: function() {
      return {
        accountTypes: ['anonymous', 'firevale']
      }
    },

    methods: {
      ...mapActions([
        'setMessage'
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
        this.$http({
          method: 'post',
          url: '/user/create_anonymous_token',
        }).then(response => {
          return response.json()
        }).then(result => {
          nativeApi.closeLoginDialog(result)
        }).catch(e => {
          
        })
      }
    },
  }
</script>