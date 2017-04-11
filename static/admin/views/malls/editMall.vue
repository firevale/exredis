<template>
  <div>
    <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false">
      <tab-pane icon="fa fa-clone" :label="$t('admin.mall.basicInfo')">
        <basic-info-editor v-if="mall" :mall="mall"></basic-info-editor>
      </tab-pane>
      <tab-pane icon="fa fa-shopping-cart" :label="$t('admin.mall.goodsInfo')">
        <goods-info-editor v-if="mall" :mall="mall"></goods-info-editor>
      </tab-pane>  
      <tab-pane icon="fa fa-star" :label="$t('admin.mall.orderInfo')">
        <order-info-editor v-if="mall" :mall="mall"></order-info-editor>
      </tab-pane>                
    </tabs>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  Tabs,
  TabPane
} from 'vue-bulma-tabs'

import basicInfoEditor from 'admin/components/mall/basicInfoEditor'
import goodsInfoEditor from 'admin/components/mall/goodsInfoEditor'
import orderInfoEditor from 'admin/components/mall/orderInfoEditor'

export default {
  mounted() {
    let mall = this.mallHash[this.$route.params.mallId]

    if (typeof mall == 'undefined') {
      this.$router.replace({
        name: 'Malls'
      })
    } else {
      this.mall = mall
    }
  },

  data() {
    return {
      mall: {},
    }
  },

  computed: {
    ...mapGetters([
      'mallHash'
    ]),
  },

  components: {
    Tabs,
    TabPane,
    basicInfoEditor,
    goodsInfoEditor,
    orderInfoEditor,
  }
}
</script>