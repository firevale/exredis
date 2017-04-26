export default {
  basicInfo: '基本信息',
  goodsInfo: '商品管理',
  orderInfo: '订单管理',

  id: '编号',
  title: '标题',
  appId: 'APP编号',
  pic: '题图',
  edit: '修改',
  delete: '删除',
  created_at: '创建时间',
  active: '是否启用',
  addSuccess: '添加成功',
  updateSuccess: '更新成功',
  notExist: '商品不存在',
  sameGoodsIdExist: '商品编号已存在，请重新输入',
  soldCanNotDelete: '该商品已销售不可删除',

  goods: {
    edit: '编辑',
    delete: '删除',
    publish: '发布',
    unPublish: '下架',
    save: '保存',
    id: '编号',
    name: '名称',
    add: '添加新商品',
    pic: '商品图片',
    description: '商品详情',
    price: '单价',
    postage: '邮费',
    stock: '库存',
    currency: '货币',
    pleaseFill: '请完整填写各项内容',
    pleaseUpPic: '请上传商品图片',
    picPlaceholder: '图片为正方形，支持jpg、png格式，大小不超过500k；',
    namePlaceholder: '不超过50个字节',
    descPlaceholder: '文字不超过8000个字节，图片支持jpg,png格式，大小不超过200k;',
    priceList: '单价：{price} / 邮费: {postage}',
    stockList: '库存：{stock} / 销量: {sold}',
    saveFirst: '请先保存商品',
    up: '已上架',
    down: '已下架',
    back: '返回',
  },
  order: {
    buttons: {
      viewDetail: '查看详情',
      payed: '己付款',
      refund: '取消并退款',
    },
    messages: {
      opSuccess: '操作成功',
      opFailed: '操作失败',
      refundMoneyOut:'退款金额不能大于用户支付价格',
      stockOut:'商品库存不足',
      confirmOrderPayed: '您确定订单:{orderId}状态修改为已付款',
      confirmRefundOrder: '您确定订单:{orderId}己线下处理好退款'
    },
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
      address: {
        name: '姓名',
        mobile: '电话',
        address: '地址',
      },
      refundMoney: '退款金额'
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
  op_logs: {
    label: '历史记录',
    inserted_at: '操作时间',
    op_user: '操作账号',
    op_admin: '管理员',
    content: '操作内容',
    transaction_id: '支付单号',
    refundMoney: '退款金额',
    change_to: '更改为',
  }
}