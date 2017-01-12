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
            <p> {{ message }} </p>
          </div>
        </div>
      </article>
      <div class="container has-text-centered">
        <a class="button is-danger" @click.prevent="onBtnOKClicked">
          {{okTitle}}
        </a>
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

  import Vue from 'admin/common/vue-i18n'

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
        default: Vue.t('admin.titles.ok'),
      },
      cancelTitle: {
        type: String,
        default: Vue.t('admin.titles.cancel'),
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
