import Vue from 'vue';
const message = Vue.extend(require('./message.vue'));
let instance
export default {
  showMsg: function ({
    msg,
    target
  }) {
    if (!instance) {
      instance = new message({
        el: target,
        propsData: {
          message: msg,
        }
      });
    } else {
      instance.message = msg
    }
    instance.visible = true
    Vue.nextTick(() => {
      setTimeout(function () {
        instance.visible = false
      }, 2000)
    })
  },
};