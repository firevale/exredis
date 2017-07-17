import Vue from 'vue'

const TipBox = Vue.extend(require('./dialog'));

export const showTipBox = (propsData = {
  visible: true
}) => {
  let instance = new TipBox({
    el: document.createElement('div'),
    propsData
  });
}