<template>
  <div class="common-page">
    <scroller class="flex-fixed-rest" ref="scroller">
      <div class="card">
        <div class="card-content">
          <div class="comp-author-info">
            <i class="icon icon-head-portrait" />
            <div class="item-left">
              <p class="title">
                昵称：firevale
                <span class="tag is-info subtitle">官方版主</span>
              </p>
              <p class="title">
                ID：10238988323</p>
              <p class="title">
                等级：LV.1烟雨悠悠</p>
            </div>
            <p class="item-right  has-text-bottom">
              <a class="button is-primary" href="replyMessage">发消息</a>
            </p>
          </div>
        </div>
      </div>
      <div class="card">
        <header class="card-header no-box-shadow">
          <p class="card-header-title">
            发过的帖子
          </p>
        </header>
        <div class="card-content">
          <div class="box no-radius is-marginless	is-paddingless">
            <router-link v-for="n in 15" class="article" :to="{name: 'detail', params:{ postId: 1}}" tag="div">
              <p class="title is-ellipsis-2">
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
    </scroller>
  </div>
</template>