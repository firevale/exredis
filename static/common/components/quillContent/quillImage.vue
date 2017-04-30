<template>
  <div>
    <div v-if="isValidImage">
      <img :src="src | imageStaticUrl" :width="width" :height="height"/>
    </div>
    <div v-else class="invalid-image">
      {{$t('error.invalidImage')}}
    </div>
  </div>
</template>

<script>

export default {
  props: {
    src: String,
    width: String,
    height: String,
  },

  computed: {
    isValidImage() {
      return /^(https?:\/\/[^\/\.]+\.firevale.com\/|\/img\/|\/images\/)/.test(this.src)
    },

    isSizeSpecified() {
      return /^\d+/.test(this.width) && /^\d+/.test(this.height)
    }
  },

  methods: {

  }
}
</script>
