<template>
    <div class="tile is-vertical root-container mall-index">
        <div class="top-bar">
            <div class="title-bar">
                <h4 class="title is-4">{{mallDetail.title}}</h4>
            </div>
            <nav class="nav">
                <div class="nav-left has-text-left">
                    <span v-show="inApp" class="icon image-icon icon-back" @click.prevent=""></span>
                </div>
                <div class="nav-center">
                </div>
                <div class="nav-right has-text-right">
                    <a class="icon image-icon icon-user" @click.prevent=""></a>
                </div>
            </nav>
        </div>
        <div class="middle-content">
            <scroller :on-load-more="loadmore" ref="scroller">
                <div class="content-goods">
                    <div class="columns is-multiline has-text-centered is-mobile">
                        <div v-for="item in goodsList" class="column is-half">
                            <div class="card-image pic">
                                <figure class="image is-400x400" @click.prevent="showGoodsDetail(item.id)">
                                    <img v-if="item.pic" :src="item.pic">
                                    <img v-else src="https://placehold.it/300x300?text=400x400">
                                </figure>
                            </div>
                            <p class="subtitle is-marginless is-5 name">
                                {{item.name}}
                            </p>
                            <p class="subtitle is-marginless is-5 price">
                                <label>{{(item.price / 100).toFixed(2)}}</label>
                            </p>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</template>

<script>
    import Vue from '../../vue-installed'
    import scroller from 'common/components/scroller'
    import * as acs from 'common/js/acs'
    import nativeApi from 'common/js/nativeApi'

    export default {
        components: {
            scroller
        },
        mounted: async function () {
            await this.getMallDetail()
        },
        data: function () {
            return {
                canGoBack: false,
                inApp: window.acsConfig.inApp,
                goodsList: [],
                page: 0,
                total: 1,
                recordsPerPage: 12,
                postRecords: 0,
                mallDetail: {}
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
            resetScroller: function () {
                this.page = 0
                this.total = 1
                this.goodsList = []
                if (this.$refs.scroller) {
                    this.$refs.scroller.$emit('reset')
                }
            },
            loadmore: async function () {
                let appId = this.$router.currentRoute.params.appId
                let result = await this.$acs.getActiveGoodsPaged(appId, this.page + 1, this.recordsPerPage)

                if (result.success) {
                    this.goodsList = this.page == 0 ? result.goodses : this.goodsList.concat(result.goodses)
                    this.total = result.total
                    this.page = this.page + 1

                    if (this.$refs.scroller && this.page >= this.total) {
                        this.$refs.scroller.$emit('all-loaded')
                    }
                }
            },
            getMallDetail: async function () {
                let appId = this.$router.currentRoute.params.appId
                let result = await this.$acs.getMallDetail(appId)
                if (result.success) {
                    this.mallDetail = result.mall
                }
            },
            showGoodsDetail: function (goodsId) {
                this.$router.push({
                    name: 'goodsDetail',
                    params: {
                        goodsId: goodsId
                    },
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