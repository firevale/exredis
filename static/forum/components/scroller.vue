<template>
  <div class="scroller-container">
    <div ref="scroller" class="scroller">       
      <div ref="scroller_content" class="scroller-content">
        <div v-if="onRefresh" class="pull-to-refresh-layer">
          <span v-show="refreshState == 0"> pull to refresh </span>      
          <span v-show="refreshState == 1"> release to refresh </span>      
        </div>
        <slot></slot>
        <div ref="loading_layer" class="loading-layer">
          <span v-show="allLoaded"> No more data. </span>      
          <span v-show="loading" class="icon image-icon icon-spinner rotating"></span> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IScroll from 'iscroll/build/iscroll-infinite.js'
import ResizeSensor from 'common/resizeSensor'

const PULL_TO_REFRESH = 0
const RELEASE_TO_REFRESH = 1
const REFRESHING = 2

const REM_SIZE = parseFloat(getComputedStyle(document.querySelector("html")).fontSize)

export default {
  props: {
    onRefresh: Function,
    onLoadMore: Function,
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
    }
  },

  beforeDestroy: function() {
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
      this.iscroll = new IScroll(this.$refs.scroller, this.options)
      this.iscroll.on('scrollStart', this.scrollStart)
      this.iscroll.on('scrollEnd', this.scrollEnd)
      this.resetScrollTop()
      this.$nextTick(_ => this.checkLoadMore())
      this.sensor = new ResizeSensor(this.$refs.scroller_content, _ => {
        this.iscroll.refresh()
      })
    })
  },

  methods: {
    resetScrollTop: function() {
      this.$refs.scroller.scrollTop = 0

      if (this.onRefresh) {
        this.iscroll.minScrollY = -3 * REM_SIZE
      } else {
        this.iscroll.minScrollY = 0
      }
    },

    scrollStart: function() {
      this.checkInterval = setInterval(_ => this.checkScroll(), 100)
    },

    scrollEnd: async function() {
      clearInterval(this.checkInterval)
      if (this.onRefresh && this.refreshState == RELEASE_TO_REFRESH) {
        this.refreshState = REFRESHING
        this.allLoaded = false
        await this.onRefresh()
        this.refreshState = PULL_TO_REFRESH
        this.checkLoadMore()
      } else {
        this.checkLoadMore()
      }
    },

    checkScroll: function() {
      if (this.onRefresh && !this.loading) {
        if (this.iscroll.y >= REM_SIZE * 4) {
          this.refreshState = RELEASE_TO_REFRESH
        } else if (this.iscroll.y >= 5) {
          this.refreshState = PULL_TO_REFRESH
        }
      }
    },

    checkLoadMore: async function() {
      if (this.onLoadMore && !this.allLoaded &&
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
      min-height: 100vh;

      .pull-to-refresh-layer,
      .loading-layer {
        width: 100%;
        height: 3rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        span.icon {
          width: 2.5rem;
          height: 2.5rem;
        }
      }

      .pull-to-refresh-layer {
        margin-top: -3rem;
      }
    }
  }
}
</style>