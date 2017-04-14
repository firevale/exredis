<template>
    <div class="tile is-ancestor is-vertical root-container goods-detail">
        <div class="top-bar flex-fixed-size">
            <div class="title-bar">
                <h4 class="title is-4">{{$t('mall.goods.description') }}</h4>
            </div>
            <nav class="nav">
                <div class="nav-left has-text-left">
                    <span v-show="canGoBack && inApp" class="icon image-icon icon-back" @click.prevent="onBtnBackClicked"></span>
                </div>
                <div class="nav-center">
                </div>
                <div class="nav-right has-text-right">
                    <a class="icon image-icon icon-user" @click.prevent=""></a>
                </div>
            </nav>
        </div>
        <div class="content-container flex-take-rest is-marginless has-text-centered">
            <div class="card-image">
                <figure class="image is-400x400">
                    <img v-if="goods.pic" :src="goods.pic">
                    <img v-else src="https://placehold.it/300x300?text=400x400">
                </figure>
            </div>
            <p class="subtitle is-marginless is-5 goods-name">
                {{goods.name}}
            </p>
            <p class="subtitle is-marginless is-5 goods-price">
                <label>{{(goods.price / 100).toFixed(2)}}</label>（{{$t('mall.goods.postage') }}：<label>{{(goods.postage / 100).toFixed(2)}}</label>）
            </p>
            <p class="subtitle is-marginless is-5 goods-info">
                <label>{{$t('mall.goods.stock') }}：{{goods.stock}}</label>
            </p>
            <hr>
            <p class="subtitle is-marginless is-5">
                {{$t('mall.goods.description') }}
            </p>
            <div class="content goods-info">
                {{goods.description}}
            </div>
            <div class="goods-bottom">
                <div v-if="goods.stock<=0" class="goods-sellOut">
                    <p class="notification is-primary">{{$t('mall.goods.soldOut')}}</p>
                </div>
                <div v-else>
                    <nav class="level is-mobile">
                        <div class="level-item has-text-centered bottom-left">
                            <article class="media">
                                <div class="media-left">
                                </div>
                                <div class="media-content">
                                    <nav class="level is-mobile">
                                        <div class="level-left">
                                            <a class="button is-large level-item goods-plus" @click.prevent="quantityPlus">-</a>
                                            <input class="input is-large has-text-centered level-item goods-quantity" @blur.prevent="quantityChange" ref="quantity" type="number" :value="quantity">
                                            <a class="button is-large level-item goods-reduce" @click.prevent="quantityReduce">+</a>
                                        </div>
                                    </nav>
                                </div>
                                <div class="media-right">
                                </div>
                            </article>
                        </div>
                        <div class="level-item" style="width:50%">
                            <a class="button is-info is-large is-fullwidth goods-buyNow">{{$t('mall.goods.buyNow')}}</a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from '../../vue-installed'
    import * as acs from 'common/js/acs'
    import nativeApi from 'common/js/nativeApi'

    export default {
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
                else
                    this.quantity = this.quantity + 1
            },
            quantityChange: function () {
                let num = this.$refs.quantity.value
                if (num == "" || num <= 0) {
                    num = 1
                    this.$refs.quantity.value = 1
                }
                if (this.goods.stock <= num) {
                    this.$refs.quantity.value = this.goods.stock
                }
            }
        },
        watch: {
            '$route' (to, from) {
                this.canGoBack = (history.state != null)
            }
        }
    }
</script>