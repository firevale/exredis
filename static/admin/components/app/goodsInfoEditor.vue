<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child">
        <div class="table-responsive" v-if="app">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="app.goods && app.goods.length > 0">
              <tr>
                <th></th>
                <th>{{ $t('admin.app.goods.id')}}</th>
                <th>{{ $t('admin.app.goods.name')}}</th>
                <th>{{ $t('admin.app.goods.description')}}</th>
                <th>{{ $t('admin.app.goods.price') + '(' + $t('admin.currency.' + app.currency) + ')'}}</th>
                <th :colspan="sdks.length">
                  {{ $t('admin.app.goods.productIds') }}
                </th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th :colspan="5+sdks.length" style="text-align: center; vertical-align: bottom; height: 60px; border: none">
                  <a class="button is-primary" style="min-width: 100px" href="javascript:void(0)">
                    <i class="fa fa-plus" style="margin-right: 5px"></i> {{ ' ' + $t('admin.app.goods.add') }}
                  </a>
                </th>
              </tr>
            </tfoot>
            <tbody v-show="app.goods && app.goods.length > 0">
              <tr v-for="goods in app.goods">
                <td class="is-icon">
                  <figure class="image is-32x32 goods-icon" @click="updateGoodsIcon(goods)">
                    <img :src="goods.icon ? goods.icon: 'https://placehold.it/32x32?text=128x128'"></img>
                  </figure>
                </td>
                <td> {{ goods.id }} </td>
                <td> {{ goods.name }} </td>
                <td> {{ goods.description }} </td>
                <td> {{ (goods.price / 100).toFixed(2) }} </td>
                <td v-for="sdk in sdks" class="is-icon">
                  <span class="sdk-icon" :class="classOfGoodsSdk(goods, sdk)" style="width: 32px; height: 32px"></span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import {
    openNotification
  } from 'admin/common/notification'

  import {
    showFileUploadDialog
  } from '../dialog/fileUploadDialog'

  const productSdks = ['coolpad', 'yyh', 'lenovo', 'ccplay']

  import Tooltip from 'vue-bulma-tooltip'

  export default {
    props: {
      app: Object,
    },

    computed: {
      sdks: function() {
        let sdks = ['applestore', 'ggplay']
        let added = []

        if (this.app.sdk_bindings) {
          this.app.sdk_bindings.forEach(x => added.push(x.sdk))

          productSdks.forEach(sdk => {
            if (added.indexOf(sdk) >= 0) {
              sdks.push(sdk)
            }
          })
        }

        return sdks
      },
    },

    methods: {
      classOfGoodsSdk: function(goods, sdk) {
        let result = sdk
        let productIds = {}

        goods.product_ids.forEach(x => {
          productIds[x.sdk] = x.product_id
        })

        if (productIds[sdk]) {
          return sdk
        } else {
          return `${sdk} need-configured`
        }
      },

      updateGoodsIcon: function(goods) {
        showFileUploadDialog({
          postAction: '/admin_actions/update_goods_icon',
          accept: 'image/png',
          data: {
            app_id: this.app.id,
            goods_id: goods.id,
          },
          extensions: ['png'],
          title: this.$t('admin.titles.uploadGoodsIcon', {goodsName: goods.name}),
          callback: response => goods.icon = response.icon_url,
        })
      },
    },

    components: {
      Tooltip
    }

  }
</script>