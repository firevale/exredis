import Vue from 'vue'

const transitionName = state => state.app.transitionName
const wcp_user = state => state.user.wcp_user
const points = state => state.user.points
export {
  transitionName,
  wcp_user,
  points
}