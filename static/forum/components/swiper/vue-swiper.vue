<template>
  <div class="swiper" :class="[direction, {'dragging': dragging}]" @touchstart="_onTouchStart" @mousedown="_onTouchStart" @wheel="_onWheel">
    <div class="swiper-wrap" ref="swiperWrap" :style="{'transform' : 'translate3d(' + translateX + 'px,' + translateY + 'px, 0)'}"
      @transitionend="_onTransitionEnd">
      <slot></slot>
  </div>
  <div class="swiper-pagination" v-show="paginationVisible">
    <span class="swiper-pagination-bullet" v-for="(slide,index) in slideEls" :class="{'active': index+1===currentPage}" @click="paginationClickable && setPage(index+1)"></span>
  </div>
  </div>
</template>
<style lang="scss" src="./vue-swiper.less"></style>
<script>
  const VERTICAL = 'vertical';
  const HORIZONTAL = 'horizontal';

  export default {
    props: {
      direction: {
        type: String,
        default: VERTICAL,
        validator: (value) => [VERTICAL, HORIZONTAL].indexOf(value) > -1
      },
      mousewheelControl: {
        type: Boolean,
        default: true
      },
      performanceMode: {
        type: Boolean,
        default: false
      },
      paginationVisible: {
        type: Boolean,
        default: false
      },
      paginationClickable: {
        type: Boolean,
        default: false
      },

      focusIndex: {
        type: Number,
        default: -1,
      }
    },
    watch: {
      'focusIndex' (newVal, oldVal) {
        if (newVal != oldVal) {
          this.setPage(newVal + 1)
        }
      }
    },
    data() {
      return {
        currentPage: 1,
        lastPage: 1,
        translateX: 0,
        translateY: 0,
        startTranslateX: 0,
        startTranslateY: 0,
        delta: 0,
        dragging: false,
        startPos: null,
        transitioning: false,
        slideEls: [],
        scrolling: '',
      };
    },
    mounted() {
      this._onTouchMove = this._onTouchMove.bind(this);
      this._onTouchEnd = this._onTouchEnd.bind(this);
      this.slideEls = this.$refs.swiperWrap.children;
    },
    methods: {
      next() {
        var page = this.currentPage;
        if (page < this.slideEls.length) {
          page++;
          this.setPage(page);
        } else {
          this._revert();
        }
      },
      prev() {
        var page = this.currentPage;
        if (page > 1) {
          page--;
          this.setPage(page);
        } else {
          this._revert();
        }
      },
      setPage(page) {
        var propName, translateName;
        this.lastPage = this.currentPage;
        this.currentPage = page;

        if (this.isHorizontal()) {
          propName = 'clientWidth';
          translateName = 'translateX';
        } else {
          propName = 'clientHeight';
          translateName = 'translateY';
        }
        this[translateName] = -[].reduce.call(this.slideEls, function (total, el, i) {
          return i > page - 2 ? total : total + el[propName];
        }, 0);
        this._onTransitionStart();
        this.$emit('currentPage', page - 1)
      },
      isHorizontal() {
        return this.direction === HORIZONTAL;
      },
      isVertical() {
        return this.direction === VERTICAL;
      },
      _onTouchStart(e) {
        if (this.dragging) return;
        this.dragging = true;
        this.startX = e.changedTouches ? e.changedTouches[0]['pageX'] : e.pageX;
        this.startY = e.changedTouches ? e.changedTouches[0]['pageY'] : e.pageY;

        this.startPos = this._getTouchPos(e);
        this.delta = 0;
        this.startTranslateX = this.translateX;
        this.startTranslateY = this.translateY;
        this.startTime = new Date().getTime();

        this.scrolling = '';

        this.$el.addEventListener('touchmove', this._onSelfTouchMove, false);
        document.addEventListener('touchmove', this._onTouchMove, false);
        document.addEventListener('touchend', this._onTouchEnd, false);
        this.$el.addEventListener('mousemove', this._onTouchMove, false);
        document.addEventListener('mouseup', this._onTouchEnd, false);
      },
      _onSelfTouchMove(e) {
        this.delta = this._getTouchPos(e) - this.startPos;

        var curX = e.changedTouches ? e.changedTouches[0]['pageX'] : e.pageX;
        var curY = e.changedTouches ? e.changedTouches[0]['pageY'] : e.pageY;

        if (!this.performanceMode) {
          if (this.isHorizontal()) {
            if (Math.abs(curY - this.startY) < Math.abs(curX - this.startX)) {
              if (!this.scrolling) {
                this.scrolling = 'H';

                var event = new CustomEvent('touchend', {
                  swiperMock: true
                })
                // var event = document.createEvent('Event');
                // event.initEvent('touchend', true, true);
                // event.constructor.name;
                // event.isTrusted = false;

                var point = {
                  x: this.startX,
                  y: this.startY
                };
                event.touches = [{
                  type: 'mask',
                  target: this.$el,
                  identifier: Date.now(),
                  pageX: this.startX,
                  pageY: this.startY,
                  screenX: this.startX,
                  screenY: this.startY,
                  clientX: this.startX,
                  clientY: this.startY,
                }];

                this.$el.dispatchEvent(event);
                //this.$dispatch('cancel-move');
              }
            } else if (this.scrolling == '') {
              this.scrolling = 'V';
            }
          } else {
            if (Math.abs(curX - this.startX) < Math.abs(curY - this.startY)) {
              if (!this.scrolling) {
                this.scrolling = 'V';
              }
            } else if (this.scrolling == '') {
              this.scrolling = 'H';
            }
          }
        }
      },
      _onTouchMove(e) {
        this.delta = this._getTouchPos(e) - this.startPos;

        var curX = e.changedTouches ? e.changedTouches[0]['pageX'] : e.pageX;
        var curY = e.changedTouches ? e.changedTouches[0]['pageY'] : e.pageY;

        if (!this.performanceMode) {
          if (this.isHorizontal()) {
            if (this.scrolling == 'H') {
              this.translateX = this.startTranslateX + this.delta;
              this.$emit('slider-move', this.translateX);
              e.preventDefault();
              //e.stopPropagation();
            }
          } else {
            if (Math.abs(curX - this.startX) < Math.abs(curY - this.startY)) {
              if (this.scrolling == 'V') {
                this.translateY = this.startTranslateY + this.delta;
                this.$emit('slider-move', this.translateY);
                e.preventDefault();
                //e.stopPropagation();
              }
            }
          }
        }
      },

      _onTouchEnd(e) {
        // if (e.isTrusted != undefined && !e.isTrusted) {
        if (e.swiperMock) {
          this.$el.removeEventListener('touchmove', this._onSelfTouchMove);
          return;
        }

        this.dragging = false;
        document.removeEventListener('touchmove', this._onTouchMove);
        this.$el.removeEventListener('touchmove', this._onSelfTouchMove);
        document.removeEventListener('touchend', this._onTouchEnd);
        this.$el.removeEventListener('mousemove', this._onTouchMove);
        document.removeEventListener('mouseup', this._onTouchEnd);
        if (this.scrolling != 'H' && this.isHorizontal() || this.isVertical() && this.scrolling != 'V') {
          return;
        }
        var isQuickAction = new Date().getTime() - this.startTime < 1000;
        if (this.delta < -100 || (isQuickAction && this.delta < -15)) {
          this.next();
        } else if (this.delta > 100 || (isQuickAction && this.delta > 15)) {
          this.prev();
        } else {
          this._revert();
        }
      },
      _onWheel(e) {
        if (this.mousewheelControl) {
          // TODO Support apple magic mouse and trackpad.
          if (!this.transitioning) {
            if (e.deltaY > 0) {
              this.next();
            } else {
              this.prev();
            }
          }

          if (this._isPageChanged()) e.preventDefault();

        }
      },
      _revert() {
        this.setPage(this.currentPage);
      },
      _getTouchPos(e) {
        var key = this.isHorizontal() ? 'pageX' : 'pageY';
        return e.changedTouches ? e.changedTouches[0][key] : e[key];
      },
      _onTransitionStart() {
        this.transitioning = true;
        if (this._isPageChanged()) {
          this.$emit('slide-change-start', this.currentPage);
        } else {
          this.$emit('slide-revert-start', this.currentPage);
        }
      },
      _onTransitionEnd() {
        this.transitioning = false;
        if (this._isPageChanged()) {
          this.$emit('slide-change-end', this.currentPage);
        } else {
          this.$emit('slide-revert-end', this.currentPage);
        }
      },
      _isPageChanged() {
        return this.lastPage !== this.currentPage;
      }
    }
  };
</script>