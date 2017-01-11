<template>
  <div class="is-ancestor is-parent is-vertical ">
    <div class="is-child content-item rowLine">
      <div class="arrow-back">
        <i class="fa fa-angle-left title is-2 dark" aria-hidden="true" @click="goBack"></i>
      </div>
      <div class="search-title">
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
    </div>
    <div class="content-item" v-show="type == 'news'">
    </div>
  </div>
</template>
<script>
  import gameCampaign from "../components/gameCampaign"

  export default {
    data() {
      return {
        type: 'campaign',
        campaignList: [{
          url: 'http://img5.imgtn.bdimg.com/it/u=2886811038,3749890815&fm=11&gp=0.jpg',
          content: '# 感恩节回馈活动 \n'+
                  '## 枪神默示录感恩节回馈活动 \n'+
                  '* 活动时间： 11月24日-11月27日.\r'+
                  '* 感恩节\r'+
                  '怀着一颗感恩的心\r'+
                  '俺们准备了一波感恩节回馈活动精彩内容，尽在百度攻略: \r'+
                  '   * 谢谢你们能喜欢的枪神所创造的平安世界\r'+
                  '```'+
                  '活动内容:'+
                  '```\n'+
                  '![mahua](http://img5.imgtn.bdimg.com/it/u=2886811038,3749890815&fm=11&gp=0.jpg)\n'+
                  '',
        },{
          url: 'http://img3.imgtn.bdimg.com/it/u=2256557625,171135066&fm=11&gp=0.jpg',
          content: '',
        },{
          url: 'http://img3.imgtn.bdimg.com/it/u=539374784,2809827109&fm=23&gp=0.jpg',
          content: '',
        },{
          url: 'http://img1.imgtn.bdimg.com/it/u=1446531649,1771675728&fm=23&gp=0.jpg',
          content: '',
        }],
      }
    },
    methods: {
      goBack(){
        if(this.type == 'campaign'&&this.$refs.campaign.showDetail){
          this.$refs.campaign.showDetail = false
        }else{
          this.$router.go(-1)
        }
      }
    },
    components: {
      gameCampaign,
    }
  }
</script>
<style lang="scss">
  @import "../scss/color";
  .row-menu {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;
    justify-content: space-around;
    font-size: 1.3rem;
    margin: .5rem 1rem;
    .service-menu {
      font-size: 1rem;
    }
  }
  
  .horizontal-seprate {
    height: .3rem;
    margin: .2rem 1rem;
    background-color: $text-grey;
    .move-box-left {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 8.4%;
      transition: margin 1s ease;
    }
    .move-box-center {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 41.6%;
      transition: margin 1s ease;
    }
    .move-box-right {
      height: 100%;
      background-color: $link;
      width: 16.66%;
      margin-left: 74.9%;
      transition: margin 1s ease;
    }
    .arrow-down {
      height: .4rem;
      width: .4rem;
      border: .5rem solid transparent;
      border-top: .7rem solid $link;
      margin: 0 auto;
    }
  }
</style>