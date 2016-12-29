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
}, effectItem) => {
  Vue.http.get('/admin_actions/fetch_apps', {})
    .then(res => res.json())
    .then(json => {
      if (json.success) {
        console.log("update apps....")
        commit(types.UPDATE_APPS, json.apps)
      }
    })
}