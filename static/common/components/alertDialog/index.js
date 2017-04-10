import Vue from 'vue'

const Dialog = Vue.extend(require('./alertDialog.vue'));

export default {
  show: function(propsData = {
    visible: true
  }) {
    let instance = new Dialog({ 
      el: document.createElement('div'), 
      propsData 
    })
  }
};