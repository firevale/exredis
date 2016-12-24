import Vue from 'vue'

const app = state => state.app
const deviceId = state => state.app.deviceId
const appId = state => state.app.appId
const transitionName = state => state.app.transitionName



const colors = state => {
  return {
    danger: "#fb0101",
    success: '#23d160',
    white: "#fff",
    dark: "#cbcbcb",
    black: "#242424",
  }
}

export {
  app,
  deviceId,
  appId,
  colors,
  transitionName,
}