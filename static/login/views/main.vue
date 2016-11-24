<template>
  <div class="g-doc">
    <div class="g-con">
      <icon name="times" scale="1.5" class="closeIcon" fill-color="#666"></icon>
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
  import Icon from '../components/fvIcon/Icon.vue'
  import '../components/fvIcon/icons/times'
  export default {
    components: {
      'icon': Icon,
    }
  }
</script>