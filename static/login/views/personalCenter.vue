<template>
  <div class="login-box">
    <validation name="personal">
      <div class="row-login">
        <p class="title" style="font-size: 1.2rem;line-height: 1rem;">{{ $t('account.personalCenter.title') }}</p>
      </div>
      <div class="row-login" style="justify-content: center;margin-top: .1rem;">
        <img class="is-84x84" :src="picUrl" @click="changePortrait"></img>
      </div>
      <div v-show="!editNick" style="text-align: center;">
        <span class="nick-txt">{{ $t('account.personalCenter.nickName') }}</span>
        <span class="nick-name" style="color: black;">{{ nickName }}</span>
        <span class="icon edit-sign" @click="editNick=!editNick"></span>
      </div>
      <div v-show="editNick" class="row-login">
        <span class="nick-txt">{{ $t('account.personalCenter.nickName') }}</span>
        <validity ref="accountId" field="accountId" :validators="{
                required: {rule: true, message: $t('account.error.requireUserName')}, 
                }">
          <input type="text" maxlength="12" minlength="6" class="nick-name" v-model.trim="nickName" autocomplete="off" name="user"
            @focusout="handleValidate" />
        </validity>
        <input class="confirm-button" type="button" :value="$t('account.personalCenter.confirm')" @click="onSaveNickName"></input>
        <span v-show="!nickName" class="icon addon-icon error-sign pull-right" style="right: 3.6rem;"></span>
      </div>
      <p class="user-name">
        {{ userName }}
      </p>
      <div class="row-login">
        <input type="submit" class="submit-button" :class="{'is-disabled': processing}" :value="$t('account.personalCenter.changeAccount')"
          :disabled="processing" @click="changeAccount" />
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
    data: function() {
      return {
        nickName: '火谷测试',
        picUrl: '',
        processing: false,
        editNick: false,
      }
    },

    computed: {
      userName(){
        return this.$t('account.personalCenter.userNameStr',{ nickName: 'test@firevale.com' })
      },
    },

    methods: {
      handleValidate: function(e) {
        e.target.$validity.validate(_ => {
          
        })
      },

      onSaveNickName(){
        if (this.$validation.personal.valid && this.accountId && this.nickName) {
          this.processing = true
          this.$http({
            method: 'post',
            url: '/login/saveNickName',
            params: {
              account_id: this.accountId,
              nickName: this.nickName
            }
          }).then(response => {
            this.processing = false
            return response.json()
          }).then(result => {
            if (result.success) {
              console.log("processing login success....")
            } else {

            }
          }).catch(_ => {
            this.processing = false
          })
        }
      },
      
      changeAccount(){
        this.$router.push({name:'login'})
      },

      changePortrait(){
        this.$router.push({name:'personalPortrait'})
      }
    },
  }
</script>