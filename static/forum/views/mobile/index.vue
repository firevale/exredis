<template>
  <div class="index-page">
    <div class="index-swiper">
      <img src="https://placehold.it/375x182?text=1242x600">
    </div>
    <div class="card index-nav has-divider">
      <div class="card-content level is-mobile">
        <router-link class="level-item" :to="{name: 'list'}">
          <figure class="has-text-centered">
            <img src="~assets/themes/jqxs_mobile/12_03.png">
            <figcaption>
              <small>游戏官网</small>
            </figcaption>
          </figure>
        </router-link>
        <router-link class="level-item" :to="{name: 'list'}">
          <figure class="has-text-centered">
            <img src="~assets/themes/jqxs_mobile/12_05.png">
            <figcaption>
              <small>新闻资讯</small>
            </figcaption>
          </figure>
        </router-link>
        <router-link class="level-item" :to="{name: 'list'}">
          <figure class="has-text-centered">
            <img src="~assets/themes/jqxs_mobile/12_07.png">
            <figcaption>
              <small>游戏攻略</small>
            </figcaption>
          </figure>
        </router-link>
        <router-link class="level-item" :to="{name: 'list'}">
          <figure class="has-text-centered">
            <img src="~assets/themes/jqxs_mobile/12_09.png">
            <figcaption>
              <small>联系客服</small>
            </figcaption>
          </figure>
        </router-link>
      </div>
    </div>
    <div class="card forum-section has-divider">
      <header class="card-header">
        <p class="card-header-title">
          | 论坛版块
        </p>
      </header>
      <div class="card-content">
        <div class="forum-info">
          <router-link class="forum-item" :to="{name: 'list'}" tag="div">
            <figure>
              <img src="~assets/themes/jqxs_mobile/1_16.png">
            </figure>
            <div class="forum-content">
              <p class="title">综合讨论 </p>
              <p class="subtitle"> 最新公告，更新维护</p>
            </div>
          </router-link>
          <router-link class="forum-item" :to="{name: 'list'}" tag="div">
            <figure>
              <img src="~assets/themes/jqxs_mobile/1_16.png">
            </figure>
            <div class="forum-content">
              <p class="title">综合讨论 </p>
              <p class="subtitle"> 最新公告，更新维护</p>
            </div>
          </router-link>
          <router-link class="forum-item" :to="{name: 'list'}" tag="div">
            <figure>
              <img src="~assets/themes/jqxs_mobile/1_16.png">
            </figure>
            <div class="forum-content">
              <p class="title">综合讨论 </p>
              <p class="subtitle"> 最新公告，更新维护</p>
            </div>
          </router-link>
          <router-link class="forum-item" :to="{name: 'list'}" tag="div">
            <figure>
              <img src="~assets/themes/jqxs_mobile/1_16.png">
            </figure>
            <div class="forum-content">
              <p class="title">综合讨论 </p>
              <p class="subtitle"> 最新公告，更新维护</p>
            </div>
          </router-link>
        </div>
        <div>
          <a class="button load-more">查看更多</a>
        </div>
      </div>
    </div>
    <div class="card article-section has-divider">
      <header class="card-header">
        <p class="card-header-title">
          | 热门推荐
        </p>
      </header>
      <div class="card-content">
        <v-touch class="media article">
          <figure class="media-left">
            <p class="image">
              <img src="https://placehold.it/312x178?text=312x178">
            </p>
          </figure>
          <div class="media-content is-clipped">
            <p class="title is-ellipsis">
              <strong>[综合讨论]</strong> 如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？
            </p>
            <p class="subtitle">
              为什么猪女会这么打？ 第一个原因自然是：己方辅助是牛头，对方adc是寒冰，对方的腿短和己
            </p>
          </div>
        </v-touch>
        <v-touch class="media article">
          <figure class="media-left">
            <p class="image">
              <img src="https://placehold.it/312x178?text=312x178">
            </p>
          </figure>
          <div class="media-content is-clipped">
            <p class="title is-ellipsis">
              <strong>[综合讨论]</strong> 如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？
            </p>
            <p class="subtitle">
              为什么猪女会这么打？ 第一个原因自然是：己方辅助是牛头，对方adc是寒冰，对方的腿短和己
            </p>
          </div>
        </v-touch>
        <v-touch class="media article">
          <figure class="media-left">
            <p class="image">
              <img src="https://placehold.it/312x178?text=312x178">
            </p>
          </figure>
          <div class="media-content is-clipped">
            <p class="title is-ellipsis">
              <strong>[综合讨论]</strong> 如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？
            </p>
            <p class="subtitle">
              为什么猪女会这么打？ 第一个原因自然是：己方辅助是牛头，对方adc是寒冰，对方的腿短和己
            </p>
          </div>
        </v-touch>
        <v-touch class="media article">
          <figure class="media-left">
            <p class="image">
              <img src="https://placehold.it/312x178?text=312x178">
            </p>
          </figure>
          <div class="media-content is-clipped">
            <p class="title is-ellipsis">
              <strong>[综合讨论]</strong> 如何评价 LPL 夏季总决赛 EDG vs RNG 3:2 胜利？
            </p>
            <p class="subtitle">
              为什么猪女会这么打？ 第一个原因自然是：己方辅助是牛头，对方adc是寒冰，对方的腿短和己
            </p>
          </div>
        </v-touch>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {},

  data() {
    return {}
  },

  methods: {}
}
</script>