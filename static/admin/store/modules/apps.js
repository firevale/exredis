import * as types from '../mutation-types'

import { Socket, Channel } from 'phoenix'

const state = {
  app: undefined,
  sdks: [],
  goods: {},
  myLoginCodes: [],
  channel: undefined,
  orders: [],
  latestOnlineData: undefined,
}

const socket = new Socket('/app_admin_sock')
socket.connect()

const mutations = {
  [types.UPDATE_SDKS](state, sdks) {
    state.sdks = sdks
  },

  [types.SET_APP](state, app) {
    state.app = app
  },

  [types.SET_MY_LOGIN_CODES](state, codes) {
    state.myLoginCodes = codes
  },

  [types.JOIN_APP_CHANNEL](state, params) {
    console.log('join app channel')
    if (state.channel) {
      state.channel.leave()
      state.channel = undefined
    }

    state.channel = socket.channel(`admin.app:${params.appId}`, {
      access_token: params.accessToken,
      app_id: params.appId
    })

    state.channel.join()
      .receive('ok', _ => {
        console.log('app admin channel joined')
        state.channel.on('new_online_data', payload => state.latestOnlineData = payload)
      })
      .receive('error', reasons => console.log('can NOT join app admin channel', reasons))
      .receive('timeout', _ => console.log('can NOT join app admin channel with networking issue...'))

  }
}

export default {
  state,
  mutations
}