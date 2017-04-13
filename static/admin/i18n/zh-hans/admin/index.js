import sdks from './sdks'
import app from './app'
import news from './news'
import menu from './menu'
import forum from './forum'
import mall from './mall'
import routes from './routes'
import setting from './setting'
import customerService from './customerService'
import notification from './notification'

export default {
  admin: '管理后台',
  firevalePlatform: '火谷平台',
  showDetail: '查看详情',
  edit: '编辑',
  editConfig: '修改配置',
  submit: '提交修改',
  cancel: '取消',
  next: '下一页',
  previous: '上一页',
  operateSuccess: '操作成功',

  label: {
    appId: '应用ID(APP ID)',
    appKey: '应用秘钥(APP KEY)',
    appName: '应用名称',
    currency: '商品定价货币',
    chaoxinGroupId: '超信运营群号',
    paymentCallbackUrl: '充值回调地址',
    publicWeixinName: '微信公众号名称',
    publicWeixinUrl: '微信公众号链接',
    weiboName: '微博名称',
    weiboUrl: '微博链接',
    baiduTiebaName: '百度贴吧名称',
    baiduTiebaUrl: '百度贴吧链接',
    forumName: '论坛名称',
    forumUrl: '论坛链接',
    websiteName: '主页名称',
    websiteUrl: '主页链接',
    appHasForum: '是否启用论坛',
    csPhoneNumber: '客服电话',
    cpOrderId: 'CP订单号',
    transactionId: '交易ID',
    userId: '用户ID',
    createdAt: '创建时间',
    paidAt: '支付时间',
    deliveredAt: '发货时间',
    forumId: '论坛ID',
    forumAppId: '应用ID(APP ID)',
    forumTitle: '论坛名称',
    forumActive: '是否启用',
    forumCreatedAt: '创建时间',
    keyword: '敏感词',
  },

  currency: {
    CNY: '人民币',
    HKD: '港币',
    USD: '美元',
    undefined: '货币未设置',
  },

  status: {
    TRUE: '启用',
    FALSE: '禁用',
  },

  titles: {
    upload: '拖拽文件以上传',
    selectSdk: '请选择要添加的SDK:',
    editSdkInfo: '编辑{sdk}接入参数',
    editGoodsInfo: '编辑应用『{appName}』商品信息',
    editSectionInfo: '编辑论坛版块信息',
    editSettingInfo: '编辑配置信息',
    deleteSuccess: '删除成功',
    uploadGoodsIcon: '拖动正方形PNG图片到此(边长 >= 128)',
    uploadAppIcon: '拖动正方形PNG图片到此(边长 >= 128)',
    uploadForumIcon: '修改论坛『{forumName}』的图标',
    uploadMallIcon: '修改商城『{mallName}』的图标',
    editGoodsProductId: '编辑商品『{goodsName}』在『{sdk}』渠道的产品ID',
    ok: '确认',
    cancel: '取消',
    warning: '警告',
    searchOrders: '输入用户ID/订单号搜索',
    searchGoods: '搜索商品名称',
    oops: '哦噢。。。',
    noOrderToDisplay: '当前没有任何可以显示的订单',
    noGoodsToDisplay: '当前没有任何商品',
    loading: '正在加载数据...',
    editActivityInfo: '编辑活动信息',
    editNoticeInfo: '编辑公告信息',
    editNewsInfo: '编辑新闻信息',
    uploadNewsPic: '修改题图',
    uploadGoodsPic: '修改商品题图',
    yes: '是',
    no: '否',
    noData: '暂无数据',
    noMoreData: '没有更多数据啦'
  },

  messages: {
    confirmDeleteGoods: '您确定要删除商品『{goodsName}』么?',
    confirmDeleteSection: '您确定要禁用该论坛版块么?',
    confirmDeleteSetting: '您确定要删除该配置项么?',
    confirmDeleteNews: '您确定要删除该内容么?',
    confirmPublishNews: '您确定要发布该内容么?',
    confirmUnPublishNews: '您确定要取消发布该内容么?',
  },

  serverSuccess: {
    updated: '更新成功',
    appUpdated: '应用更新成功',
    forumUpdated: '论坛更新成功',
    mallUpdated: '商城更新成功',
  },

  serverError: {
    imageSize128x128: '图片的尺寸必须为128x128',
    imageSize400x400: '图片的尺寸必须为400x400',
    imageSize860x350: '图片的尺寸必须为860x350',
    imageFormatPNG: '图片格式必须为PNG文件',
    badRequestParams: '请求参数错误',
    networkError: '网络错误',
    illegal: '没有权限',
    goodsNotFound: '未找到商品',
    appNameExists: '应用名称【{app_name}】已被其他应用使用',
    emptyGoodsId: '商品ID不能为空',
    emptyGoodsName: '商品名称不能为空',
    emptyGoodsDescription: '商品简介不能为空',
    invalidGoodsPrice: '商品价格不能为负数',
    emptySectionTitle: '版块标题不能为空',
    emptyForumId: '版块所属论坛编号不能为空',
    forumNotFound: '未找到论坛',
    mallNotFound: '未找到商城',
    newsNotFound: '未找到该内容',
    goodsNotFound: '未找到该商品',
    newsContentRequired: '内容不能为空',
    newsTitleMinLength: '标题至少4个字',
    newsTitleMaxLength: '标题不能超过30个字',
  },

  app,
  routes,
  menu,
  forum,
  mall,
  news,
  sdks,
  setting,
  customerService,
  notification
}