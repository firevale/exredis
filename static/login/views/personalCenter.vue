<template>
  <div class="login-box">  
    <validation name="retrieve" @submit.prevent="handleSubmit">
      <div class="row-login">
        <p class="title" style="font-size: 1.2rem;line-height: 1rem;">{{ $t('account.personalCenter.title') }}</p>
      </div>
      <div class="row-login" style="justify-content: center;">
        <img class="is-64x64"></img>
      </div>
      <div class="row-login">
        <span class="nick-txt">昵称：</span>
        <validity ref="accountId" field="accountId" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                validAccountId: {rule: true, message: invalidAccountIdErrorMessage},
                }">
          <input type="text" maxlength="12" minlength="6" class="nick-name" :placeholder="accountIdPlaceholder"
            v-model.trim="accountId" autocomplete="off" name="user" @focusout="handleValidate" />
        </validity>
        <span class="confirm-button">确定</span>
        <span class="icon addon-icon error-sign pull-right" style="right: 5rem;"></span>
      </div>
      <p class="user-name">
        {{ userName }}
      </p>
      <div class="row-login">
        <input type="submit" :class="{'is-disabled': processing}" :value="$t('account.personalCenter.changeAccount')" :disabled="processing"/>
        <span v-show="processing" class="icon progress-icon rotating"></span
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
        processing: false,
      }
    },

    computed: {
      userName(){
        return "用户名：test@firevale.com"
      },

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
          this.processing = true
          this.$http({
            method: 'post',
            url: '/send_retrieve_password_verify_code',
            params: {
              account_id: this.accountId,
            }
          }).then(response => {
            this.processing = false
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
          }).catch(e => {
            this.processing = false
            this.errorMessage = this.$t('account.error.networkError')
          })
        }
      },
    },
  }
</script>