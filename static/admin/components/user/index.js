import Vue from 'vue';
const detail = Vue.extend(require('./detailInfo.vue'));


export default {
  show: function(user, appUsers) {
    new detail({
      el: document.createElement('div'),
      propsData: {
        visible: true,
        user: user,
        appUsers: appUsers
      }
    });
  }
};