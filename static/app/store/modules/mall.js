import * as types from '../mutationTypes'

const state = {
  shoppingCart: {
    goodsId: "",
    quantity: 0
  },
}

const mutations = {
  [types.UPDATE_SHOPPING_CART](state, goodsId, quantity) {
    alert(goodsId);
    if (goodsId && quantity) {
      state.shoppingCart.goodsId =  goodsId
      state.shoppingCart.quantity = quantity
    }
  }
}

export default {
  state,
  mutations,
}