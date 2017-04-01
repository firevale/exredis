import Vue from 'admin/vue-i18n'

const FileUploadDialog = Vue.extend(require('./dialog'));

export const showFileUploadDialog = (propsData = {
  visible: true
}) => {
  let instance = new FileUploadDialog({
    el: document.createElement('div'),
    propsData
  });
}