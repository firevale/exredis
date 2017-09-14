<template>
  <div class="common-message">
    <div class="card">
      <div class="card-content spacing">
        <span class="title">发送给：小鹿子</span>
      </div>
      <div class="card-content">
        <div class="content">
          <span class="title">
            <i class="icon icon-message-pic" /><i class="icon icon-message-emoji" />
          </span>
          <p class="title">
            <textarea class="textarea is-radiusless is-borderless" placeholder="请填写消息内容"></textarea>
          </p>
        </div>
        <div class="content comp-author-info align-items">
          <span class="item-left">
            <a class="button is-primary is-blackness">发送</a>
          </span>
          <span class="item-right">
            <i class="icon icon-error-tip"></i>
            <strong>请输入内容</strong>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>