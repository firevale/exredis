<template>
    <div class="tile is-ancestor is-vertical root-container goods-detail">
        <div class="top-bar">
            <div class="title-bar">
                <h4 class="title is-4">{{$t('mall.goods.description') }}</h4>
            </div>
            <nav class="nav">
                <div class="nav-left has-text-left">
                    <span v-show="inApp" class="icon image-icon icon-back" @click.prevent="onBtnBackClicked"></span>
                </div>
                <div class="nav-center">
                </div>
                <div class="nav-right has-text-right">
                    <a class="icon image-icon icon-user" @click.prevent=""></a>
                </div>
            </nav>
        </div>
        <div class="content has-text-centered">
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
                <div v-if="goods.stock<=0" style="padding:0.2rem">
                    <p class="notification is-primary">{{$t('mall.goods.soldOut')}}</p>
                </div>
                <div v-else>
                    <a class="button is-large" @click.prevent="quantityPlus" style="border:1px white solid; background-color:#0d61e7; color:white;width:3rem;font-weight:400">-</a>
                    <input class="input is-large has-text-centered" type="number" style="width:4rem;border:1px white solid;" :value="quantity">
                    <a class="button is-large" @click.prevent="quantityReduce" style="border:1px white solid; background-color:#0d61e7; color:white;width:3rem;font-weight:400">+</a>
                    <a class="button is-info is-large is-fullwidth" style="width:50%">{{$t('mall.goods.buyNow')}}</a>
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
                this.quantity = this.quantity - 1
            },
            quantityReduce: function () {
                if (this.goods.stock <= this.quantity)
                    this.quantity = this.goods.stock
                else
                    this.quantity = this.quantity + 1
            }
        },
        watch: {
            '$route' (to, from) {
                this.canGoBack = (history.state != null)
            }
        }
    }
</script>