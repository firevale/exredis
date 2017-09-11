<template>
  <div class="my-message">
    <div class="card has-divider">
      <div class="card-content is-paddingless">
        <router-link v-for="n in 15" class="message-item title" :to="{name: 'myMessage', params:{ }}" tag="div">
          <div class="comp-author-info">
            <figure class="is-large is-relative">
              <img class="is-large" src="~assets/themes/jqxs_mobile/19_03-2_03.png">
              <small class="tip-number">{{n}}</small>
            </figure>
            <div class="item-left">
              <p class="title">
                小路子</p>
              <p class="title">
                今天去不去LOL辅导课</p>
            </div>
            <p class="item-right  has-text-top">
              <span class="subtitle">2017-09-12 12:33</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>