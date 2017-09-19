<template>
  <div>
    <img-upload url="/user/update_avatar" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail" field="file"
      :headers="headers" :langType="langType" v-model="show">
    </img-upload>
  </div>
</template>
<script>
import imgUpload from 'vue-image-crop-upload/upload-2.vue'

export default {
  props: {
    url: {
      type: String,
      default: '',
    },

    params: {
      type: Object,
      default: function() {
        return {}
      }
    },

    callback: {
      type: Function,
      default: null,
    }
  },

  components: {
    imgUpload
  },

  data: function() {
    return {
      headers: {
        'x-csrf-token': window.acsConfig.csrfToken
      },
      show: true,
      langType: window.acsConfig.locale == 'en' ? 'en' : 'zh'
    }
  },

  mounted: function() {
    document.body.appendChild(this.$el)
  },

  watch: {
    show(val) {
      if (!val) {
        this.$nextTick(_ => {
          document.body.removeChild(this.$el)
        })
      }
    }
  },

  methods: {
    cropUploadSuccess(data) {
      if (this.callback) {
        this.callback(data)
      }
    },

    cropUploadFail(data) {
      if (this.callback) {
        this.callback(data)
      }
    }
  }
}
</script>
<style lang="css">
.vue-image-crop-upload .vicp-wrap .vicp-step1 .vicp-drop-area,
.vue-image-crop-upload .vicp-wrap .vicp-step3 .vicp-upload {
  height: 175px;
}
</style>