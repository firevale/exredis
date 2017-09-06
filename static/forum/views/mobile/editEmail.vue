<template>
  <div class="account">
    <div class="binding-msg">
      <p>您已绑定的邮箱为
        <span>fireball@fireball.com</span>
      </p>
    </div>
    <div class="fields">
      <div class="field">
        <div class="control">
          <input class="input" type="text" placeholder="请输入绑定邮箱">
        </div>
      </div>
      <div class="field has-addons">
        <div class="control">
          <input class="input" type="text" placeholder="请输入验证码">
        </div>
        <div class="control">
          <v-touch tag="a" class="button is-primary">
            获取验证码
          </v-touch>
        </div>
      </div>
    </div>
    <p class="tip-error">
      <span class="icon icon-error-tip"></span>
      <span>&nbsp;验证码错误</span>
    </p>
    <a class="buttons btn-binding binding"></a>
  </div>
</template>