<template>
  <div class="login-box">
    <div class="row-login">
      <p class="title">{{ $t('account.loginPage.otherWays') }}</p>
    </div>
    <div class="row-login" style="flex-wrap: wrap; justify-content: center;">
      <div class="tileWays" v-for="item in otherWays" @click="onLoginByType(item)">
        <figure>
          <img :src="item.img"></img>
        </figure>
        <p>{{ item.name }}</p>
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
        showAccounts: false,
        otherWays: [
          {img: '', name: '快速游戏'},
          {img: '', name: 'QQ'},
          {img: '', name: '微博'},
          {img: '', name: '微信'},
        ]
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
      
      toggleAccounts: function(){
        this.showAccounts = !this.showAccounts
      },

      chooseAccountId: function(item){
        this.accountId = item
        this.showAccounts = false
      },

      deleteAccountId: function(){
        
      },

      onLoginByType: function(){

      },
    },

    components: {
      'icon': Icon,
    }
  }
</script>
<style lang="scss">

</style>