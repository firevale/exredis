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

export const fetchPlatformApps = ({
  commit
}) => {
  axios.get('/admin_actions/fetch_apps', {})
    .then(res => res.data)
    .then(result => {
      if (result.success) {
        commit(types.UPDATE_APPS, result.apps)
      } else {
        return Promise.reject(result)
      }
    }).catch(e => processAjaxError(e))
}

export const updateSdks = ({
  commit
}, sdks) => {
  commit(types.UPDATE_SDKS, sdks) 
}


export const addApp = ({
  commit
}, app) => {
  commit(types.ADD_APP, app)
}

export const addForum = ({
  commit
}, forum) => {
  commit(types.ADD_FORUM, forum)
}

export const fetchForums = ({
  commit
}) => {
  axios.get('/forum_actions/fetch_forums', {})
    .then(res => res.data)
    .then(result => {
      if (result.success) {
        commit(types.UPDATE_FORUMS, result.forums)
      } else {
        return Promise.reject(result)
      }
    }).catch(e => processAjaxError(e))
}

export const fetchMalls = ({
  commit
}) => {
  axios.get('/mall_actions/fetch_malls', {})
    .then(res => res.data)
    .then(result => {
      if (result.success) {
        commit(types.UPDATE_MALLS, result.malls)
      } else {
        return Promise.reject(result)
      }
    }).catch(e => processAjaxError(e))
}