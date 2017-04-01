<template>
  <div class="contact-service">
    <form class="post" @submit.prevent="handleSubmit">
      <div class="contact-top">
        <textarea class="textarea is-large" v-model="title" :placeholder="$t('customerService.contactPlaceHolder')"></textarea>
      </div>
      <div class="contact-center">
        <nav class="level is-mobile">
          <div class="level-item has-text-centered">
            <input class="button is-info" :class="processing ? '' : 'is-disabled'" type="submit" :value="$t('customerService.submitBtn')"></input>
          </div>
        </nav>
      </div>
      <div>
        <nav class="level is-mobile">
          <!-- Left side -->
          <div class="level-item has-text-centered">
            <div class="bottom-left">
              <div>官方热线 : <span>010-23456789</span></div>
              <div>官方主页 : <span>firevale.qs.com</span></div>
              <div>微信公众号 : <span>firevale</span></div>
            </div>
          </div>
          <!-- Right side -->
          <div class="level-item has-text-centered">
            <div class="bottom-right">
              <div>官方论坛 : <span>firevale.qs.it.com</span></div>
              <div>官方贴吧 : <span>枪神默示录</span></div>
              <div>官方微博 : <span>枪神默示录</span></div>
            </div>
          </div>
        </nav>
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
    maxLength
  } from 'vuelidate/lib/validators'

  export default {
    data() {
      return {
        title:'',
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
            message.showMsg(this.$t('customerService.contactService.addSuccess'))
            this.$router.replace({
              name: 'contactService'
            })
          }
          this.processing = false
        }
      }
    }
  }
</script>