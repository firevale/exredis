<template>
  <div class="is-ancestor is-parent is-vertical">
    <div class="is-child content-item row-line">
      <div class="arrow-back">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="goBack"></i>
      </div>
      <div class="row-line top-title">
        {{ $t('forum.campaign.title') }}
      </div>
    </div>
    <div class="horizontal-seprate"></div>
    <div class="is-chid  row-menu">
      <div class="service-menu" :class="{'menu-selected': type=='campaign'}" @click="type='campaign'">{{ $t('forum.campaign.gameCampaign') }}</div>
      <div class="service-menu" :class="{'menu-selected': type=='notice'}" @click="type='notice'">{{ $t('forum.campaign.gameNotice') }}</div>
      <div class="service-menu" :class="{'menu-selected': type=='news'}" @click="type='news'">{{ $t('forum.campaign.gameNews') }}</div>
    </div>
    <div class="horizontal-seprate">
      <div :class="{'move-box-left': type=='campaign','move-box-center': type=='notice','move-box-right': type=='news'}">
        <div class="arrow-down"></div>
      </div>
    </div>
    <div class="content-item" v-show="type == 'campaign'">
      <game-campaign ref="campaign" :campaigns="campaignList"></game-campaign>
    </div>
    <div class="content-item" v-show="type == 'notice'">
      <game-notice ref="notice" :notices="noticeList"></game-notice>
    </div>
    <div class="content-item" v-show="type == 'news'">
      <game-news ref="news" :news="news"></game-news>
    </div>
  </div>
</template>
<script>
  import gameCampaign from "../components/gameCampaign"
  import gameNotice from "../components/gameNotice"
  import gameNews from "../components/gameNews"

  export default {
    data() {
      return {
        type: 'news',
        campaignList: [{
          url: 'http://img5.imgtn.bdimg.com/it/u=2886811038,3749890815&fm=11&gp=0.jpg',
          content: '# 感恩节回馈活动 \n' +
            '## 枪神默示录感恩节回馈活动 \n' +
            '* 活动时间： 11月24日-11月27日.\r' +
            '* 感恩节\r' +
            '怀着一颗感恩的心\r' +
            '俺们准备了一波感恩节回馈活动精彩内容，尽在百度攻略: \r' +
            '   * 谢谢你们能喜欢的枪神所创造的平安世界\r' +
            '```' +
            '活动内容:' +
            '```\n' +
            '![mahua](http://img5.imgtn.bdimg.com/it/u=2886811038,3749890815&fm=11&gp=0.jpg)\n' +
            '',
        }, {
          url: 'http://img3.imgtn.bdimg.com/it/u=2256557625,171135066&fm=11&gp=0.jpg',
          content: '',
        }, {
          url: 'http://img3.imgtn.bdimg.com/it/u=539374784,2809827109&fm=23&gp=0.jpg',
          content: '',
        }, {
          url: 'http://img1.imgtn.bdimg.com/it/u=1446531649,1771675728&fm=23&gp=0.jpg',
          content: '',
        }],
        noticeList: [{
          title: '11月12日补丁更新公告',
          content: '# 感恩节回馈活动 \n' +
            '## 枪神默示录感恩节回馈活动 \n' +
            '* 活动时间： 11月24日-11月27日.\r' +
            '* 感恩节\r' +
            '怀着一颗感恩的心\r' +
            '俺们准备了一波感恩节回馈活动精彩内容，尽在百度攻略: \r' +
            '   * 谢谢你们能喜欢的枪神所创造的平安世界\r' +
            '```' +
            '活动内容:' +
            '```\n' +
            '![mahua](http://img5.imgtn.bdimg.com/it/u=2886811038,3749890815&fm=11&gp=0.jpg)\n' +
            '',
        }, {
          title: '10月8日补丁更新公告',
          content: '',
        }, {
          title: '补丁更新公告（11.07）',
          content: '',
        }, {
          title: '补丁更新公告（10.22-10.27）',
          content: '',
        }, {
          title: '<枪神默示录>手游ios安装包更新公告',
          content: '',
        }, {
          title: '9月8日服务器维护公告',
          content: '',
        }, {
          title: '关于《枪神默示录》禁止第三方交易行为的公告',
          content: '',
        }, ],
        news: {
          topImgs: [{
              url: 'http://img1.imgtn.bdimg.com/it/u=3395195734,3354344119&fm=23&gp=0.jpg',
              title: '荣获 “最受欢迎二次元游戏”'
            },
            {
              url: 'http://img0.imgtn.bdimg.com/it/u=1306467654,668723988&fm=23&gp=0.jpg',
              title: '创意神枪设计大赛'
            },
            {
              url: 'http://img0.imgtn.bdimg.com/it/u=643206267,1842588411&fm=23&gp=0.jpg',
              title: '感恩节回馈计划全情报公开'
            },
          ],
          list: [{
            title: '颠覆性工会玩法！《枪神默示录》新系统开放',
            content: '# 感恩节回馈活动 \n' +
              '## 枪神默示录感恩节回馈活动 \n' +
              '* 活动时间： 11月24日-11月27日.\r' +
              '* 感恩节\r' +
              '怀着一颗感恩的心\r' +
              '俺们准备了一波感恩节回馈活动精彩内容，尽在百度攻略: \r' +
              '   * 谢谢你们能喜欢的枪神所创造的平安世界\r' +
              '```' +
              '活动内容:' +
              '```\n' +
              '![mahua](http://img5.imgtn.bdimg.com/it/u=2886811038,3749890815&fm=11&gp=0.jpg)\n' +
              '',
            time: '2016-10-31',
          }, {
            title: '颠覆性工会玩法！《枪神默示录》新系统开放',
            content: '',
            time: '2016-10-28',
          }, {
            title: '颠覆性工会玩法！《枪神默示录》新系统开放',
            content: '',
            time: '2016-1-31',
          }, ],
        },
      }
    },
    methods: {
      goBack() {
        if (this.type == 'campaign' && this.$refs.campaign.showDetail) {
          this.$refs.campaign.showDetail = false
        }
        if (this.type == 'news' && this.$refs.news.showDetail) {
          this.$refs.news.showDetail = false
        } else {
          this.$router.go(-1)
        }
      }
    },
    components: {
      gameCampaign,
      gameNotice,
      gameNews,
    }
  }
</script>