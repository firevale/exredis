<template>
    <div class="tile is-marginless is-vertical">
        <div class="top-bar">
            <div class="title-bar">
                <h4 class="title is-4">商城名称</h4>
            </div>
            <nav class="nav">
                <div class="nav-left has-text-left">
                    <span v-show="inApp" class="icon image-icon icon-back" @click.prevent=""></span>
                </div>
                <div class="nav-center">
                </div>
                <div class="nav-right has-text-right">
                    <a v-if="$route.name == 'index'" class="icon image-icon icon-user" @click.prevent=""></a>
                </div>
            </nav>
        </div>
        <div style="width:100%; height:100%;top: 5.8rem;position: absolute;">
            <scroller :on-load-more="loadmore" ref="scroller">
                <div class="columns is-multiline is-mobile">
                    <div v-for="item in goodsList" class="column is-half has-text-centered">
                        <figure class="image is-400x400">
                            <img v-if="item.pic" :src="item.pic">
                            <img v-else src="https://placehold.it/300x300?text=300x300">
                        </figure>
                        <p class="subtitle is-marginless is-6" style="font-weight:400">{{item.name}}</p>
                        <p class="subtitle is-marginless is-6" style="font-weight:400">{{item.price}}</p>
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
        data: function () {
            return {
                canGoBack: false,
                inApp: window.acsConfig.inApp,
                goodsList: [],
                page: 0,
                total: 1,
                recordsPerPage: 12,
                postRecords: 0
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
            }
        },
        watch: {
            '$route' (to, from) {
                this.canGoBack = (history.state != null)
            }
        }
    }
</script>