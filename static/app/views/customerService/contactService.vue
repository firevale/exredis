<template>
  <div class="contact-service">
    <form v-if="appDetail.cs_phone_number" class="post" @submit.prevent="handleSubmit">
      <div>
        <textarea class="textarea is-medium" v-model="title" :placeholder="$t('customerService.contactPlaceHolder')"></textarea>
      </div>
      <div class="contact-center">
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <input class="button is-info is-medium" :disabled="$v.$invalid" :class="processing || $v.$invalid ? 'is-disabled' : ''" type="submit"
              :value="$t('customerService.submitBtn')"></input>
          </div>
        </nav>
      </div>
      <div>
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <div class="bottom-content">
              <p class="subtitle is-6">{{$t('customerService.contactService.hotline') }} :
                <span>{{appDetail.cs_phone_number}}</span>
              </p>
              <p class="subtitle is-6">{{$t('customerService.contactService.officialHomePage') }} :
                <span>{{appDetail.website_url}}</span>
              </p>
              <p class="subtitle is-6">{{$t('customerService.contactService.weChat') }} :
                <span>{{appDetail.public_weixin_name}}</span>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div class="bottom-content">
              <p class="subtitle is-6">{{$t('customerService.contactService.officialForum') }} :
                <span>{{appDetail.forum_url}}</span>
              </p>
              <p class="subtitle is-6">{{$t('customerService.contactService.officialPostBar') }} :
                <span>{{appDetail.baidu_tieba_name}}</span>
              </p>
              <p class="subtitle is-6">{{$t('customerService.contactService.officialMicroBlog') }} :
                <span>{{appDetail.weibo_name}}</span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </form>
  </div>
</template>
<script>
import Toast from 'common/components/toast'

import {
  required,
} from 'vuelidate/lib/validators'

import {
  minLength,
  maxLength
} from 'common/js/utils'

export default {
  mounted: async function() {
    await this.getAppDetail()
  },
  data() {
    return {
      title: '',
      processing: false,
      appDetail: {}
    }
  },
  validations: {
    title: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(300)
    }
  },
  methods: {
    handleSubmit: async function() {
      if (!this.$v.$invalid && !this.processing) {
        this.processing = true
        let appId = this.$router.currentRoute.params.appId
        let result = await this.$acs.addContact(appId, this.title)

        if (result.success) {
          Toast.show(this.$t('customerService.contactService.addSuccess'))
          this.$router.replace({
            name: 'myService'
          })
        }
        this.processing = false
      }
    },
    getAppDetail: async function() {
      let appId = this.$router.currentRoute.params.appId
      let result = await this.$acs.getAppDetail(appId)
      if (result.success) {
        this.appDetail = result.app
      }
    }
  }
}
</script>