<template>
  <div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
    <div class="modal-background" @click="close"></div>
    <div class="modal-card">
      <section class="modal-card-body" style="border-radius: 1rem;">
        <article class="media">
          <div class="media-content">
            <div v-for="item in list" class="columns item pointer" @click="ok(item)">
              <span class="column is-10"> {{ item.name }} </span>
              <span v-show="selectedItem == item.name" class="fa fa-check" aria-hidden="true" style="font-size: 2rem;color: red; vertical-align: middle;padding: 10px;"></span>
            </div>
          </div>
        </article>
      </section>
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
        list: [
          {name: '回复时间排序', code: 'replay'},
          {name: '发帖时间排序', code: 'create'},
          {name: '热门排序', code: 'hot'},
          {name: '精品贴', code: 'expert'}],
        selectedItem: '发帖时间排序',
        onOk: undefined,
      }
    },

    compiled: function() {
      this.modal = this.$refs.modal
    },

    methods: {
      ok(res) {
        this.close()
        this.selectedItem = res.name
        if (typeof this.onOk == 'function') {
          this.onOk(res)
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
  .modal-card {
    width: 80%;
    max-width: 350px;
    max-height: none;
  }
  
  .item {
    border-bottom: 1px solid $dark;
  }
  
  .item:last-child {
    border-bottom: none;
  }
</style>