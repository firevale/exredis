import Vue from 'vue'

const RichTip = Vue.extend(require('./tip'));

export const showRichTip = (propsData = {
  visible: true
}) => {
  let instance = new RichTip({
    el: document.createElement('div'),
    propsData
  });
}