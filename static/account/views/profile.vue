<template>
<div class="login-box">
  <validation name="personal">
    <div class="row-login">
      <p class="title" style="font-size: 1.2rem; line-height: 1rem;">{{ $t('account.profile.title') }}</p>
    </div>
    <div class="row-login" style="-webkit-justify-content: center; justify-content: center; margin-top: .2rem;">
      <img class="is-84x84" :src="avatarUrl" @click="changePortrait"></img>
    </div>
    <div class="row-login">
      <div style="text-align: right; width: 50%; margin-right: 10px">
        <span class="nickname-label"> {{ $t('account.label.userId') }}: </span>
        <span class="nickname"> {{ user.id }} </span>
      </div>
      <div style="text-align: left; width: 50%">
        <span class="nickname-label"> {{ $t('account.label.mobile') }}: </span>
        <span class="nickname" v-if="user.mobile"> {{ user.mobile }} </span>
        <span class="nickname" v-else>
          <a :href="bindMobileLink">{{ $t('account.label.notBind') }}</a>
        </span>
      </div>
    </div>
    <div v-show="!editingNickname" style="text-align: center;">
      <span class="nickname-label">{{ $t('account.label.nickname') }}: </span>
      <span class="nickname">{{ user.nickname }}</span>
      <span class="icon edit-sign" @click="editingNickname = true"></span>
    </div>
    <div v-show="editingNickname" class="row-login" style="-webkit-justify-content: center; justify-content: center;">
      <span class="nickname-label" style="margin-right: 5px">{{ $t('account.label.nickname') }}: </span>
      <validity ref="accountId" field="accountId" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')},
                isValidNickname: {rule: true, message: ''},
                }">
        <input type="text" maxlength="12" minlength="6" class="nickname" style="max-width: 100px" v-model.trim="user.nickname"
            autocomplete="off" name="user" @focusout="handleValidate" />
      </validity>
      <input class="confirm-button" type="button" :value="$t('account.profile.confirm')" @click="onSaveNickName"></input>
      <span v-show="!user.nickname" class="icon addon-icon error-sign pull-right" style="right: 3.6rem;"></span>
    </div>
    <div style="text-align: center">
      <span class="nickname-label"> {{ $t('account.label.email') }}: </span>
      <span class="nickname"> {{ user.email }} </span>
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
    isValidNickname: function(val) {
      return this.validateNickName(val)
        .then(result => {
          return result ? Promise.resolve() : Promise.reject()
        })
    },
  },

  data: function() {
    return {
      processing: false,
      editingNickname: false,
      isMobileAccountSupported: window.acsConfig.isMobileAccountSupported,
    }
  },

  computed: {
    ...mapGetters([
      'user', 'avatarUrl'
    ]),

    bindMobileLink: function() {
      return `/login/registerStep1?bindUserId=${this.user.id}&bindType=modile`
    }
  },

  methods: {
    validateNickName() {
      return false
    },

    handleValidate: function(e) {
      console.log(e.target)
    },

    onSaveNickName() {
      if (this.$validation.personal.valid && this.accountId && this.nickName) {
        this.processing = true
        this.$http({
            method: 'post',
            url: '/login/saveNickName',
            params: {
              nickName: this.nickName
            }
          })
          .then(response => {
            this.processing = false
            return response.json()
          })
          .then(result => {
            if (result.success) {
              console.log("processing login success....")
            } else {

            }
          })
          .catch(_ => {
            this.processing = false
          })
      }
    },

    changeAccount() {
      this.$router.push({
        name: 'login'
      })
    },

    changePortrait() {
      this.$router.push({
        name: 'avatar'
      })
    }
  },
}
</script>
