<template>
  <div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ title }}</p>
        <button class="delete" @click="close"></button>
      </header>
      <section class="modal-card-body">
        <article class="media">
          <figure class="media-left">
            <span class="icon is-large">
              <icon name="warning" scale="2.5" fill-color="yellow"></icon>
            </span>
          </figure>
          <div class="media-content">
            <div class="content is-warning">
              <p> {{ message }} </p>
            </div>
          </div>
        </article>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" @click="ok">{{ okText }}</a>
        <a class="button" @click="cancel">{{ cancelText }}</a>
      </footer>
    </div>
  </div>
</template>
<script>
  import Icon from '../fvIcon/Icon.vue'
  import '../fvIcon/icons/warning'
  import {
    BaseModal
  } from '../fvModal'

  export default {
    mixins: [BaseModal],

    data: function() {
      return {
        title: "this is a card modal",
        message: "message",
        okText: "是",
        cancelText: '否',
        onOk: undefined,
      }
    },

    created: function() {
      this.modal = this.$refs.modal
    },

    methods: {
      close () {
        this.$destroy()
      },
      ok() {
        this.close()

        if (typeof this.onOk == 'function') {
          this.onOk()
        }
      },

      cancel() {
        this.close()

        if (typeof this.onCancel == 'function') {
          this.onCancel()
        }
      }
    },

    components:{
      Icon,
    }
  }
</script>
<style lang="scss">
  @import '../../scss/login';
  .warning-sign {
    color: $danger;
  }
</style>