<template>
  <modal :visible="visible" @close="close">
    <div class="box">
      <validation name="sdkInfo" @submit.prevent="handleSubmitSdkInfo">
        <template v-for="key in Object.keys(binding)">
          <label class="label"> {{ $t(`admin.sdks.${sdk}`) + $t('admin.sdks.assigned') + $t(`admin.sdks.keys.${key}`)}}: </label>
          <p class="control">
            <input class="input" type="text" v-model="binding[key]">
          </p>
        </template>
        <p class="control">
          <input type="submit" class="button is-primary" :value="$t('admin.submit')"></input>
        </p>
      </validation>
    </div>
  </modal>
</template>

<script>
  import {
    Modal
  } from 'vue-bulma-modal'

  export default {
    props: {
      visible: Boolean,
      sdk: String,
      appId: String,
      binding: Object,
    },

    methods: {
      close() {
        this.$emit('close')
      }
    },

    components: {
      Modal,
    },
  }
</script>