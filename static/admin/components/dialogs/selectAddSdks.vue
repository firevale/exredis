<template>
  <modal :visible="visible" @close="close">
    <div class="box has-text-centered">
      <h5 class="title is-5">{{ `${appName} - ` + $t('admin.titles.selectSdk')}}</h5>
      <div class="columns is-multiline">
        <div class="column is-2 has-text-centered" v-for="sdk in sdks">
          <div class="sdk-icon" :class="sdk" @click.prevent="selectSdk(sdk)">
          </div>
          <h6 class="subtitle is-6">{{$t(`admin.sdks.${sdk}`)}} </h6>
        </div>        
      </div>
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
      appName: String,
      sdks: Array,
    },

    methods: {
      close() {
        this.$emit('close')
      },
      
      selectSdk(sdk) {
        console.log(sdk, 'selected')
      }
    },

    components: {
      Modal,
    },
  }
</script>
