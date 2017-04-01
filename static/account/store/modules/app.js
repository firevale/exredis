import * as acs from 'common/js/acs'

const state = {
  appId: acs.getAppId(),
  deviceId: acs.getDeviceId(),
  transitionName: 'slide-left',
  user: JSON.parse(JSON.stringify(window.acsConfig.user))
}

const mutations = {
  'SET_TRANSITION_NAME' (state, transitionName) {
    state.transitionName = transitionName
  },
}

export default {
  state,
  mutations
}
