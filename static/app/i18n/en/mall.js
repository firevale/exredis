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
    stockOut: '该商品已售罄',
    totalPrice: '合计：{price}（含邮费 {postage}）',
    addSuccess: '订单添加成功',
    snapshotsPlaceholder: '当前页面内容为订单快照，包含订单创建时的商品描述和下单信息，在发生交易争议时，该页面作为判定依据。',
    messages: {
      illegal: '非法操作',
      repeatRecieved: '请勿重复确认收货',
      recievedSuccess: '确认收货成功'
    },
    buttons: {
      wechatPay: '微信支付 ',
      aliPay: '支付宝',
      reciept: '确认收货',
      reOrder: '再来一单',
    },
    fields: {
      id: '订单号',
      postage: '邮费',
      with_postage: '含邮费',
      total: '合计',
      status: '订单状态',
      inserted_at: '下单时间',
      email: '用户帐号',
      paid_type: {
        label: '支付渠道',
        wechat: '微信'
      },
      transaction_id: '支付单号',
      address: {
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
    myOrder: {
      tabs: {
        all: '全部',
        waitPay: '待付款',
        waitConfirm: '待收货'
      }
    }
  },
  titles: {
    goodsDetail: '商品详情',
    mallOrder: '订单详情',
    mine: '我的',
    myOrders: '我的订单',
    myOrderDetail: '订单详情',
    myAddresses: '我的地址',
    editAddress: '编辑地址',
    newAddress: '添加地址',
    selectAddress: '选择地址',
    goodsSnapshots: '交易快照'
  },
  address: {
    add: '添加地址',
    deleteSuccess: '地址删除成功',
    setDefault: '设为默认',
    setDefaultSuccess: '设置默认地址成功',
    addSuccess: '地址添加成功',
    updateSuccess: '地址更新成功',
    namePlaceholder: '请输入您的大名',
    mobilePlaceholder: '请输入您的手机号码',
    areaPlaceholder: '请选择您所在的地区',
    addressPlaceholder: '请输入您的地址',
    fields: {
      name: '姓名',
      mobile: '手机',
      address: '地址',
      area: '地区',
      is_default: '默认地址'
    }
  }
}