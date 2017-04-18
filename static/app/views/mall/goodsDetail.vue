<template>
    <div class="goods-detail is-marginless is-paddingless">
        <div class="flex-take-rest goods-content">
            <scroller ref="scroller">
                <div class="columns is-multiline is-mobile has-text-centered">
                    <div class="column is-12">
                        <div class="card-image">
                            <figure class="image is-400x400">
                                <img v-if="goods.pic" :src="goods.pic">
                                <img v-else src="https://placehold.it/300x300?text=400x400">
                            </figure>
                        </div>
                    </div>
                    <div class="column is-12">
                        <h5 class="title is-5">
                            {{goods.name}}
                        </h5>
                    </div>
                    <div class="column is-12">
                        <h5 class="title is-5 goods-price">
                            <label :class="goods.currency">{{(goods.price / 100).toFixed(2)}}</label>（{{$t('mall.goods.postage')
                            }}：
                            <label :class="goods.currency">{{(goods.postage / 100).toFixed(2)}}</label>）
                        </h5>
                    </div>
                    <div class="column is-12">
                        <h5 class="title is-5">
                            {{$t('mall.goods.stock') }}：{{goods.stock}}
                        </h5>
                    </div>
                </div>
                <hr>
                <div class="columns is-multiline is-mobile has-text-centered">
                    <div class="column is-12">
                        <h5 class="title is-5">
                            {{$t('mall.goods.description') }}
                        </h5>
                    </div>
                    <div class="column is-12">
                        <div v-html="goods.description">
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div class="flex-fixed-size goods-bottom">
            <div v-if="goods.stock>0" class="columns is-multiline is-mobile">
                <div class="column is-6 bottom-left">
                    <div class="left-content">
                        <a class="button is-large content-item" @click.prevent="quantityPlus">-</a>
                        <input v-model.trim="quantity" class="input is-large has-text-centered content-item" style="width:3.9rem;" @blur.prevent="quantityChange"
                            type="number" :value="quantity">
                        <a class="button is-large content-item" @click.prevent="quantityReduce">+</a>
                    </div>
                </div>
                <div class="column is-6">
                    <a class="button is-info is-large is-fullwidth goods-buyNow" @click.prevent="buyNow">{{$t('mall.goods.buyNow')}}</a>
                </div>
            </div>
            <div v-else class="goods-sellOut">
                <div class="title is-5 has-text-centered">{{$t('mall.goods.soldOut')}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from '../../vue-installed'
    import * as acs from 'common/js/acs'
    import nativeApi from 'common/js/nativeApi'
    import scroller from 'common/components/scroller'

    export default {
        components: {
            scroller
        },
        mounted: async function () {
            await this.getGoodsDetail()
        },
        data: function () {
            return {
                canGoBack: false,
                inApp: window.acsConfig.inApp,
                quantity: 1,
                goods: {}
            }
        },
        methods: {
            onBtnBackClicked: function () {
                if (this.canGoBack) {
                    this.$router.back()
                } else if (this.inApp) {
                    nativeApi.closeWebviewWithResult({
                        success: false
                    })
                }
            },
            getGoodsDetail: async function () {
                let goodsId = this.$router.currentRoute.params.goodsId
                let result = await this.$acs.getGoodsDetail(goodsId)
                if (result.success) {
                    this.goods = result.goods
                }
            },
            quantityPlus: function () {
                if (this.quantity <= 1)
                    this.quantity = 1
                else
                    this.quantity = this.quantity - 1
            },
            quantityReduce: function () {
                if (this.goods.stock <= this.quantity)
                    this.quantity = this.goods.stock
                else if (this.quantity >= 99)
                    this.quantity = 99
                else
                    this.quantity = this.quantity + 1
            },
            quantityChange: function () {
                if (this.quantity >= 99)
                    this.quantity = 99
                else if (this.quantity <= 0)
                    this.quantity = 1
            },
            buyNow: function () {
                acs.checkIsLogin(_ => {
                    this.$router.push({
                        name: 'mallOrder',
                        params: {
                            goodsId: this.goods.id,
                            quantity: this.quantity
                        },
                    })
                })
            }
        },
        watch: {
            '$route' (to, from) {
                this.canGoBack = (history.state != null)
            }
        }
    }
</script>