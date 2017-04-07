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
              <div>{{$t('customerService.contactService.hotline') }} : <span>010-23456789</span></div>
              <div>{{$t('customerService.contactService.officialHomePage') }} : <span>firevale.qs.com</span></div>
              <div>{{$t('customerService.contactService.weChat') }} : <span>firevaleqs</span></div>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-item has-text-centered">
            <div class="bottom-right">
              <div>{{$t('customerService.contactService.officialForum') }} : <span>firevale.qs.lt.com</span></div>
              <div>{{$t('customerService.contactService.officialPostBar') }} : <span>{{$t('customerService.contactService.sharpshooterRevelation') }}</span></div>
              <div>{{$t('customerService.contactService.officialMicroBlog') }} : <span>{{$t('customerService.contactService.sharpshooterRevelation') }}</span></div>
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
    data() {
      return {
        title: '',
        processing: false
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
      }
    }
  }
</script>