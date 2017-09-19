<template>
  <div class="message-detail">
    <div class="card has-text-centered">
      <p class="card-content">小鲁子</p>
    </div>
    <div class="card">
      <div class="card-content has-text-centered">
        <span class="tag is-light">2017-09-15 12:25</span>
      </div>
      <div class="card-content">
        <div v-for="n in 15" class="message-item">
          <div class="content flex flex-left">
            <div class="flex flex-left">
              <a class="icon icon-head-portrait-small"></a>
              <p class="other-message has-radius">你很热烈庆祝分发俄方吗？</p>
            </div>
          </div>
          <div class="content flex flex-right">
            <div class="flex flex-left">
              <p class="self-message has-radius">你哦发俄方吗</p>
              <a class="icon icon-head-portrait-small"></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="message-bar flex flex-vcentered flex-center">
      <input class="input is-fullwidth" type="text">
      <i class="icon icon-message-emoji" />
      <i class="icon icon-message-pic" />
    </div>
  </div>
</template>