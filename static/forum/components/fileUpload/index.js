import Vue from 'vue';

const FileUploadDialog = Vue.extend(require('./fileUploadDialog.vue'));

export default {
  showModal: function (params) {
    let instance = new FileUploadDialog({
      el: document.createElement('div'),
      propsData: {
        params: params,
      }
    });
    instance.callback = params.callback
    Vue.nextTick(_ => instance.visible = true)
  },
};