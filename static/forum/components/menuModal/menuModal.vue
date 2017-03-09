<template>
<div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
  <div class="modal-background" @click="cancel"></div>
  <div class="modal-card">
    <section class="modal-card-body" style="border-radius: 1rem;">
      <article class="media">
        <div class="media-content">
          <div v-for="item in list" class="columns modal-item pointer" @click="ok(item)">
            <span class="column item-name" :class="{'olive': selectedItem ==item.code}"> {{ item.name }} </span>
            <span v-show="selectedItem ==item.code" class="fa fa-check item-check" aria-hidden="true" style="font-size: 2rem;color: red; vertical-align: middle;padding: 10px;"></span>
          </div>
        </div>
      </article>
    </section>
  </div>
</div>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    transition: {
      type: String,
      default: 'fade'
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  watch: {
    visible(val) {
      this.show = val
    }
  },
  data: function() {
    return {
      list: [{
          code: 'last_reply_at'
        },
        {
          code: 'created_at'
        },
        {
          code: 'is_hot'
        },
        {
          code: 'is_vote'
        }
      ],
      selectedItem: this.$t('forum.orderType.last_reply_at'),
      onOk: undefined,
    }
  },

  compiled: function() {
    this.modal = this.$refs.modal
  },

  methods: {
    ok(res) {
      this.visible = false
      this.selectedItem = res.code
      if (typeof this.onOk == 'function') {
        this.onOk(res)
      }
    },

    cancel() {
      this.visible = false
      if (typeof this.onCancel == 'function') {
        this.onCancel()
      }
    }
  }
}
</script>
