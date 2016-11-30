<template>
  <div class="login-box">
    <validation name="retrieve" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="codeTip">
        {{ $t('account.retrievePasswordPage.pleaseInputAccountName') }}:
      </p>
      <div class="row-login">
        <validity ref="accountId" field="accountId" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                maxlength: {rule: 50, message: $t('account.error.userNameTooLong')},
                validAccountId: {rule: true, message: invalidAccountIdErrorMessage},
                }">
          <input type="text" class="outsideText" :placeholder="accountIdPlaceholder"
            v-model.trim="accountId" autocomplete="off" name="user" @focusout="handleValidate" />
        </validity>
        <div class="headerIcon"><icon name="user-o"></icon></div>
      </div>

      <p class="errors">
        <icon v-if="errorMessage" name="info-circle" scale=".8" :fill-color="colors.danger"></icon>&nbsp{{ errorMessage }}
      </p>
      
      <div class="row-login">
        <input type="submit" :value="$t('account.retrievePasswordPage.nextStep')" />
      </div>
    </validation>
  </div>
</template>

<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/user-o'
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
        errorMessage: '',
      }
    },

    computed: {
      ...mapGetters([
        'loginAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder', 'colors'
      ]),
    },

    methods: {
      ...mapActions([
        'validateAccountId' 
      ]),

      handleValidate: function(e) {
        e.target.$validity.validate(_ => {
          if (this.$refs.accountId &&
            this.$refs.accountId.invalid &&
            this.$refs.accountId.result.errors.length > 0) {
            this.errorMessage = this.$refs.accountId.result.errors[0].message
          } else {
            this.errorMessage = ''
          }
        })
      },

      handleSubmit: function(e) {
        if (this.$validation.retrieve.valid && this.accountId) {
          this.$http({
            method: 'post',
            url: '/send_retrieve_password_verify_code',
            params: {
              account_id: this.accountId,
            }
          }).then(response => {
            return response.json()
          }).then(result => {
            if (result.success) {
              this.$router.replace({name: 'retrievePasswordStep2', params: {accountId: this.accountId}})
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