import Vue from 'vue';

const FileUploadDialog = Vue.extend(require('./FileUploadDialog.vue'));

export default {
  showModal: function({title, action, headers, accept, extensions, callback}) {
    let instance = new FileUploadDialog({
        el: document.createElement('div'),
      });

    instance.upload.title = title
    instance.upload.postAction = action
    instance.upload.request.headers = headers
    instance.upload.accept = accept
    instance.upload.extensions = extensions
    instance.callback = callback

    Vue.nextTick(_ => instance.visible = true)
  },
};