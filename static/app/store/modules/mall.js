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
  selectedGoods: {
    id: 0,
    name: "",
    description: "",
    price: 0,
    currency: "",
    postage: 0,
    stock: 0
  },
  selectedOrder: {
    id: "",
    price: 0,
    postage: 0,
    final_price: 0,
    currency: "",
    status: 0,
    address: {},
    details: [],
    inserted_at: ""
  }
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
  [types.UPDATE_SELECTED_GOODS](state, goodsItem) {
    if (goodsItem) {
      state.selectedGoods = goodsItem
    }
  },
  [types.UPDATE_SELECTED_ORDER](state, orderItem) {
    if (orderItem) {
      state.selectedOrder = orderItem
    }
  },
}

export default {
  state,
  mutations,
}