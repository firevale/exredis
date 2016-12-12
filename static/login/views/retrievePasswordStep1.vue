<template>
  <div class="login-box">  
    <validation name="retrieve" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title">{{ $t('account.loginPage.retrievePasswordTitle') }}</p>
      </div>
      <p class="code-tip">
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
        <span class="icon addon-icon icon-user"></span>
      </div>
      <p class="errors">
        <span v-if="errorMessage" class="icon error-sign"></span>
        <span>{{ errorMessage }}</span>
      </p>
      <div class="row-login">
        <input type="submit" :value="$t('account.retrievePasswordPage.nextStep')" />
      </div>
    </validation>
  </div>
</template>

<script>
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
        'loginAccount', 'invalidAccountIdErrorMessage', 'accountIdPlaceholder' 
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
              this.$router.replace({
                name: 'retrievePasswordStep2',
                query: {
                  accountId: btoa(this.accountId)
                }
              })
            } else {
              this.errorMessage = this.$t(result.message)
            }
          })
        }
      },
    },
  }
</script>