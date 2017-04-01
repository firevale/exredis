import Vue from 'app/vue-installed'

const FileUploadDialog = Vue.extend(require('./dialog'));

export const showFileUploadDialog = (propsData = {
  visible: true
}) => {
  let instance = new FileUploadDialog({
    el: document.createElement('div'),
    propsData
  });
}