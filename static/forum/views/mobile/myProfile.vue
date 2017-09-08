<template>
  <div class="my_profile">
    <div class="card has-divider has-text-centered">
      <div class="card-content">
        <p class="title"><a class="icon icon-head-portrait" @click="showTipMsg"></a></p>
        <p class="title" style="display:flex; align-items: center; justify-content: center;">昵称：
          <label v-if="!editName"> {{ userInfo.nickname }}</label>
          <span class="title" v-if="!editName">
            &nbsp;&nbsp;<a class="icon icon-edit" @click="editNickName"></a>
          </span>
          <span v-if="editName">
            <input class="input" type="text" v-model.trim="nickname" :placeholder="$t('forum.placeholder.nickname')"
              :value="userInfo.nickname">&nbsp;&nbsp;
          </span>
          <span v-if="editName">
            <a class="buttons btn-save" @click="onSubmit"></a>
          </span>
        </p>
        <p v-if="tipError" class="tip-error">
          <i class="icon icon-error-tip"></i>
          <strong>{{$t('forum.error.nickNameError')}}</strong>
        </p>
      </div>
    </div>
    <div class="card has-divider">
      <div class="card-content">
        <div class="article">
          <div class="level is-mobile">
            <div class="level-left">
              <span class="title">{{ $t('forum.account.mobile') }}：{{ mobile }}</span>
            </div>
            <div class="level-right">
              <router-link v-if="userInfo.mobile" class="button is-primary has-radius is-thickness" :to="{name: 'editMobile'}"><small>{{ $t('forum.account.change') }}</small></router-link>
              <router-link v-else class="button is-primary has-radius is-thickness" :to="{name: 'editMobile'}"><small>{{ $t('forum.account.mobile') }}</small></router-link>
            </div>
          </div>
        </div>
        <div class="article">
          <div class="level is-mobile">
            <div class="level-left">
              <span class="title">{{ $t('forum.account.email') }}：{{ email }}</span>
            </div>
            <div class="level-right">
              <router-link v-if="userInfo.email" class="button is-primary has-radius is-thickness" :to="{name: 'editEmail'}"><small>{{ $t('forum.account.change') }}</small></router-link>
              <router-link v-else class="button is-primary has-radius is-thickness" :to="{name: 'editEmail'}"><small>{{ $t('forum.account.email') }}</small></router-link>
            </div>
          </div>
        </div>
        <div class="article">
          <div class="level is-mobile" v-if="isMobileAccountSupported">
            <div class="level-left">
              <span class="title">{{ $t('forum.account.residentInfo') }}：{{ userInfo.resident_id? $t('forum.account.authenticated')
                : $t('forum.account.notAuthenticated') }}
              </span>
            </div>
            <div class="level-right">
              <router-link v-if="userInfo.resident_id" class="button is-primary has-radius is-thickness" :to="{name: 'editResident'}"><small>{{ $t('forum.account.change') }}</small></router-link>
              <router-link v-else class="button is-primary has-radius is-thickness" :to="{name: 'editResident'}"><small>{{ $t('forum.account.residentInfo') }}</small></router-link>
            </div>
          </div>
        </div>
        <div class="level is-mobile has-text-centered">
          <div class="level-item">
            <router-link class="button is-primary has-radius logout" :to="{name: 'editResident'}"><small>退出账号</small></router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-show="visible" class="mask" @click="closeTipMsg">
      <div class="tip-message has-radius">
        <p class="title">{{$t('forum.placeholder.headportraitTips')}}</p>
        <div class="icon icon-close close">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import * as utils from 'common/js/utils'
import * as acs from 'common/js/acs'
import nativeApi from 'common/js/nativeApi'


export default {
  data() {
    return {
      visible: false,
      editName: false,
      nickname: '',
      tipError: false
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    isInApp() {
      return acs.isInApp
    },
    isMobileAccountSupported() {
      return acs.isMobileAccountSupported
    },
    showLogout() {
      return acs.showLogout
    },
    avatarUrl() {
      return this.userInfo.avatar_url ? this.userInfo.avatar_url : window.acsConfig.defaultAvatarUrl
    },
    email() {
      return this.userInfo.email ? utils.emailMask(this.userInfo.email) : this.$t(
        'forum.account.notBound')
    },
    mobile() {
      return this.userInfo.mobile ? utils.mobileMask(this.userInfo.mobile) : this.$t(
        'forum.account.notBound')
    }
  },

  methods: {
    ...mapActions(['updateUserNickname']),

    showTipMsg: function() {
      this.visible = true
    },
    closeTipMsg: function() {
      this.visible = false
    },
    editNickName: function() {
      this.editName = true
    },
    logout: function() {
      nativeApi.closeWebviewWithResult({
        success: false,
        action: 'logout',
      })
    },
    checkCharacter: function(val) {
      return /^[\w\u4e00-\u9fa5]+$/gi.test(this.nickname)
    },
    onSubmit: async function() {
      if (!this.checkCharacter(this.nickname)) {
        this.tipError = true
        return
      }

      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.updateUserNickname({
          nickname: utils.formatEmojiChars(this.nickname)
        })
        if (result.success) {
          this.updateUserNickname(this.nickname)
          window.acsConfig.user.nickname = this.nickname
          this.editName = false
          this.tipError = false
        } else {
          this.setErrorMessage(this.$t(result.i18n_message, result.i18n_message_object))
        }
        this.processing = false
      }
    },
  },
}
</script>