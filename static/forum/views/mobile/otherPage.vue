<template>
  <div class="common-page">
    <div class="card has-divider">
      <div class="card-content">
        <div class="comp-author-info">
          <i class="icon icon-head-portrait" />
          <div class="item-left">
            <p class="title">
              昵称：firevale</p>
            <p class="title">
              ID：10238988323</p>
            <p class="title">
              等级：LV.1烟雨悠悠</p>
          </div>
          <p class="item-right  has-text-bottom">
            <input type="button" value="发消息" class="button is-primary" />
          </p>
        </div>
      </div>
    </div>
    <div class="card has-divider">
      <header class="card-header no-box-shadow">
        <p class="card-header-title">
          发过的帖子
        </p>
      </header>
      <div class="card-content">
        <div class="box no-radius is-marginless	is-paddingless">
          <router-link v-for="n in 15" class="article" :to="{name: 'detail', params:{ postId: 1}}" tag="div">
            <p class="title is-ellipsis">
              <strong>[综合讨论]</strong> 如何评价 LPL 夏季总决赛阿斯顿发 EDG vs RNG 3:2 胜利？
            </p>
            <p class="subtitle article-date">
              <span>2017-06-28 17:56</span>
              <span> | </span>
              <span>11111/11111</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>