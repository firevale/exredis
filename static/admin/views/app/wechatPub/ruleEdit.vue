<template>
  <div style="position: relative">
    <form class="post" @submit.prevent="handleSubmit">
      <div>
        <label> {{ $t('admin.wcp.keywords') }}: </label>
        <p class="control is-horizontal" style="margin-bottom: 1.5rem">
          <input class="input" style="border-radius: 0" type="text" v-model.trim="rule.keywords" :placeholder="$t('admin.wcp.keywordsPlaceholder')"></input>
        </p>
      </div>
      <div>
        <label> {{ $t('admin.wcp.response') }}: </label>
        <textarea class="textarea" rows="4" :placeholder="$t('admin.wcp.responsePlaceholder')" v-model.trim="rule.response" />
        <!--<quill-editor v-model.trim="rule.response" :placeholder="$t('admin.wcp.responsePlaceholder')" @ready="setEditor"
          @input="handleValidation($v.rule.response)" @image="onInsertImage">
        </quill-editor>-->
      </div>
      <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
        <span class="icon is-sign">!</span>
        <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
      </div>
      <div class="tile is-full has-text-centered">
        <p style="margin: 5px auto">
          <input type="submit" style="display: inline-block; font-size: 1rem;" :value="$t('admin.wcp.btnTitle')"
            class="button is-primary" :class="processing || $v.$invalid ? 'is-disabled' : ''" :disabled="$v.$invalid"
          />
        </p>
      </div>
    </form>
  </div>
</template>
<script>
import {
  required,
} from 'vuelidate/lib/validators'

import {
  showImageUploadDialog
} from 'common/components/imageUpload'
import {
  showProgress
} from 'common/components/progress'

import Toast from 'common/components/toast'

import * as utils from 'common/js/utils'
import * as acs from 'common/js/acs'

const touchMap = new WeakMap()

export default {
  computed: {
    errorHint: function() {
      if (!this.$v.rule.keywords.required) {
        return this.$t('admin.wcp.keywordsRequired')
      } else if (!this.$v.rule.keywords.maxLength) {
        return this.$t('error.validation.postTitleMaxLength')
      } else if (!this.$v.rule.keywords.emoji) {
        return this.$t('error.validation.emojiPostTitle')
      } else if (!this.$v.rule.response.required) {
        return this.$t('error.validation.responseRequired')
      }
      return ''
    },
  },

  validations: {
    rule: {
      keywords: {
        required,
        maxLength: utils.maxLength(250),
        emoji: function(val) {
          return !(/\ud83d[\ude00-\ude4f]/.test(val))
        },
      },
      response: {
        required,
      }
    }
  },

  data() {
    return {
      rule: Object,
      processing: false,
      editor: undefined,
    }
  },

  mounted: function() {
    this.rule = this.$route.params.rule
  },

  methods: {
    setEditor: function(editor) {
      this.editor = editor
    },

    handleValidation: function($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch(), 2000))
    },

    onInsertImage: async function(editor) {
      showImageUploadDialog(this.$i18n, {
        postAction: '/admin_actions/wcp/upload_wcp_image',
        maxLength: 800,
        destFormat: 'image/jpeg',
        destQuality: 90,
        data: {
          app_id: this.rule.app_id,
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        callback: response => {
          if (response.success) {
            editor.focus()
            let index = editor.getSelection().index
            editor.insertEmbed(index, 'image', response.link)
            editor.formatText(index, 1, 'width', response.width)
            editor.formatText(index, 1, 'height', response.height)
          } else if (response.i18n_message) {
            Toast.show(this.$t(response.i18n_message, response.i18n_message_object))
          } else if (response.message) {
            Toast.show(response.message)
          } else {
            Toast.show(this.$t('error.server.networkError'))
          }
        },
      })
    },

    handleSubmit: async function() {
      if (!this.$v.$invalid && !this.processing) {
        this.processing = true
        let result = await this.$acs.updateWcpRules(this.rule)

        if (result.success) {
          Toast.show(this.$t('admin.wcp.operateSuccess'))
          this.$router.replace({
            name: 'WcpRules'
          })
        }
        this.processing = false
      }
    },
  },
}
</script>