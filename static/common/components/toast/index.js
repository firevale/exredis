import Vue from 'vue';
const toast = Vue.extend(require('./toast.vue'));

let instance

export default {
  show: function(msg) {
    if (!instance) {
      instance = new toast({
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