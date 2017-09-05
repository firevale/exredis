<template>
  <div class="my_profile">
    <div class="columns is-multiline is-mobile has-text-centered">
      <div class="column is-12">
        <router-link class="icon icon-head-portrait" :to="{name: 'search'}"></router-link>
      </div>
      <div class="column is-12">
        <span class="nickname">
          昵称：firevale&nbsp;&nbsp;
          <router-link class="icon icon-edit" :to="{name: 'search'}"></router-link>
        </span>
      </div>
    </div>
    <div class="binding">
      <div class="level is-mobile">
        <div class="level-left">
          <span class="info">绑定手机：</span>
        </div>
        <div class="level-right">
          <input type="button" value="绑定手机" class="button is-info" />
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <span class="info">绑定邮箱：</span>
        </div>
        <div class="level-right">
          <input type="button" value="绑定邮箱" class="button is-info" />
        </div>
      </div>
      <div class="level is-mobile">
        <div class="level-left">
          <span class="info">实名认证：</span>
        </div>
        <div class="level-right">
          <input type="button" value="实名认证" class="button is-info" />
        </div>
      </div>
    </div>
  </div>
</template>