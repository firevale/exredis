<template>
  <div>
    <div class="level">
      <div class="level-left">
        <h5 class="subtitle is-5">{{$t('mall.order.fileds.id)}}:{{order.id}}</h5>
      </div>
      <div class="level-right">
        aaaaa
      </div>
    </div>
  </div>1
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as filter from 'common/js/filters'

export default {
  props: {
    order: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {

    }
  }

}
</script>