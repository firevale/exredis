<template>
  <div class="account">
    <form>
      <div class="fields">
        <div class="field">
          <div class="control">
            <input class="input is-primary" type="text" placeholder="请输入手机号／邮箱">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <input class="input is-primary" type="text" placeholder="请输入密码">
          </div>
        </div>
        <div class="field">
          <div class="control">
            <span class="icon icon-error-tip"></span>
            <strong>用户名或密码不争气</strong>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <v-touch tag="button" class="button is-primary is-fullwidth has-radius">
              <span class="title is-white">登录</span>
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