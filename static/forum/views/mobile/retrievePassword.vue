<template>
  <div class="account">
    <form>
      <div class="fields">
        <div class="field">
          <div class="control">
            <input class="input is-primary no-radius" type="text" placeholder="请输入手机号／邮箱">
          </div>
        </div>
        <div class="field has-addons">
          <div class="control is-expanded">
            <input class="input is-primary no-radius is-fullwidth" type="text" placeholder="请输入验证码">
          </div>
          <div class="control">
            <v-touch tag="button" type="button" class="button is-primary btn-verfy">
              获取验证码
            </v-touch>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-primary no-radius" type="text" placeholder="请输入新密码">
          </div>
          <p class="help">
            <span class="icon icon-error-tip"></span>
            <strong>手机号错误</strong>
          </p>
        </div>
        <div class="field">
          <div class="control">
            <v-touch tag="button" type="submit" class="button is-primary is-small is-fullwidth has-radius">
              保存
            </v-touch>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>