<template>
  <div class="login-box">
    <validation name="login" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.login_page.title') }}</p>
      </div>
      <div class="row-login">
        <validity ref="username" field="username" :validators="{
            required: {rule: true, message: $t('account.error.requireUserName')}, 
            maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
            isValidAccountName: {rule: true, message: isMobileRegisterSupported? $t('account.error.invalidAccountName'):$t('account.error.invalidEmailAddress') },
            accountExists: {rule: true, message: $t('account.error.accountNotExist')},
          }">
          <input type="text" v-model.trim="username" autocomplete="off" name="user" @focusout="handleValidate" :placeholder="this.isMobileRegisterSupported? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')"
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
          <input ref="password" type="password" v-model.trim="password" autocomplete="off" name="password" @focusout="handleValidate" :placeholder="$t('account.login_page.userPasswordPlaceHolder')"
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
        <input type="submit" :value="$t('account.login_page.btnSubmit')" />
      </div>
      <div class="row-login">
        <router-link :to="{ name: 'register' }">{{ $t('account.login_page.registration') }}</router-link>
        <router-link :to="{ name: 'retrievePassword' }">{{ $t('account.login_page.forgetPassword') }}</router-link>
      </div>
      <div class="row-login">
        <hr>
        <span>{{ $t('account.login_page.otherWays') }}</span>
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
      isValidAccountName: function(val) {
        if (this.isMobileRegisterSupported) {
          return utils.isValidEmail(val) || utils.isValidMobileNumber(val)
        } else {
          return utils.isValidEmail(val)
        }
      },

      accountExists: function(val) {
        this.setLoginAccount(val)

        if (!val) {
          return Promise.reject('')
        } else {
          if (typeof this.accountExistences[val] === 'boolean') {
            return this.accountExistences[val] ? Promise.resolve() : Promise.reject('')
          } else {
            return Vue.http.post('/user/is_account_exists', {
              account_id: val
            }).then(res => {
              return res.json()
            }).then(json => {
              this.addAccountExistence({
                account: val,
                exists: json.exists
              })
              return json.exists ? Promise.resolve() : Promise.reject('')
            })
          }
        }
      },
    },

    beforeMount: function() {
      this.username = this.loginAccount
    },

    data: function() {
      return {
        isMobileRegisterSupported: window.acsConfig.isMobileRegisterSupported,
        username: '',
        password: '',
        passwordIcon: 'eye',
        serverError: '',
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
        'accountExistences', 'loginAccount'
      ]),

      usernameInvalid: function() {
        return this.$validation.login &&
          this.$validation.login.username &&
          this.$validation.login.username.invalid
      },

      passwordInvalid: function() {
        return this.$validation.login &&
          this.$validation.login.password &&
          this.$validation.login.password.invalid
      },

      errorMessage: function() {
        if (this.usernameInvalid) {
          return this.$refs.username.result.errors[0].message
        } else if (this.passwordInvalid) {
          return this.$refs.password.result.errors[0].message
        }

        return this.serverError
      },
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setLoginAccount'
      ]),

      handleValidate: function(e) {
        this.serverError = ''
        e.target.$validity.validate(_ => {})
      },

      handleSubmit: function() {
        this.serverError = ''
        if (this.$validation.login.valid && this.username && this.password) {
          this.$http({
            method: 'post',
            url: '/user/create_token',
            params: {
              account_id: this.username,
              password: this.password
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              // TODO: handle login success
            } else {
              this.serverError = this.$t(result.message)
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