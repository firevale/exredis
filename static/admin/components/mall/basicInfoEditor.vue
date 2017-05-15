<template>
  <form name="basicInfo" @submit.prevent="handleSubmit">
    <div class="columns is-multiline">
      <div class="column is-4">
        <label class="label"> {{ $t('admin.mall.id')}}: {{mall.id}} </label>
      </div>
      <div class="column is-4">
        <label class="label"> {{ $t('admin.mall.created_at')}}: {{mall.inserted_at | formatServerDateTime}} </label>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.mall.appId')}}: </label>
        <p class="control">
          <input class="input is-disabled" disabled type="text" v-model.trim="mall.app_id">
        </p>
      </div>
      <div class="column is-8">
        <label class="label"> {{ $t('admin.mall.title')}}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="mall.title">
        </p>
      </div>
      <div class="column is-8">
        <p class="control">
          <label class="checkbox">
            <input class="checkbox" type="checkbox" v-model.trim="mall.active"> {{ $t('admin.mall.active')}}
          </label>
        </p>
      </div>
    </div>
    <div class="container has-text-centered" style="margin-top: 15px">
      <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
    </div>
  </form>
</template>
<script>
import axios from 'axios'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  props: {
    mall: Object,
  },

  data() {
    return {
      processing: false
    }
  },

  methods: {
    ...mapActions([
      'addMall',
      'setApp'
    ]),

    handleSubmit: async function() {
      this.processing = true
      let result = await this.$acs.updateMallInfo({
        mall: this.mall
      }, this.$t('admin.notification.message.mallInfoUpdated'))
      if (result.success) {
        axios.post('/admin_actions/fetch_app', {
            app_id: this.mall.app_id
          })
          .then(response => response.data)
          .then(result => {
            if (result.success) {
              this.setApp(result.app)
            }
          })
      }
      this.processing = false
      if (result.mall) {
        this.addMall(result.mall)
        this.$nextTick(_ => {
          this.$router.replace({
            path: '/admin/malls/edit/${result.mall.id}'
          })
        })
      }
    },
  },

}
</script>