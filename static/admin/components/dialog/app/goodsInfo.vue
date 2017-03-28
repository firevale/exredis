<template>
  <modal :visible="visible">
    <div class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ $t('admin.titles.editGoodsInfo', {appName: appName}) }}</h5>
      </div>
      <validation name="goods" @submit.prevent="handleSubmit">
        <label class="label"> {{ $t('admin.app.goods.id') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="goods.id">
        </p>

        <label class="label"> {{ $t('admin.app.goods.name') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="goods.name">
        </p>

        <label class="label"> {{ $t('admin.app.goods.description') }}: </label>
        <p class="control">
          <input class="input" type="text" v-model.trim="goods.description">
        </p>

        <label class="label"> {{ $t('admin.app.goods.price') + '[' + $t('admin.currency.' + currency) + ']' }}: </label>
        <p class="control">
          <input class="input" type="number" v-model.trim="price">
        </p>

        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary" :class="{'is-loading': processing}" @click.prevent="handleSubmit">{{ $t('admin.submit') }}</a>
        </div>
      </validation>
    </div>
  </modal>
</template>

<script>
  import {
    Modal
  } from 'vue-bulma-modal'

  import {
    openNotification,
    processAjaxError
  } from 'admin/miscellaneous'

  export default {
    props: {
      visible: {
        type: Boolean,
        default: true
      },
      appId: String,
      appName: String,
      goods: Object,
      currency: String,
      callback: Function,
    },

    data() {
      return {
        processing: false,
        price: 0,
      }
    },

    mounted: function() {
      this.price = this.goods.price / 100
    },

    watch: {
      price: function(val) {
        this.goods.price = val * 100
      }
    },

    methods: {
      handleSubmit() {
        this.processing = true
        this.$http.post('/admin_actions/update_app_goods_info', {
            app_id: this.appId,
            goods: this.goods,
          })
          .then(response => response.json())
          .then(result => {
            this.processing = false
            if (result.success) {
              openNotification({
                title: this.$t('admin.titles.updateSuccess'),
                message: this.$t('admin.messages.goodsInfoUpdated', {
                  goodsName: result.goods.name
                }),
                type: 'success',
                duration: 4500,
                container: '.notifications',
              })

              if (this.callback) {
                this.callback(result.goods)
              }
              this.visible = false
            } else {
              return Promise.reject(result)
            }
          })
          .catch(e => {
            this.processing = false
            this.visible = false

            processAjaxError(e)
          })
      }
    },

    components: {
      Modal,
    },
  }
</script>