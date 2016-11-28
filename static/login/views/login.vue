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
        <div class="tailIcon" @click="changeIcon">
          <icon :name="tailIcon" fill-color="#fff"></icon>
        </div>
      </div>
      <p v-if="usernameInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ usernameTip }}</p>
      <p v-if="!usernameInvalid && passwordInvalid" class="errors">
        <icon name="info-circle" scale=".8" fill-color="#ff3860"></icon>&nbsp{{ passwordTip }}</p>
      <p v-if="!usernameInvalid && !passwordInvalid" class="errors">&nbsp</p>
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
              this.addAccountExistence({account: val, exists: json.exists})
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
        tailIcon: 'eye',
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

      usernameTip: function() {
        let res = ''
        if (this.$refs.username && this.$refs.username.result.invalid) {
          res = this.$refs.username.result.errors && this.$refs.username.result.errors[0].message
        }
        return res
      },

      passwordInvalid: function() {
        return this.$validation.login &&
          this.$validation.login.password &&
          this.$validation.login.password.invalid
      },

      passwordTip: function() {
        let res = ''
        if (this.$refs.password && this.$refs.password.result.invalid) {
          res = this.$refs.password.result.errors && this.$refs.password.result.errors[0].message
        }
        return res
      },
    },

    methods: {
      ...mapActions([
        'addAccountExistence', 'setLoginAccount'
      ]),

      handleValidate: function(e) {
        e.target.$validity.validate(() => {})
      },

      handleSubmit: function() {
        if (this.$validation.login.valid && this.username && this.password) {
          this.$http({
            method: 'post',
            url: '/user/create_token',
            params: {
              account_id: this.username,
              password: this.password
            }
          }).then(response => {
            let result = response.json()
            if (result.success) {

            } else {
              return Promise.reject('account.error.invalidPassword')
            }
          })
        }
      },

      changeIcon: function(){
        if( this.tailIcon === 'eye') {
          this.tailIcon = 'eye-slash'
          this.$refs.password.$el.type = 'text'
        }else{
          this.tailIcon = 'eye'
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