import Vue from 'vue'

const app = state => state.app
const deviceId = state => state.app.deviceId
const appId = state => state.app.appId
const transitionName = state => state.app.transitionName

export {
  app,
  deviceId,
  appId,
  transitionName,
}