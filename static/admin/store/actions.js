import * as types from './mutation-types'
import Vue from 'vue'

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
  Vue.http.get('/admin_actions/fetch_apps', {})
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        commit(types.UPDATE_APPS, json.apps)
      }
    })
}

export const fetchSupportedSdks = ({
  commit
}) => {
  Vue.http.get('/admin_actions/fetch_supported_sdks', {})
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        commit(types.UPDATE_SDKS, json.sdks)
      }
    })
}