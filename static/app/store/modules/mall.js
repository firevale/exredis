import * as types from '../mutationTypes'

const state = {
  shoppingCart: {
    goodsId: "",
    quantity: 0
  },

  selectedAddress: {
    id: 0,
    name: "",
    mobile: "",
    area: "",
    address: "",
    area_code: ""
  },
}

const mutations = {
  [types.UPDATE_MALL_SHOPPINGCART](state, goodsItem) {
    if (goodsItem) {
      state.shoppingCart.goodsId = goodsItem.goodsId
      state.shoppingCart.quantity = goodsItem.quantity
    }
  },

  [types.UPDATE_SELECTED_ADDRESS](state, addressItem) {
    if (addressItem) {
      state.selectedAddress = addressItem
    }
  },
}

export default {
  state,
  mutations,
}