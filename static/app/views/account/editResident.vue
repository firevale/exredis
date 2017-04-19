<template>
  <div class="edit-account">
    <form class="account-fields" @submit.prevent="onSubmit">
      <div>
        <div class="field">
          <p class="control has-icon">
            <input class="input" type="text" v-model.trim="residentName" @input="handleValidation" :placeholder="$t('account.placeholder.inputResidentName')"
            />
            <span class="icon image-icon icon-user"></span>
          </p>
        </div>
        <div class="field">
          <p class="control has-icon has-button has-button-right">
            <input class="input" type="text" v-model.trim="residentId" :placeholder="$t('account.placeholder.inputResidentId')" />
            <span class="icon image-icon icon-shield"></span>
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
  maxLength,
} from 'vuelidate/lib/validators'

import formMixin from './formMixin'

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
    this.residentId = this.userInfo.resident_id
    this.residentName = this.userInfo.resident_name
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

          this.$nextTick(_ => {
            Toast.show(this.$t('account.messages.residentInfoUpdateds'))
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