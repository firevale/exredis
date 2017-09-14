import Vue from 'vue'

const transitionName = state => state.app.transitionName
const userInfo = state => state.user

export {
  transitionName,
  userInfo,
}