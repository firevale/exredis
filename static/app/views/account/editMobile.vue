<template>
  <div class="edit-account">
    <form class="account-fields" @submit.prevent="onSubmit">
      <p v-show="userInfo.mobile" class="help is-primary"> {{ $t('account.hint.currentBoundModile', {mobile: boundMobile}) }} </p>
      <div>
        <div class="field">
          <p class="control has-icon">
            <input class="input" type="text" v-model.trim="mobile" @input="handleValidation" :placeholder="$t('account.placeholder.inputMobileNumber')"
            />
            <span class="icon image-icon icon-mobile"></span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icon has-button has-button-right">
            <input class="input" type="text" v-model.trim="verifyCode" :placeholder="$t('account.placeholder.inputVerifyCode')" />
            <span class="icon image-icon icon-shield"></span>
            <v-touch tag="a" class="button is-primary" :class="$v.mobile.$invalid ? 'is-disabled' : ''">
              {{ $t('account.fetchVeiryCode') }}
            </v-touch>
          </p>
        </div>
        <div class="field">
          <p class="control has-icons-left has-icons-right">
            <input ref="password" class="input" type="password" v-model.trim="password" :placeholder="$t('account.placeholder.inputPassword')" />
            <span class="icon is-left image-icon icon-lock"></span>
            <v-touch tag="span" v-if="showPassword" class="icon is-right image-icon icon-eye is-clickable" @tap="togglePasswordVisibility"></v-touch>
            <v-touch tag="span" v-else class="icon is-right image-icon icon-eye-slash is-clickable" @tap="togglePasswordVisibility"></v-touch>
          </p>
        </div>
      </div>
      <p v-show="errorHint" class="help is-danger"> <span class="icon image-icon icon-error-sign"></span> {{ errorHint }} </p>
      <v-touch tag="input" type="submit" class="button is-info is-submit" :class="$v.$invalid ? 'is-disabled' : ''" :value="$t('account.bind')">
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

import {
  password,
  verifyCode
} from './validators'

import formMixin from './formMixin'

import * as utils from 'common/js/utils'

export default {
  data() {
    return {
      mobile: '',
      verifyCode: '',
      password: null,
      errorMessage: '',
      showPassword: false,
    }
  },

  validations() {
    let mobile = {
      required,
      valid: function(val) {
        return utils.isValidMobileNumber(val)
      },
      changed: function(val) {
        return utils.isValidMobileNumber(this.userInfo.mobile) ? (val != this.userInfo.mobile) : true
      },
    }

    let password = {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20)
    }
    if (this.userInfo.is_anonymous) {
      return {
        mobile,
        password,
        verifyCode
      }
    } else {
      return {
        mobile,
        verifyCode
      }
    }
  },

  mounted() {

  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),

    boundMobile() {
      return this.userInfo.mobile ? utils.mobileMask(this.userInfo.mobile) : ''
    }
  },

  methods: {
    onSubmit() {

    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword 
      if (this.showPassword) {
        this.$refs.password.type = 'text'
      } 
      else {
        this.$refs.password.type = 'password'
      }
    }
  },

  mixins: [formMixin]
}
</script>