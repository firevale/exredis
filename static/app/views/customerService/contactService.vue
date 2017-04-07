<template>
  <div class="contact-service">
    <form class="post" @submit.prevent="handleSubmit">
      <div class="contact-top">
        <textarea class="textarea is-large" v-model="title" :placeholder="$t('customerService.contactPlaceHolder')"></textarea>
      </div>
      <div class="contact-center">
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <input class="button is-info" :class="processing || $v.$invalid ? 'is-disabled' : ''" type="submit" :value="$t('customerService.submitBtn')"></input>
          </div>
        </nav>
      </div>
      <div>
        <nav class="level is-mobile">
          <!-- Left side -->
          <div class="level-item has-text-centered">
            <div class="bottom-left">
              <div>{{$t('customerService.contactService.hotline') }} : <span>{{appDetail.cs_phone_number}}</span></div>
              <div>{{$t('customerService.contactService.officialHomePage') }} : <span>{{appDetail.website_url}}</span></div>
              <div>{{$t('customerService.contactService.weChat') }} : <span>{{appDetail.public_weixin_name}}</span></div>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-item has-text-centered">
            <div class="bottom-right">
              <div>{{$t('customerService.contactService.officialForum') }} : <span>{{appDetail.forum_url}}</span></div>
              <div>{{$t('customerService.contactService.officialPostBar') }} : <span>{{appDetail.baidu_tieba_name}}</span></div>
              <div>{{$t('customerService.contactService.officialMicroBlog') }} : <span>{{appDetail.weibo_name }}</span></div>
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
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    mounted: async function () {
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
      handleSubmit: async function () {
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
      getAppDetail: async function () {
        let appId = this.$router.currentRoute.params.appId
        let result = await this.$acs.getAppDetail(appId)
        if (result.success) {
          this.appDetail = result.app
        }
      }
    }
  }
</script>