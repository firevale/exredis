import Vue from 'vue';
const message = Vue.extend(require('./message.vue'));

export default {
  showMsg: function ({
    message,
    parent
  }) {
    let instance = new message({
      el: parent,
      propsData: {
        message: message,
      }
    });
  },
};