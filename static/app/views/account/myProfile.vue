<template>
  <div style="position: relative">
    <scroller class="account-info">
      <div class="columns is-mobile is-multiline is-paddingless is-marginless">
        <div class="column is-3">
          <v-touch tag="figure" class="image is-64x64 avatar-image is-clickable" style="margin: 1rem auto;" @tap="onUpdateAvatar">
            <img :src="avatarUrl"></img>
          </v-touch>
          <div class="level is-mobile is-paddingless">
            <p class="level-center level-item has-text-right"> {{ $t('account.userId') }}: {{ userInfo.id }}</p>
          </div>
        </div>
        <div class="column is-9">
          <v-touch class="level is-mobile is-clickable has-bottom-line" style="margin-top: 0.5rem" @tap="$router.push({path: '/account/edit_nickname'})">
            <p class="level-left level-item has-text-left is-narrow">
              <span style="width: 100%"> {{ $t('account.nickname') }} </span>
            </p>
            <p class="level-right level-item has-text-right">
              {{ userInfo.nickname }}
              <span class="icon image-icon icon-arrow-right"></span>
            </p>
          </v-touch>
          <v-touch v-if="isMobileAccountSupported" class="level is-mobile is-clickable has-bottom-line" @tap="$router.push({path: '/account/edit_mobile'})">
            <p class="level-left level-item has-text-left">
              <span style="width: 100%"> {{ $t('account.mobile') }} </span>
            </p>
            <p class="level-right level-item has-text-right is-narrow">
              <span> {{ mobile }} </span>
              <span class="icon image-icon icon-arrow-right"> </span>
            </p>
          </v-touch>
          <v-touch class="level is-mobile is-clickable has-bottom-line" @tap="$router.push({path: '/account/edit_email'})">
            <p class="level-left level-item has-text-left">
              <span style="width: 100%"> {{ $t('account.email') }} </span>
            </p>
            <p class="level-right level-item has-text-right">
              <span> {{ email }} </span>
              <span class="icon image-icon icon-arrow-right is-narrow"></span>
            </p>
          </v-touch>
          <v-touch v-if="isMobileAccountSupported" class="level is-mobile is-clickable has-bottom-line" @tap="$router.push({path: '/account/edit_resident'})">
            <p class="level-left level-item has-text-left">
              <span style="width: 100%"> {{ $t('account.residentInfo') }} </span>
            </p>
            <p class="level-right level-item has-text-right is-narrow">
              <span> {{ userInfo.resident_id || $t('account.notAuthenticated') }} </span>
              <span class="icon image-icon icon-arrow-right"></span>
            </p>
          </v-touch>
        </div>
      </div>
      <v-touch tag="a" class="button is-info is-submit" style="width: 50%; margin-top: 2rem;">
        {{ $t('account.logout') }}
      </v-touch>
    </scroller>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as utils from 'common/js/utils'

import nativeApi from 'common/js/nativeApi'

import {
  showMobileMenu
} from "common/components/mobileMenu"

import scroller from 'common/components/scroller'

import CropUploadDialog from 'common/components/imageCropUpload'

export default {
  data() {
    return {
      isMobileAccountSupported: window.acsConfig.isMobileAccountSupported
    }
  },

  computed: {
    ...mapGetters([
      'userInfo'
    ]),

    avatarUrl() {
      return this.userInfo.avatar_url ? this.userInfo.avatar_url : window.acsConfig.defaultAvatarUrl
    },

    email() {
      return this.userInfo.email ? utils.emailMask(this.userInfo.email) : this.$t('account.notBound')
    },

    mobile() {
      return this.userInfo.mobile ? utils.mobileMask(this.userInfo.mobile) : this.$t('account.notBound')
    }
  },

  methods: {
    ...mapActions([
      'updateUserAvatar'
    ]),

    onUpdateAvatar: function() {
      if (window.acsConfig.inApp) {
        let items = [{
          title: this.$t('common.cancel'),
          value: 'cancel',
        }]

        let cameraAvailable = nativeApi.isMediaSourceTypeAvailable('camera')

        if (nativeApi.isMediaSourceTypeAvailable('photoLib')) {
          items.unshift({
            title: this.$t('common.photoLib'),
            value: 'photoLib',
          })
        }

        if (nativeApi.isMediaSourceTypeAvailable('camera')) {
          items.unshift({
            title: this.$t('common.camera'),
            value: 'camera',
          })
        }

        let menu = showMobileMenu({
          visible: true,
          items: items
        })

        menu.$on('item-selected', (item) => {
          switch (item.value) {
            case 'camera':
              nativeApi.pickAvatarFrom('camera', result => this.handlePickAvatarResult(result))
              break;

            case 'photoLib':
              nativeApi.pickAvatarFrom('photoLib', result => this.handlePickAvatarResult(result))
              break;
          }
        })

      } else {
        CropUploadDialog.show({
          url: '/user/update_avatar',
          callback: result => {
            this.updateUserAvatar(result.user.avatar_url)
          }
        })
      }
    },

    handlePickAvatarResult: function(result) {
      if (result.success) {
        this.updateUserAvatar(`data:image/png;base64, ${result.image}`)
      }
    }
  },

  components: {
    scroller,
  },
}
</script>