<template>
    <div class="tile is-ancestor is-vertical root-container">
        <div class="top-bar flex-fixed-size">
            <div class="title-bar">
                <h4 class="title is-4">{{ $t('mall.titles.' + $route.name) }}</h4>
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
        <transition :name="transitionName">
            <router-view class="content-container flex-take-rest mall"> </router-view>
        </transition>
    </div>
</template>
<script>
    import Vue from '../../vue-installed'
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    import nativeApi from 'common/js/nativeApi'
    import * as acs from 'common/js/acs'

    export default {
         mounted: async function () {
            await this.getMallDetail()
        },
        data: function () {
            return {
                inApp: window.acsConfig.inApp,
                canGoBack: false,
                mall: {}
            }
        },

        computed: {
            ...mapGetters([
                'transitionName'
            ]),
        },

        methods: {
            ...mapActions([
                'setTransitionName'
            ]),
            getMallDetail: async function () {
                let appId = this.$router.currentRoute.params.appId
                let result = await this.$acs.getMallDetail(appId)
                if (result.success) {
                    this.mall = result.mall
                }
            },
            onBtnBackClicked: function () {
                if (this.canGoBack) {
                    this.$router.back()
                } else if (this.inApp) {
                    nativeApi.closeWebviewWithResult({
                        success: false
                    })
                }
            }
        },

        watch: {
            '$route' (to, from) {
                this.canGoBack = (history.state != null)
            }
        },
    }
</script>