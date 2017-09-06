<template>
  <div class="my_profile">
    <div class="columns is-multiline is-mobile has-text-centered">
      <div class="column is-12">
        <a class="icon icon-head-portrait" @click="showTipMsg"></a>
      </div>
      <div class="column is-12">
        <span class="nickname">
          昵称：firevale&nbsp;&nbsp;
          <router-link class="icon icon-edit" :to="{name: 'search'}"></router-link>
        </span>
      </div>
    </div>
    <div class="binding">
      <div class="level is-mobile has-bottom-line">
        <div class="level-left">
          <span>绑定手机：未绑定</span>
        </div>
        <div class="level-right">
          <router-link class="buttons btn-binding-mobile" :to="{name: 'editMobile'}"></router-link>
          <!-- <router-link class="buttons btn-change" :to="{name: 'editMobile'}"></router-link> -->
        </div>
      </div>
      <div class="level is-mobile has-bottom-line">
        <div class="level-left">
          <span>绑定邮箱：未绑定</span>
        </div>
        <div class="level-right">
          <router-link class="buttons btn-binding-email" :to="{name: 'editEmail'}"></router-link>
          <!-- <router-link class="buttons btn-change" :to="{name: 'editEmail'}"></router-link> -->
        </div>
      </div>
      <div class="level is-mobile has-bottom-line">
        <div class="level-left">
          <span>实名认证：未认证</span>
        </div>
        <div class="level-right">
          <router-link class="buttons btn-binding-resident" :to="{name: 'editResident'}"></router-link>
          <!-- <router-link class="buttons btn-change" :to="{name: 'editResident'}"></router-link> -->
        </div>
      </div>
    </div>
    <div class="level is-mobile has-text-centered">
      <div class="level-item">
        <a class="buttons btn-logout logout"></a>
      </div>
    </div>
    <div v-show="visible" class="mask" @click="closeTipMsg">
      <div class="tip-message">
        很抱歉，手机版论坛暂不支持更换头像您可以登录电脑版论坛进行更换
        <div class="icon icon-close close">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    showTipMsg: function() {
      this.visible = true
    },
    closeTipMsg: function() {
      this.visible = false
    }
  },
}
</script>