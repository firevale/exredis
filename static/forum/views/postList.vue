<template>
  <post-list-mobile v-if="mobile"></post-list-mobile>
  <post-list-pc v-else></post-list-pc>
</template>
<script>
import postListPc from './postList.pc'
import postListMobile from './postList.mobile'

export default {
  data: function() {
    let platform = window.acsConfig.platform
    return {
      mobile: platform == 'ios' || platform == 'android' || platform == 'wp8'
    }
  },
  components: {
    postListPc,
    postListMobile
  }
}
</script>