<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child">
        <div class="table-responsive" v-if="app">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="app.goods && app.goods.length > 0">
              <tr>
                <th>{{ $t('admin.app.goods.icon') }}</th>
                <th>{{ $t('admin.app.goods.id')}}</th>
                <th>{{ $t('admin.app.goods.name')}}</th>
                <th>{{ $t('admin.app.goods.description')}}</th>
                <th>{{ $t('admin.app.goods.price') + '(' + $t('admin.currency.' + app.currency) + ')'}}</th>
                <th :colspan="sdks.length">
                  {{ $t('admin.app.goods.productIds') }}
                </th>
                <th></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th :colspan="6+sdks.length" style="text-align: center; vertical-align: bottom; height: 60px; border: none">
                  <a class="button is-primary" style="min-width: 100px" @click="addNewGoods">
                    <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.app.goods.add') }}
                  </a>
                </th>
              </tr>
            </tfoot>
            <tbody v-show="app.goods && app.goods.length > 0">
              <tr v-for="(goods, index) in app.goods">
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
                  <span class="sdk-icon" 
                        :class="classOfGoodsSdk(goods, sdk)" 
                        @click.prevent="editGoodsProductId(goods, sdk)"></span>
                </td>
                <td class="is-icon">
                  <a @click.prevent="editGoodsInfo(goods, index)">
                    <i class="fa fa-pencil"></i> 
                  </a>
                  <a @click.prevent="deleteGoods(goods, index)">
                    <i class="fa fa-trash"></i> 
                  </a>
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
    showFileUploadDialog
  } from 'common/components/fileUpload'

  import {
    showMessageBox
  } from '../dialog/messageBox'

  import {
    openNotification,
    processAjaxError
  } from 'admin/miscellaneous'

  import Vue from 'admin/vue-i18n'

  import goodsInfoDialog from 'admin/components/dialog/app/goodsInfo'
  const goodsInfoDialogComponent = Vue.extend(goodsInfoDialog)

  const openGoodsInfoDialog = (propsData = {
    visible: true
  }) => {
    return new goodsInfoDialogComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  import goodsProductIdDialog from 'admin/components/dialog/app/goodsProductId'
  const goodsProductIdDialogComponent = Vue.extend(goodsProductIdDialog)

  const openGoodsProductIdDialog = (propsData = {
    visible: true
  }) => {
    return new goodsProductIdDialogComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  import Tooltip from 'vue-bulma-tooltip'

  const productSdks = ['coolpad', 'yyh', 'lenovo', 'ccplay']

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
          title: this.$t('admin.titles.uploadGoodsIcon', {
            goodsName: goods.name
          }),
          callback: response => goods.icon = response.icon_url,
        })
      },

      editGoodsInfo: function(goods, index) {
        openGoodsInfoDialog({
          goods: goods,
          appId: this.app.id,
          appName: this.app.name,
          currency: this.app.currency,
          visible: true,
          callback: new_goods => {
            this.app.goods[index] = new_goods
          },
        })
      },

      editGoodsProductId(goods, sdk) {
        let index = goods.product_ids.findIndex(x => x.sdk == sdk)

        let productIdInfo = goods.product_ids[index] || {
          app_goods_id: goods.id,
          sdk: sdk,
          product_id: '',
        }

        console.log('openGoodsProductIdDialog', this.app)

        openGoodsProductIdDialog({
          goodsName: goods.name,
          productIdInfo: productIdInfo,
          appId: this.app.id,
          callback: newProductIdInfo => {
            if (index == -1) {
              goods.product_ids.push(newProductIdInfo)
            } else {
              goods.product_ids[index] == newProductIdInfo
            }
          },
        })
      },

      deleteGoods: function(goods, index) {
        showMessageBox({
          visible: true,
          title: this.$t('admin.titles.warning'),
          message: this.$t('admin.messages.confirmDeleteGoods', {
            goodsName: goods.name
          }),
          type: 'danger',
          onOK: _ => {
            this.$http.post('/admin_actions/delete_app_goods', {
                goods_id: goods.id,
                app_id: goods.app_id,
              })
              .then(res => res.json())
              .then(json => {
                if (json.success) {
                  this.app.goods.splice(index, 1)
                } else {
                  return Promise.reject(result)
                }
              })
              .catch(e => processAjaxError(e))
          },
        })
      },

      addNewGoods: function() {
        openGoodsInfoDialog({
          goods: {
            id: '',
            name: '',
            description: '',
            price: 0,
            app_id: this.app.id,
          },
          appId: this.app.id,
          appName: this.app.name,
          currency: this.app.currency,
          visible: true,
          callback: goods => {
            this.app.goods.push(goods)
          },
        })
      },


    },

    components: {
      Tooltip
    }

  }
</script>