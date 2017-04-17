<template>
  <div style="position: relative">
    <scroller class="account-info">
      <div class="columns is-mobile is-multiline is-paddingless is-marginless">
        <div class="column is-3">
          <figure class="image is-64x64 avatar-image" style="margin: 1rem auto;">
            <img :src="avatarUrl"></img>
          </figure>
          <div class="level is-mobile is-paddingless">
            <p class="level-center level-item has-text-right"> {{ $t('account.userId') }}: {{ userInfo.id }}</p>
          </div>
        </div>
        <div class="column is-9">
          <v-touch class="level is-mobile is-clickable has-bottom-line" style="margin-top: 0.5rem" @tap="$router.push({path: '/account/edit_nickname'})">
            <p class="level-left level-item has-text-left"> {{ $t('account.nickname') }} </p>
            <p class="level-right level-item has-text-right">
              {{ userInfo.nickName }}
              <span class="icon image-icon icon-arrow-right"></span>
            </p>
          </v-touch>
          <v-touch v-if="isMobileAccountSupported" class="level is-mobile is-clickable has-bottom-line" @tap="$router.push({path: '/account/edit_mobile'})">
            <p class="level-left level-item has-text-left"> {{ $t('account.mobile') }} </p>
            <p class="level-right level-item has-text-right">
              {{ mobile }}
              <span class="icon image-icon icon-arrow-right"> </span>
            </p>
          </v-touch>
          <v-touch class="level is-mobile is-clickable has-bottom-line" @tap="$router.push({path: '/account/edit_email'})">
            <p class="level-left level-item has-text-left"> {{ $t('account.email') }} </p>
            <p class="level-right level-item has-text-right">
              {{ email }}
              <span class="icon image-icon icon-arrow-right"></span>
            </p>
          </v-touch>
          <v-touch v-if="isMobileAccountSupported" class="level is-mobile is-clickable has-bottom-line" @tap="$router.push({path: '/account/edit_resident'})">
            <p class="level-left level-item has-text-left"> {{ $t('account.residentInfo') }} </p>
            <p class="level-right level-item has-text-right">
              {{ userInfo.resident_id || $t('account.notAuthenticated') }}
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

import {
  showMobileMenu
} from "common/components/mobileMenu"

import scroller from 'common/components/scroller'

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

  },

  components: {
    scroller,
  },
}
</script>