<template>
  <div class="login-box">
    <validation name="retrieve" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="code-tip">
        {{ $t('account.retrievePasswordPage.setNewPassword') }}:
      </p>
      <div class="row-login">
        <validity ref="password" field="password" :validators="{
                required: {rule: true, message: $t('account.error.requirePassword')}, 
                minlength: {rule: 6, message: $t('account.error.passwordWrong')},
                }">
          <input type="password" minlength="6" maxlength="20" :placeholder="$t('account.loginPage.userPasswordPlaceHolder')" 
                 v-model.trim="password" autocomplete="off" name="password" @focusout="handleValidate" />
        </validity>
        <div class="header-icon">
          <icon name="lock" scale="1.3" :fill-color="colors.white"></icon>
        </div>
        <div class="tail-icon" @click="togglePasswordVisibility">
          <icon :name="passwordIcon" scale="1.3" :fill-color="colors.white"></icon>
        </div>
      </div>

      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" :fill-color="colors.danger"></icon>&nbsp{{ errorMessage }}
      </p>
      <p style="margin: 0;">&nbsp</p>
      <div class="row-login">
        <input type="submit" :value="$t('account.retrievePasswordPage.complete')" />
      </div>
    </validation>
  </div>
</template>

<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/lock'
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {

    data: function() {
      return {
        passwordIcon: '',
        password: '',
        errorMessage: '',
      }
    },

    computed: {
      ...mapGetters([
        'colors'
      ]),

      accountId: function() {
        return this.$route.params.accountId
      },

      verifyCode: function() {
        return this.$route.params.verifyCode
      },
    },

    methods: {
      ...mapActions([
        'setLoginAccount'
      ]),

      togglePasswordVisibility: function() {
        if (this.passwordIcon === 'eye') {
          this.passwordIcon = 'eye-slash'
          this.$refs.password.$el.type = 'text'
        } else {
          this.passwordIcon = 'eye'
          this.$refs.password.$el.type = 'password'
        }
      },

      handleValidate: function(e) {
        e.target.$validity.validate(_ => {
          if (this.$refs.password &&
            this.$refs.password.invalid &&
            this.$refs.password.result.errors.length > 0) {
            this.errorMessage = this.$refs.password.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      handleSubmit: function(e) {
        if (this.$validation.retrieve.valid && this.password) {
          this.$http({
            method: 'post',
            url: '/user/update_password',
            params: {
              account_id: this.accountId,
              verify_code: this.verifyCode,
              password: this.password
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              this.setLoginAccount(this.accountId)
              this.$router.back()
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
        }
      },
    },

    components: {
      'icon': Icon,
    }

  }
</script>