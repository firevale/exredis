import * as types from '../mutationTypes'

const state = {
  shoppingCart: {
    goodsId: "",
    quantity: 0
  },
}

const mutations = {
  [types.UPDATE_MALL_SHOPPINGCART](state, goodsItem) {
    if (goodsItem) {
      state.shoppingCart.goodsId = goodsItem.goodsId
      state.shoppingCart.quantity = goodsItem.quantity
    }
  }
}

export default {
  state,
  mutations,
}