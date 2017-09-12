<template>
  <div class="common-message">
    <div class="card">
      <div class="card-content spacing">
        <input class="input" type="text" placeholder="请填写用户昵称">
      </div>
      <div class="card-content">
        <div class="content">
          <span class="title">
            <i class="icon icon-message-pic" /><i class="icon icon-message-emoji" />
          </span>
          <p class="title">
            <textarea class="textarea no-radius no-border" placeholder="请填写消息内容"></textarea>
          </p>
        </div>
        <div class="content comp-author-info align-items-center">
          <span class="item-left">
            <a class="button is-primary is-blackness">发送</a>
          </span>
          <span class="item-right">
            <i class="icon icon-error-tip"></i>
            <strong>请输入昵称</strong>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>