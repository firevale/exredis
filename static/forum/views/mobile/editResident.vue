<template>
  <div class="account">
    <form class="account-fields" @submit.prevent="onSubmit">
      <div class="fields">
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model.trim="residentName" @input="handleValidation" :placeholder="$t('forum.placeholder.inputResidentName')">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input" type="text" v-model.trim="residentId" :placeholder="$t('forum.placeholder.inputResidentId')">
          </div>
        </div>
        <div class="field" v-show="errorHint">
          <div class="control">
            <span class="icon icon-error-tip"></span>
            <strong>&nbsp;{{ errorHint }}</strong>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <p class="title"> {{ $t('forum.placeholder.residentIdTips') }}</p>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <v-touch tag="button" type="submit" class="button is-primary is-submit is-fullwidth has-radius" :disabled="$v.$invalid"
              :class="{'is-disabled': $v.$invalid,
    'is-loading': processing}">
              <span class="title is-white">{{ $t('forum.account.confirm') }}</span>
            </v-touch>
          </div>
        </div>
      </div>
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
  maxLength,
} from 'vuelidate/lib/validators'


import formMixin from '../../components/formMixin'
import * as utils from 'common/js/utils'
import Toast from 'common/components/toast'

export default {
  data() {
    return {
      residentId: '',
      residentName: '',
      errorMessage: '',
      processing: false,
    }
  },
  mounted() {
    // this.residentId = this.userInfo.resident_id
    // this.residentName = this.userInfo.resident_name
  },
  validations: {
    residentName: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(30),
    },
    residentId: {
      required,
      minLength: utils.minLength(15),
      maxLength: utils.maxLength(18),
      valid: utils.isValidResidentId,
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
  },
  methods: {
    ...mapActions(['updateUserResidentInfo']),

    onSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.updateUserResidentInfo({
          resident_id: this.residentId,
          resident_name: this.residentName,
        })
        if (result.success) {
          this.updateUserResidentInfo({
            resident_id: this.residentId,
            resident_name: this.residentName,
          })
          window.acsConfig.user.resident_id = this.residentId
          window.acsConfig.user.resident_name = this.residentName

          this.$nextTick(_ => {
            Toast.show(this.$t('forum.account.messages.residentInfoUpdateds'))
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