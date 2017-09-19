import Vue from 'vue'
import VueProgress from '../vue-progress'
Vue.use(VueProgress)

const Progress = Vue.extend(require('./progress.vue'));

export const showProgress = (propsData = {
  visible: true
}) => {
  let instance = new Progress({
    el: document.createElement('div'),
    propsData
  })

  return instance
}