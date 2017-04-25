export default {
  goods: {
    description: '商品詳情',
    price: '單價',
    postage: '郵費',
    stock: '庫存',
    buyNow: '立即購買',
    soldOut: '已售罄'
  },
  order: {
    addressPlaceholder: '請填寫收貨地址',
    stockOut: '該商品已售罄',
    totalPrice: '合計：{price}（含郵費 {postage}）',
    wechatPay: '微信支付',
    aliPay: '支付寶',
    reciept: '確認收貨',
    addSuccess: '訂單添加成功',
    reOrder: '再來一單',
    fields: {
      id: '訂單號',
      postage: '郵費',
      with_postage: '含郵費',
      total: '合計',
      status: '訂單狀態',
      inserted_at: '下單時間',
      email: '用戶帳號',
      paid_type: {
        label: '支付渠道',
        wechat: '微信'
      },
      transaction_id: '支付單號',
      address: {
        name: '姓名',
        mobile: '電話',
        address: '地址',
      },
    },
    status: {
      '-3': '已退款',
      '-2': '已退貨',
      '-1': '已關閉',
      '0': '待支付',
      '1': '已支付',
      '2': '待收貨',
      '3': '待確認',
      '4': '已完成'
    }
  },
  mine: {
    myOrder: {
      tabs: {
        all: '全部',
        unPay: '待付款',
        unReceived: '未收貨'
      }
    }
  },
  titles: {
    goodsDetail: '商品詳情',
    mallOrder: '訂單詳情',
    mine: '我的',
    myOrders: '我的訂單',
    myOrders: '我的訂單',
    myOrderDetail: '訂單詳情',
    myAddresses: '我的地址',
    editAddress: '編輯地址',
    newAddress: '添加地址',
    selectAddress: '選擇地址',
  },
  address: {
    add: '添加地址',
    deleteSuccess: '地址刪除成功',
    setDefault: '設為默認',
    setDefaultSuccess: '設置默認地址成功',
    addSuccess: '地址添加成功',
    updateSuccess: '地址更新成功',
    fields: {
      name: '姓名',
      mobile: '手機',
      address: '地址',
      area: '地區',
      is_default: '默認地址'
    }
  }
}