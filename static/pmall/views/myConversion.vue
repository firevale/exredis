<template>
  <div class="my-conversion">
    <header class=" is-flex flex-vcentered flex-left">
      客服邮箱：<i class="icon icon-email"></i>&nbsp;jqxs@firevale.com
    </header>
    <div class="conversion-content">
      <div class="conversion-item" v-for="n in 15">
        <span class="title">兑换记录1：礼品名称cdkey（休闲鞋）</span>
        <div>
          <span class="subtitle">兑换时间：2017年10月11日13时15分</span>
          <span class="is-right title">-45积分</span>
        </div>
      </div>
    </div>
    <footer class="is-flex flex-center flex-vcentered">
      <div class="loadmore">查看更多</div>
    </footer>
  </div>
</template>