import * as types from './mutation-types'
import axios from 'axios'

import {
  processAjaxError
} from 'admin/miscellaneous'

export const toggleSidebar = ({
  commit
}, opened) => commit(types.TOGGLE_SIDEBAR, opened)

export const toggleDevice = ({
  commit
}, device) => commit(types.TOGGLE_DEVICE, device)

export const expandMenu = ({
  commit
}, menuItem) => {
  if (menuItem) {
    menuItem.expanded = menuItem.expanded || false
    commit(types.EXPAND_MENU, menuItem)
  }
}

export const switchEffect = ({
  commit
}, effectItem) => {
  if (effectItem) {
    commit(types.SWITCH_EFFECT, effectItem)
  }
}

export const updateSdks = ({
  commit
}, sdks) => {
  commit(types.UPDATE_SDKS, sdks)
}

export const updateAdminLevel = ({
  commit
}, level) => {
  commit(types.UPDATE_ADMIN_LEVEL, level)
}

export const setApp = ({
  commit
}, app) => {
  commit(types.SET_APP, app)
}

export const addForum = ({
  commit
}, forum) => {
  commit(types.ADD_FORUM, forum)
}

export const listMalls = ({
  commit
}, app_id) => {
  axios.get('/mall_actions/list_malls', { params: { app_id: app_id } })
    .then(res => res.data)
    .then(result => {
      if (result.success) {
        commit(types.UPDATE_MALLS, result.malls)
      } else {
        return Promise.reject(result)
      }
    }).catch(e => processAjaxError(e))
}

export const updateMyLoginCodes = ({
  commit
}, codes) => {
  commit(types.SET_MY_LOGIN_CODES, codes)
}

export const updateAppWcpConfig = ({
  commit
}, params) => {
  commit(types.UPDATE_WCP_PARAMS, params)
}

export const joinAppChannel = ({
  commit
}, params) => {
  commit(types.JOIN_APP_CHANNEL, params)
}

export const setRealtimeMetrics = ({
  commit
}, realtimeMetrics) => {
  commit(types.SET_APP_BRIEF_STATS, realtimeMetrics)
}

