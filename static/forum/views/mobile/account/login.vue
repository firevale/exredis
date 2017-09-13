<template>
  <div class="account">
    <form>
      <div class="fields">
        <div class="field">
          <div class="control">
            <input class="input is-primary is-radiusless" type="text" placeholder="请输入手机号／邮箱">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-primary is-radiusless" type="text" placeholder="请输入密码">
          </div>
          <p class="help">
            <span class="icon icon-error-tip"></span>
            <strong>用户名或密码不争气</strong>
          </p>
        </div>
        <div class="field">
          <div class="control">
            <v-touch tag="button" class="button is-primary is-small is-fullwidth has-radius">
              登录
            </v-touch>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <div class="is-relative">
              <span class="is-left title is-olive">快速注册</span>
              <span class="is-right title is-olive">忘记密码</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>