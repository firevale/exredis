export default {
  goods: {
    description: '商品详情',
    price: '单价',
    postage: '邮费',
    stock: '库存',
    buyNow: '立即购买',
    soldOut: '已售罄'
  },
  order: {
    addressPlaceholder: '请填写收货地址',
    totalPrice: '合计：{price}（含邮费 {postage}）',
    wechatPay: '微信支付',
    aliPay: '支付宝',
    addSuccess: '订单添加成功',
    fields: {
      id: '订单号',
      postage: '邮费',
      total: '合计',
      status: '订单状态',
      inserted_at: '下单时间',
      email: '用户帐号',
      paid_type: {
        label: '支付渠道',
        wechat: '微信'
      },
      transaction_id: '支付单号',
      user_address: {
        name: '姓名',
        mobile: '电话',
        address: '地址',
      },
    },
    status: {
      '-3': '已退款',
      '-2': '已退货',
      '-1': '已关闭',
      '0': '待支付',
      '1': '已支付',
      '2': '待收货',
      '3': '待确认',
      '4': '已完成'

    }
  },
  mine: {
    myOrder:{
      tabs:{
        all: '全部',
        unPay:'待付款',
        unReceived:'未收货'
      }
    }
  },
  titles: {
    goodsDetail: '商品详情',
    mallOrder: '订单详情',
    mine: '我的',
    myOrders: '我的订单',
    myAddresses: '我的地址',
  }
}