import Vue from 'vue';
const message = Vue.extend(require('./message.vue'));
let instance
export default {
  showMsg: function (msg) {
    if (!instance) {
      instance = new message({
        el: document.createElement('div'),
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