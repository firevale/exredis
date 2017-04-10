import Vue from 'vue'

const Menu = Vue.extend(require('./menu.vue'));

export default {
  show: function(propsData = {
    visible: true
  }) {
    let instance = new Menu({
      el: document.createElement('div'),
      propsData
    })
  }
};