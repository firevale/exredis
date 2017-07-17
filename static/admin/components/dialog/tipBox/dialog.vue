<template>
  <modal :visible="visible">
    <div class="box">
      <div class="heading has-text-centered">
        <h1 class="title">{{title}}</h1>
      </div>
      <article class="media">
        <div class="media-content">
          <div class="content">
            <p class="code-tip" v-html="message"> </p>
          </div>
        </div>
      </article>
      <div class="has-text-centered">
        <a class="button is-primary" @click.prevent="visible = false">
          {{cancelTitle}}
        </a>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  Modal
} from 'vue-bulma-modal'

import {
  i18n
} from 'admin/vue-i18n'

export default {
  props: {
    visible: Boolean,
    title: {
      type: String,
      default: i18n.t('common.tip'),
    },
    message: String,
    cancelTitle: {
      type: String,
      default: i18n.t('common.close')
    },
  },

  components: {
    Modal,
  },
}
</script>