import Vue from 'vue';
const detail = Vue.extend(require('./detailInfo.vue'));


export default {
  show: function(id) {
    new detail({
      el: document.createElement('div'),
      propsData: {
        visible: true,
        id: id
      }
    });
  }
};