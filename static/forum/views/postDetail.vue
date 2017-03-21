<template>
  <post-detail-mobile v-if="mobile"></post-detail-mobile>
  <post-detail-pc v-else></post-detail-pc>
</template>
<script>
import postDetailPc from './postDetail.pc'
import postDetailMobile from './postDetail.mobile'

export default {
  data: function() {
    let platform = window.acsConfig.platform
    return {
      mobile: platform == 'ios' || platform == 'android' || platform == 'wp8'
    }
  },
  components: {
    postDetailPc,
    postDetailMobile
  }
}
</script>