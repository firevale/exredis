<template>
  <div class="g-con">
    <div class="login-box">
      <validation name="login" @submit="handleSubmit">
        <div class="row-login">
          <p>{{ $t('account.login_page.title') }}</p>
          <icon class="" name="times" scale="1" fill-color="#eee" style="position: absolute; right: -0.6rem;"></icon>
        </div>
        <div class="row-login">
          <validity ref="username" field="username" :validators="{
            required: {rule: true, message: $t('account.error.requireUserName')}, 
            maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
            validateUsername: {rule: true, message: this.isMobileRegisterSupported? $t('account.error.invalidAccountName'):$t('account.error.invalidEmailAddress') },
            accountExists: {rule: true, message: $t('account.error.accountNotExist')},
          }">
            <input type="text" v-model.trim="username" autocomplete="off" name="user" @focusout="handleValidate" 
              :placeholder="this.isMobileRegisterSupported? $t('account.login_page.userPlaceHolder'): $t('account.login_page.userOnlyEmailPlaceHolder')"
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
            <input type="password" v-model.trim="password" autocomplete="off" name="password" @focusout="handleValidate"
              :placeholder="$t('account.login_page.userPasswordPlaceHolder')" />
          </validity>
          <div class="headerIcon">
            <icon name="lock" fill-color="#fff"></icon>
          </div>
        </div>
        <p v-if="usernameInvalid" class="errors">
          <icon name="info-circle" fill-color="#ff3860"></icon>{{ usernameTip }}
        </p>
        <p v-else v-if="passwordInvalid" class="errors">
          <icon name="info-circle" fill-color="#ff3860"></icon>{{ passwordTip }}
        </p>
        <div class="row-login">
          <input type="submit" :value="$t('account.login_page.btnSubmit')"/>
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
  </div>
</template>
<script>
  import utils from '../common/utils'
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  import '../components/fvIcon/icons/info-circle'
  import '../components/fvIcon/icons/user-o'
  import '../components/fvIcon/icons/lock'

  import Vue from 'vue'

  export default {
    validators: {
      validateUsername: function(val) {
        if (this.isMobileRegisterSupported) {
          return utils.validateEmail(val) || utils.validatePhoneNumber(val)
        } else {
          return utils.validateEmail(val) 
        }
      },

      accountExists: function(val) {
        return Vue.http.post('/user/is_account_exists', {
          user_key: val
        }).then(res => {
          return res.json()
        }).then(json => {
          return json['exists'] ? Promise.resolve() : Promise.reject('')
        })
      },
    },

    data: function() {
      return {
        isMobileRegisterSupported: window.acsConfig.isMobileRegisterSupported,
        username: '',
        password: '',
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
      usernameInvalid: function() {
        return this.$validation.login &&
          this.$validation.login.username &&
          this.$validation.login.username.invalid
      },

      usernameTip: function() {
        let res = ''
        if (this.$refs.username.result.invalid) {
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
        if (this.$refs.password.result.invalid) {
          res = this.$refs.password.result.errors && this.$refs.password.result.errors[0].message
        }
        return res
      },


    },

    methods: {
      handleValidate: function(e) {
        e.target.$validity.validate(() => {
        })
      },

      handleSubmit: function() {
        if (this.$validation.login.valid) {
          this.$http({
            method: 'post',
            url: '/user/create_token',
            params: {}
          }).then(response => {
            let result = response.json()
            if (result.success) {

            } else {
              return Promise.reject('account.error.invalidPassword')
            }
          })
        } else {
          this.resetValidation()
        }
      },
    },

    components: {
      'icon': Icon,
    }

  }
</script>
<style lang="scss">
  @import '../scss/login';
</style>