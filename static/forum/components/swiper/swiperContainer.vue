<template>
  <div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
    <div class="modal-background" @click="cancel"></div>
    <div class="modal-card" style="overflow: visible;max-width: 600px;">
      <section class="modal-card-body" style="width: 100%;margin: 0 auto;padding: 0;min-height: 0;max-width: 100vh;">
        <swiper class="swiper-container" direction="horizontal" :pre-click="goPre" :next-click="goNext" :mousewheel-control="true"
          :performance-mode="false">
          <div v-for="item in imgs" class="swiper-slide" style="background-color: #4a4a4a;">
            <figure style="width: 100%;">
              <img :src="item.url" style="width: 100%;"></img>
            </figure>
          </div>
          </swiper>
      </section>
      <i class="fa fa-arrow-left olive button arrow-icon" style="left: -2.4rem;" aria-hidden="true" @click="goPre++"></i>
      <i class="fa fa-arrow-right olive button arrow-icon" style="right: -2.4rem;" aria-hidden="true" @click="goNext++"></i>
    </div>
  </div>
</template>
<script>
  import swiper from "./vue-swiper"

  export default {
    props: {
      visible: Boolean,
      transition: {
        type: String,
        default: 'fade'
      },
      imgs: {
        type: Array,
      },
    },

    mounted() {
      document.body.appendChild(this.$el)
    },

    watch: {
      visible(val) {
        this.show = val
      }
    },

    data: function () {
      return {
        goPre: 0,
        goNext: 0,
      }
    },

    compiled: function () {
      this.modal = this.$refs.modal
    },

    methods: {
      cancel() {
        this.visible = false
        if (typeof this.onCancel == 'function') {
          this.onCancel()
        }
      },
    },

    components: {
      swiper,
    }
  }
</script>