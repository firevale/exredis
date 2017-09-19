import Vue from 'vue'

const ImageUploadDialog = Vue.extend(require('./dialog'));

export const showImageUploadDialog = (i18n, propsData = {
  visible: true
}) => {
  let instance = new ImageUploadDialog({
    i18n,
    el: document.createElement('div'),
    propsData
  });

  return instance;
}