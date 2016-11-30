<template>
  <div class="login-box">
    <validation name="login" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.title') }}</p>
      </div>
      <div class="row-login">
        <validity ref="accountId" field="accountId" :validators="{
            required: {rule: true, message: $t('account.error.requireUserName')}, 
            maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
            validAccountId: {rule: true, message: invalidAccountIdErrorMessage},
          }">
          <input type="text" v-model.trim="accountId" autocomplete="off" name="user" 
                 @focusout="handleValidate" 
                 :placeholder="accountIdPlaceholder"
          />
        </validity>
        <div class="headerIcon">
          <icon name="user-o"></icon>
        </div>
      </div>
      <div class="row-login">
        <validity ref="password" field="password" :validators="{
              required: {rule: true, message: $t('account.error.requirePassword')}, 
              maxlength: {rule: 20, message: $t('account.error.passwordTooLong')},
          }">
          <input ref="password" type="password" v-model.trim="password" autocomplete="off" name="password" 
                 @focusout="handleValidate" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')"
          />
        </validity>
        <div class="headerIcon">
          <icon name="lock" fill-color="#fff"></icon>
        </div>
        <div class="tailIcon" @click="togglePasswordVisibility">
          <icon :name="passwordIcon" fill-color="#fff"></icon>
        </div>
      </div>
      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ errorMessage }}
      </p>
      <div class="row-login">
        <input type="submit" :value="$t('account.loginPage.btnSubmit')" />
      </div>
      <div class="row-login">
        <router-link :to="{ name: 'register' }">{{ $t('account.loginPage.registration') }}</router-link>
        <router-link :to="{ name: 'retrievePasswordStep1' }">{{ $t('account.loginPage.forgetPassword') }}</router-link>
      </div>
      <div class="row-login">
        <hr>
        <span>{{ $t('account.loginPage.otherWays') }}</span>
        <hr>
      </div>
      <div class="row-login" style="flex-wrap: wrap; justify-content: center;">
        <div class="tileWays" v-for="item in otherWays">
          <figure>
            <img :src="item.img"></img>
          </figure>
          <p>{{ item.name }}</p>
        </div>
      </div>
    </validation>
  </div>
</template>
<script>
  import utils from '../common/utils'
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/user-o'
  import '../components/fvIcon/icons/lock'
  import '../components/fvIcon/icons/eye-slash'
  import '../components/fvIcon/icons/eye'
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
      this.accountId = this.loginAccount
    },

    data: function() {
      return {
        accountId: '',
        password: '',
        passwordIcon: 'eye',
        errorMessage: '',
        otherWays: [{
          img: '',
          name: '快速游戏'
        }, {
          img: '',
          name: '微博'
        }, {
          img: '',
          name: 'QQ'
        }, {
          img: '',
          name: '微信'
        }, ]
      }
    },

    computed: {
      ...mapGetters([
        'loginAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder'
      ]),
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setLoginAccount', 'validateAccountId'
      ]),

      handleValidate: function(e) {
        e.target.$validity.validate(_ => {
          if (this.$refs.accountId &&
            this.$refs.accountId.invalid &&
            this.$refs.accountId.result.errors.length > 0) {
            this.errorMessage = this.$refs.accountId.result.errors[0].message
          } else if (this.$refs.password &&
            this.$refs.password.invalid &&
            this.$refs.password.result.errors.length > 0) {
            this.errorMessage = this.$refs.password.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      handleSubmit: function() {
        if (this.$validation.login.valid && this.accountId && this.password) {
          this.$http({
            method: 'post',
            url: '/user/create_token',
            params: {
              account_id: this.accountId,
              password: this.password
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

      togglePasswordVisibility: function() {
        if (this.passwordIcon == 'eye') {
          this.passwordIcon = 'eye-slash'
          this.$refs.password.$el.type = 'text'
        } else {
          this.passwordIcon = 'eye'
          this.$refs.password.$el.type = 'password'
        }
      },
    },

    components: {
      'icon': Icon,
    }
  }
</script>
<style lang="scss">

</style>