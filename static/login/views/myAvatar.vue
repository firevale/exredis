<template>
  <div class="login-box">
    <validation name="portrait">
      <div class="row-login">
        <p class="title" style="font-size: 1.2rem;line-height: 1rem;">{{ $t('account.myAvatar.title') }}</p>
      </div>
      <div class="row-login" style="justify-content: center;margin-top: .2rem;">
        <img class="is-84x84" :src="picUrl"></img>
      </div>
      <div class="row-login">
        <input type="submit" class="native-button" :class="{'is-disabled': processing}" :value="$t('account.myAvatar.choosePicture')"
          :disabled="processing" @click="choosePicture" />
        <span v-show="processing" class="icon progress-icon rotating"></span>
      </div>
      <div class="row-login">
        <input type="submit" class="native-button" :class="{'is-disabled': processing}" :value="$t('account.myAvatar.takePicture')"
          :disabled="processing" @click="shotPicture" />
        <span v-show="processing" class="icon progress-icon rotating"></span>
      </div>
    </validation>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'
  import native from '../common/nativeApi'
  export default {
    data: function() {
      return {
        picUrl: 'https://assets.servedby-buysellads.com/p/manage/asset/id/28536',
        processing: false,
        editNick: false,
      }
    },

    computed: {
      
    },

    methods: {
      choosePicture(){
        native
      },

      shotPicture(){
        native
      },
    },
  }
</script>