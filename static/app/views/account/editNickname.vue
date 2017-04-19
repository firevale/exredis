<template>
  <div class="edit-account">
    <form class="account-fields" @submit.prevent="onSubmit">
      <p v-show="userInfo.nickname" class="help is-primary"> {{ $t('account.hint.currentNickName', {nickname: userInfo.nickname}) }} </p>
      <div>
        <div class="field">
          <p class="control has-icon">
            <input class="input" type="text" v-model.trim="nickname" @input="handleValidation" :placeholder="$t('account.placeholder.inputNickname')"
            />
            <span class="icon image-icon icon-edit"></span>
          </p>
        </div>
      </div>
      <p v-show="errorHint" class="help is-danger"> <span class="icon image-icon icon-error-sign"></span> {{ errorHint }} </p>
      <v-touch tag="button" type="submit" class="button is-info is-submit" :class="{'is-disabled': $v.$invalid,
        'is-loading': processing}">
        {{ $t('account.update') }}
      </v-touch>
    </form>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

import formMixin from './formMixin'

import * as utils from 'common/js/utils'

import Toast from 'common/components/toast'

export default {
  data() {
    return {
      nickname: '',
      errorMessage: '',
      processing: false,
    }
  },

  validations: {
    nickname: {
      required,
      minLength: utils.minLength(4),
      maxLength: utils.maxLength(20),
      valid: function(val) {
        return !(/\%/.test(val))
      },
      emoji: function(val) {
        return !(/\ud83d[\ude00-\ude4f]/.test(val))
      }
    }
  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),
  },

  methods: {
    ...mapActions(['updateUserNickname']),

    onSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.updateUserNickname({
          nickname: utils.formatEmojiChars(this.nickname)
        })
        if (result.success) {
          this.updateUserNickname(this.nickname)

          this.$nextTick(_ => {
            Toast.show(this.$t('account.messages.nicknameUpdated', {
              nickname: this.nickname
            }))
            this.$router.back()
          })
        } else {
          this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object))
        }
        this.processing = false
      }
    },
  },

  mixins: [formMixin]
}
</script>