<template>
  <div class="scroller-container">
    <div ref="scroller" class="scroller">       
      <div ref="scroller_content" class="scroller-content">
        <div v-if="onRefresh" class="pull-to-refresh-layer">
          <div class="pull-to-refresh" v-if="refreshState == 0 && !loading">{{ this.i18n.pullToRefresh }}</div>
          <div class="release-to-refresh" v-if="refreshState == 1 && !loading">{{ this.i18n.releaseToRefresh }}</div>
          <div class="refreshing" v-if="refreshState == 2 && !loading">{{ this.i18n.refreshing }}</div>
        </div>
        <slot></slot>
        <div ref="loading_layer" class="loading-layer">
          <slot name="all-loaded" v-if="allLoaded"> {{ this.i18n.noMoreData }} </slot>
          <slot name="loading" v-if="loading">
            <span class="icon image-icon icon-spinner rotating"> </span> 
          </slot>
        </div>
        <div style="width: 100%; height: 10rem;">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IScroll from 'common/iscroll-infinite.js'
import ResizeSensor from 'common/resizeSensor'

const PULL_TO_REFRESH = 0
const RELEASE_TO_REFRESH = 1
const REFRESHING = 2

const REM_SIZE = parseFloat(getComputedStyle(document.querySelector("html")).fontSize)

export default {
  props: {
    onRefresh: Function,
    onLoadMore: Function,
    i18n: {
      type: Object,
      default: _ => {
        return {
          pullToRefresh: '下拉刷新',
          releaseToRefresh: '释放加载',
          refreshing: '加载中, 请稍候',
          noMoreData: '没有更多数据啦',
        }
      }
    },
    options: {
      type: Object,
      default: _ => {
        return {
          mouseWheel: true,
          scrollX: false,
          scrollY: true,
        }
      }
    }
  },

  data: function() {
    return {
      refreshState: PULL_TO_REFRESH,
      iscroll: null,
      checkInterval: null,
      loading: false,
      allLoaded: false,
      counter: 0,
      isScrolling: false,
      needRefresh: false,
    }
  },

  beforeDestroy: function() {
    this.checkInterval && clearInterval(this.checkInterval)
    this.checkInterval = null
    this.iscroll && this.iscroll.destroy()
    this.iscroll = null
  },

  mounted: function() {
    this.$on('all-loaded', _ => this.allLoaded = true)
    this.$on('reset', _ => {
      this.$nextTick(_ => {
        this.allLoaded = false
        this.checkLoadMore()
      })
    })
    this.$nextTick(_ => {
      this.iscroll = new IScroll(this.$refs.scroller, {
        ...this.options,
        mouseWheel: true,
        scrollX: false,
        scrollY: true,
      })
      this.iscroll.on('scrollStart', this.scrollStart)
      this.iscroll.on('scrollCancel', this.scrollCancel)
      this.iscroll.on('scrollEnd', this.scrollEnd)
      this.iscroll.on('bounceStart', this.bounceStart)
      this.resetScrollTop()
      this.$nextTick(_ => this.checkLoadMore())
      this.sensor = new ResizeSensor(this.$refs.scroller_content, _ => {
        if (!this.isScrolling) {
          if (this.iscroll.isInTransition) {
            setTimeout(_ => {
              this.iscroll.refresh()
            }, 600)
          } else {
            this.$nextTick(_ => {
              this.iscroll.refresh()
            })
          }
        } else {
          this.needRefresh = true
        }
      })
    })
  },

  methods: {
    resetScrollTop: function() {
      this.$refs.scroller.scrollTop = 0

      if (this.onRefresh) {
        this.iscroll.minScrollY = -4 * REM_SIZE
      } else {
        this.iscroll.minScrollY = 0
      }
    },

    scrollStart: function() {
      this.counter = 0
      this.isScrolling = true
      if (!this.loading) {
        this.checkInterval = setInterval(_ => this.checkScroll(), 100)
      }
    },

    scrollCancel: function() {
      this.counter = 0
      this.isScrolling = false
      if (this.needRefresh) {
        this.iscroll.refresh()
        this.needRefresh = false
      }

      clearInterval(this.checkInterval)
      this.checkInterval = null
    },

    scrollEnd: async function() {
      clearInterval(this.checkInterval)
      this.checkInterval = null
      this.isScrolling = false

      if (this.needRefresh) {
        this.iscroll.refresh()
        this.needRefresh = false
      }

      this.checkLoadMore()
    },

    bounceStart: async function() {
      if (this.onRefresh && this.refreshState == RELEASE_TO_REFRESH) {
        this.refreshState = REFRESHING
        this.allLoaded = false
        await this.onRefresh()
        if (this.iscroll) {
          this.iscroll.tempY = null
          if (!this.isScrolling) {
            this.iscroll.resetPosition(600)
          } else {
            this.needRefresh = true
          }
        }
        this.refreshState = PULL_TO_REFRESH
        this.checkLoadMore()
      }
    },

    checkScroll: function() {
      if (this.iscroll && this.onRefresh && !this.loading && !this.iscroll.isInTransition) {
        if (this.iscroll.y >= REM_SIZE * 4 && this.iscroll.directionY <= 0) {
          if (this.counter++ >= 4) {
            this.refreshState = RELEASE_TO_REFRESH
            this.iscroll.tempY = 4 * REM_SIZE
          }
        } else if (this.iscroll.y < REM_SIZE * 4 && this.iscroll.directionY >= 0) {
          this.counter = 0
          this.refreshState = PULL_TO_REFRESH
          this.iscroll.tempY = null
        }
      }
    },

    checkLoadMore: async function() {
      if (this.onLoadMore && !this.allLoaded && this.iscroll &&
        (this.iscroll.y <= this.iscroll.maxScrollY ||
          this.$refs.loading_layer.offsetTop < this.$refs.scroller.clientHeight)) {
        this.loading = true
        await this.onLoadMore()
        this.loading = false
        this.$nextTick(_ => this.checkLoadMore())
      }
    },
  },
}
</script>
<style lang="scss">
@keyframes arrowAnimDown {
  to {
    transform: translateY(0.5rem) rotate(45deg);
    opacity: 0;
  }
}

@keyframes arrowAnimUp {
  to {
    transform: translateY(-0.5rem) rotate(225deg);
    opacity: 0;
  }
}

.scroller-container {
  position: relative;
  width: 100%;
  height: 100%;

  .scroller {
    touch-action: none;
    position: absolute;
    overflow: hidden;
    width: 100%;
    height: 100%;

    &-content {
      -webkit-transform-style: preserve-3d;
      transform-style: preserve-3d;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      
      min-height: 100vh;

      .pull-to-refresh-layer,
      .loading-layer {
        width: 100%;
        height: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span.icon {
          width: 2.5rem;
          height: 2.5rem;
        }
      }
      .pull-to-refresh-layer {
        margin-top: -4rem;

        .pull-to-refresh,
        .release-to-refresh,
        .refreshing {
          color: #cacaca;
          position: relative;
          font-size: 1.25rem;

          &:before {
            content: "";
            position: absolute;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            border: none;
            top: 0.125rem;
            left: -1.5rem;
            width: 1.5rem;
            height: 1.5rem;
            transform: rotate(90deg); // animation: arrowAnimUp 1.5s infinite;
            background-image: url("data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" \
                                              xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" \
                                              viewBox=\"0 0 297 297\" style=\"enable-background:new 0 0 297 297;\" xml:space=\"preserve\" \
                                              width=\"512px\" height=\"512px\"> \
                                  <g> \
                                    <polygon points=\"33,66 0,66 66,148 0,231 33,231 99,148  \" fill=\"#cacaca\"/> \
                                    <polygon points=\"83,66 50,66 116,148 50,231 83,231 149,148  \" fill=\"#cacaca\"/> \
                                    <polygon points=\"133,66 100,66 166,148 100,231 133,231 199,148  \" fill=\"#cacaca\"/> \
                                    <polygon points=\"231,66 149,66 215,148 149,231 231,231 297,148  \" fill=\"#cacaca\"/> \
                                  </g> \
                                  </svg>");
          }
        }

        .release-to-refresh:before {
          transform: rotate(270deg); // animation: arrowAnimUp 1.5s infinite;
        }

        .refreshing:before {
          background-image: url("data:image/svg+xml;utf8,<svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"512\" height=\"512\" viewBox=\"0 0 512 512\"> \
    <g> \
    </g> \
  	<path d=\"M275.682 147.999c0 10.864-8.837 19.661-19.682 19.661v0c-10.875 0-19.681-8.796-19.681-19.661v-96.635c0-10.885 8.806-19.661 19.681-19.661v0c10.844 0 19.682 8.776 19.682 19.661v96.635z\" fill=\"#cacaca\" /> \
  	<path d=\"M275.682 460.615c0 10.865-8.837 19.682-19.682 19.682v0c-10.875 0-19.681-8.817-19.681-19.682v-96.604c0-10.885 8.806-19.681 19.681-19.681v0c10.844 0 19.682 8.796 19.682 19.682v96.604z\" fill=\"#cacaca\" /> \
  	<path d=\"M147.978 236.339c10.885 0 19.681 8.755 19.681 19.641v0c0 10.885-8.796 19.702-19.681 19.702h-96.624c-10.864 0-19.661-8.817-19.661-19.702v0c0-10.885 8.796-19.641 19.661-19.641h96.624z\" fill=\"#cacaca\" /> \
  	<path d=\"M460.615 236.339c10.865 0 19.682 8.755 19.682 19.641v0c0 10.885-8.817 19.702-19.682 19.702h-96.584c-10.885 0-19.722-8.817-19.722-19.702v0c0-10.885 8.837-19.641 19.722-19.641h96.584z\" fill=\"#cacaca\" /> \
  	<path d=\"M193.546 165.703c7.69 7.66 7.68 20.142 0 27.822v0c-7.701 7.701-20.162 7.701-27.853 0.020l-68.311-68.322c-7.68-7.701-7.68-20.142 0-27.863v0c7.68-7.68 20.121-7.68 27.822 0l68.342 68.342z\" fill=\"#cacaca\" /> \
  	<path d=\"M414.597 386.775c7.7 7.68 7.7 20.163 0.021 27.863v0c-7.7 7.659-20.142 7.659-27.843-0.062l-68.311-68.26c-7.68-7.7-7.68-20.204 0-27.863v0c7.68-7.7 20.163-7.7 27.842 0l68.291 68.322z\" fill=\"#cacaca\" /> \
  	<path d=\"M165.694 318.464c7.69-7.7 20.153-7.7 27.853 0v0c7.68 7.659 7.69 20.163 0 27.863l-68.342 68.322c-7.67 7.659-20.142 7.659-27.822-0.062v0c-7.68-7.68-7.68-20.122 0-27.801l68.311-68.322z\" fill=\"#cacaca\" /> \
  	<path d=\"M386.775 97.362c7.7-7.68 20.142-7.68 27.822 0v0c7.7 7.68 7.7 20.183 0.021 27.863l-68.322 68.311c-7.68 7.68-20.163 7.68-27.843-0.020v0c-7.68-7.68-7.68-20.162 0-27.822l68.322-68.332z\" fill=\"#cacaca\" /> \
    </svg>");
          animation: linear-rotate 1.5s infinite;
        }
      }
    }
  }
}
</style>