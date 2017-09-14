import Vue from 'vue'
import * as utils from 'common/js/utils'
import * as types from './mutationTypes'

export const setUserProfile = ({
  commit
}, user) => {
  commit(types.SET_USER_PROFILE, user)
}

export const updateUserMobile = ({
  commit
}, mobile) => {
  commit(types.UPDATE_USER_MOBILE, mobile)
}

export const updateUserEmail = ({
  commit
}, email) => {
  commit(types.UPDATE_USER_EMAIL, email)
}

export const updateUserNickname = ({
  commit
}, nickname) => {
  commit(types.UPDATE_USER_NICKNAME, nickname)
}

export const updateUserAvatar = ({
  commit
}, avatar_url) => {
  commit(types.UPDATE_USER_AVATAR, avatar_url)
}

export const updateUserResidentInfo = ({
  commit
}, residentInfo) => {
  commit(types.UPDATE_USER_RESIDENT_INFO, residentInfo)
}

export const updateUserPostCount = ({
  commit
}, postCount) => {
  commit(types.UPDATE_USER_POST_COUNT, postCount)
}

export const decrUserPostCount = ({
  commit
}) => {
  commit(types.DECR_USER_POST_COUNT)
}
