import Vue from 'vue'
import * as utils from 'common/js/utils'
import * as types from './mutationTypes'

export const setWcpUser = ({
  commit
}, wcp_user) => {
  commit(types.SET_WCP_USER, wcp_user)
}

export const setUserPoints = ({
  commit
}, points) => {
  commit(types.SET_USER_POINT, points)
}

export const addUserPoints = ({
  commit
}, points) => {
  commit(types.ADD_USER_POINT, points)
}

