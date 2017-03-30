import Vue from 'vue'
import MessageClass from './message.vue'
const message = Vue.extend(MessageClass)
let instance
export default {
  showMsg: function(msg) {
    if (!instance) {
      instance = new message({
        el: document.createElement('div'),
        propsData: {
          message: msg
        },
      });
    } else {
      instance.message = msg
    }
    instance.visible = true
    Vue.nextTick(() => {
      setTimeout(function() {
        instance.visible = false
      }, 2000)
    })
  }
};