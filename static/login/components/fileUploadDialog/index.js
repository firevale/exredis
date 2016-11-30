import Vue from 'vue';

const FileUploadDialog = Vue.extend(require('./FileUploadDialog.vue'));

export default {
  showModal: function({title, action, headers, accept, extensions, callback}) {
    let instance = new FileUploadDialog({
        el: document.createElement('div'),
      });

    instance.title = title
    instance.postAction = action
    instance.headers = headers
    instance.accept = accept
    instance.extensions = extensions
    instance.callback = callback

    Vue.nextTick(function(){
      instance.visible = true
    })
  },
};