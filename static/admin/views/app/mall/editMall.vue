<template>
  <div>
    <template v-if="mall">
      <tabs type="boxed" layout="top" alignment="left" size="normal" :only-fade="false" ref="tab" @tab-selected="tabSelected">
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
    </template>
    <template v-else>
      <p>
        {{ $t('admin.mall.not_open') }}
      </p>
    </template>
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
    this.mall = this.mallHash[this.$route.params.appId]

    if (this.$route.query && this.$route.query.tabIndex)
      this.$refs.tab.select(parseInt(this.$route.query.tabIndex))
  },

  data() {
    return {
      mall: {},
    }
  },
  methods: {
    tabSelected: function(index) {
      if (index == 0) return
      this.$router.push({
        name: this.$route.name,
        params: this.$route.params,
        query: {
          tabIndex: index
        }
      })
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