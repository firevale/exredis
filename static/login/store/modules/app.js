import nativeApi from '../../common/nativeApi'


const state = {
  appId: nativeApi.getAppId(),
  deviceId: nativeApi.getDeviceId(),
}

const mutations = {

}

export default {
  state, mutations
}