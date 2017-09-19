import Vue from 'vue'

const Dialog = Vue.extend(require('./dialog.vue'));

export default {
  show: function(propsData) {
    let instance = new Dialog({ 
      el: document.createElement('div'), 
      propsData 
    })
  }
};