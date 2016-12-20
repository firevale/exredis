<template>
  <div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card" style="border-radius: 5px; width: 30%;min-width: 220px;">
      <section class="modal-card-body">
        <article class="media">
          <div class="media-content">
            <div class="content is-warning">
              <p style="text-align: center;font-size: 1.3rem;"> {{ message }}? </p>
            </div>
          </div>
        </article>
      </section>
      <footer class="modal-footer">
        <a class="button " @click="cancel">{{ cancelText }}</a>
        <a class="button is-primary" @click="ok">{{ okText }}</a>
      </footer>
    </div>
  </div>
</template>

<script>
  import {
    BaseModal
  } from 'vue-bulma-modal'

  export default {
    mixins: [BaseModal],

    data: function() {
      return {
        title: "this is a card modal",
        message: "message",
        okText: "确认",
        cancelText: '取消',
        onOk: undefined,
      }
    },

    compiled: function() {
      this.modal = this.$refs.modal
    },

    methods: {
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
    }
  }
</script>

<style lang="scss">
  @import "../../scss/color";

  .warning-sign {
    color: $olive;
  }
  
  .modal-footer{
    background: #fff; 
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
    a{
        width: 45%;
        background-color: $dark;
        border-radius: 5px;
        font-size: 1.2rem;
    }
  }
</style>