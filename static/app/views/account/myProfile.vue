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
          <div class="level is-mobile has-bottom-line" style="margin-top: 0.5rem">
            <p class="level-left level-item has-text-left"> {{ $t('account.nickname') }} </p>
            <p class="level-right level-item has-text-right"> {{ userInfo.nickName }} > </p>
          </div>
          <div class="level is-mobile has-bottom-line">
            <p class="level-left level-item has-text-left"> {{ $t('account.mobile') }} </p>
            <p class="level-right level-item has-text-right"> {{ userInfo.mobile || $t('account.notBound') }} > </p>
          </div>
          <div class="level is-mobile has-bottom-line">
            <p class="level-left level-item has-text-left"> {{ $t('account.email') }} </p>
            <p class="level-right level-item has-text-right"> {{ userInfo.email || $t('account.notBound') }} > </p>
          </div>
          <div class="level is-mobile has-bottom-line">
            <p class="level-left level-item has-text-left"> {{ $t('account.residentInfo') }} </p>
            <p class="level-right level-item has-text-right"> {{ userInfo.resident_id || $t('account.notAuthenticated') }} > </p>
          </div>
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

import {
  showMobileMenu
} from "common/components/mobileMenu"

import scroller from 'common/components/scroller'

export default {
  computed: {
    ...mapGetters([
      'userInfo'
    ]),

    avatarUrl() {
      return this.userInfo.avatar_url ? this.userInfo.avatar_url : window.acsConfig.defaultAvatarUrl
    }
  },

  components: {
    scroller,
  },
}
</script>