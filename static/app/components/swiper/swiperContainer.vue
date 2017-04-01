<template>
<div :class="['modal', 'animated', visible ? 'is-active' : '']" :transition="transition" transition-mode="in-out">
  <div class="modal-background" @click="cancel"></div>
  <div class="modal-card" style="overflow: visible;max-width: 600px;">
    <section class="modal-card-body" style="width: 100%;margin: 0 auto;padding: 0;min-height: 0;max-width: 100vh;">
      <swiper class="swiper-container" direction="horizontal" :mousewheel-control="true" :performance-mode="false"
        :focus-index="rank" @currentPage="refreshRank">
        <div v-for="item in imgs" class="swiper-slide" style="background-color: #4a4a4a;">
          <figure style="width: 100%;">
            <img :src="item.url" style="width: 100%;"></img>
          </figure>
        </div>
      </swiper>
    </section>
    <i v-show="rank>0" class="fa fa-arrow-left olive button arrow-icon" style="left: 0;" aria-hidden="true"
      @click="navImg('')"></i>
    <i v-show="rank<imgs.length-1" class="fa fa-arrow-right olive button arrow-icon" style="right: 0;" aria-hidden="true"
      @click="navImg(1)"></i>
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
    },
  },

  data: function() {
    return {
      rank: 0,
    }
  },

  compiled: function() {
    this.modal = this.$refs.modal
  },

  methods: {
    navImg(tag) {
      if (tag) {
        if (this.rank + 1 > this.imgs.length - 1) {
          this.rank = this.imgs.length - 1
        } else {
          this.rank++
        }
      } else {
        if (this.rank - 1 < 0) {
          this.rank = 0
        } else {
          this.rank--
        }
      }
    },
    refreshRank(val) {
      this.rank = val
    },
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
