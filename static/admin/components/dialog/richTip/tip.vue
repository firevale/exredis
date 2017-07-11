<template>
  <modal :visible="visible">
    <div class="box">
      <div class="heading has-text-centered">
        <h1 class="title">{{title}}</h1>
      </div>
      <article class="media">
        <figure class="media-left">
          <span class="icon is-large" :class="`is-${type}`">
            <i class="fa fa-warning"></i>
          </span>
        </figure>
        <div class="media-content">
          <div class="content is-warning">
            <p class="code-tip" v-html="message"> </p>
          </div>
        </div>
      </article>
      <div class="has-text-centered">
        <a class="button is-primary" @click.prevent="visible = false">
           {{ $t('admin.common.close') }}
        </a>
      </div>
    </div>
  </modal>
</template>

<script>
  import {
    Modal
  } from 'vue-bulma-modal'

  import {i18n} from 'admin/vue-i18n'

  export default {
    props: {
      visible: Boolean,
      title: String,
      message: String,
      type: {
        type: String,
        default: 'danger'
      },
      okTitle: {
        type: String,
        default: i18n.t('admin.titles.ok'),
      },
      cancelTitle: {
        type: String,
        default: i18n.t('admin.titles.cancel'),
      },
      onOK: Function,
    },

    methods: {
      onBtnOKClicked: function() {
        this.visible = false

        if (typeof this.onOK == 'function') {
          this.onOK()
        }
      }
    },

    components: {
      Modal,
    },
  }
</script>
