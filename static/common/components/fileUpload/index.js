import Vue from 'vue'

const FileUploadDialog = Vue.extend(require('./dialog'));

export const showFileUploadDialog = (i18n, propsData = {
  visible: true
}) => {
  let instance = new FileUploadDialog({
    i18n,
    el: document.createElement('div'),
    propsData
  });

  return instance;
}