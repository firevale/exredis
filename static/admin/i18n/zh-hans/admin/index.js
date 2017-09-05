import sdks from './sdks'
import app from './app'
import news from './news'
import menu from './menu'
import forum from './forum'
import mall from './mall'
import user from './user'
import routes from './routes'
import setting from './setting'
import operateLog from './operateLog'
import stats from './stats'
import customerService from './customerService'
import notification from './notification'
import wcp from './wcp'
import point from './point'
import error from 'common/i18n/zh-hans/error'

export default {
  admin: '管理后台',
  firevalePlatform: '火谷平台',
  showDetail: '查看详情',
  enterManage: '进入管理',
  edit: '编辑',
  editConfig: '修改配置',
  submit: '提交修改',
  cancel: '取消',
  next: '下一页',
  previous: '上一页',
  operateSuccess: '操作成功',
  switchOn: '开启',
  switchOff: '关闭',
  copy: '拷贝',

  label: {
    appId: '应用ID(APP ID)',
    appKey: '应用秘钥(APP KEY)',
    appName: '应用名称',
    appManager: '应用管理员',
    appCustomerService: '应用客服',
    appHasForum: '是否启用论坛',
    appHasMall: '是否启用商城',
    appRestrictLogin: '激活码登录',
    appCanAssignCode: '激活码领取',
    wcpDownloadEnabled: '公众号下载',
    currency: '商品定价货币',
    chaoxinGroupId: '超信运营群号',
    paymentCallbackUrl: '充值回调地址',
    obtainCodeUrl: '激活码领取地址',
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
    addAppManager: '添加应用管理员',
    addAppCustomerService: '添加应用客服',
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
    searchMallOrders: '输入用户ID/订单号/用户姓名/手机号搜索',
    searchGoods: '搜索商品名称',
    searchUsers:'输入用户ID/昵称、APP用户ID/角色名',
    searchAdminUsers:'输入火谷邮件账号(如: xxx@firevale.com)搜索',
    oops: '哦噢。。。',
    noOrderToDisplay: '当前没有任何可以显示的订单',
    noGoodsToDisplay: '当前没有任何商品',
    noUserToDisplay: '当前没有任何可以显示的用户',
    loading: '正在加载数据...',
    editActivityInfo: '编辑活动信息',
    editNoticeInfo: '编辑公告信息',
    editNewsInfo: '编辑新闻信息',
    uploadNewsPic: '修改题图(640X260, JPG或PNG)',
    uploadGoodsPic: '修改商品题图(400X400大小的png图)',
    yes: '是',
    no: '否',
    noData: '暂无数据',
    noMoreData: '没有更多数据啦',
    uploadWcpFile: '上传验证文件',
  },

  messages: {
    confirmDeleteGoods: '您确定要删除商品『{goodsName}』么?',
    confirmDeleteSection: '您确定要禁用该论坛版块么?',
    confirmDeleteSetting: '您确定要删除该配置项么?',
    confirmDeleteNews: '您确定要删除该内容么?',
    confirmPublishNews: '您确定要发布该内容么?',
    confirmUnPublishNews: '您确定要取消发布该内容么?',
    confirmDeleteMallGoods: '您确定要删除该商品么?',
    confirmPublishGoods: '您确定要发布该商品么?',
    confirmUnPublishGoods: '您确定要下架该商品么?',
    confirmDeleteAppManager: '您确定要删除应用管理员『{nickName}』么?',
    confirmDeleteCustomerService: '您确定要删除应用客服『{nickName}』么?',
    copyClipboardSuccess: '已拷贝到剪贴板',
    confirmDeleteRule: '您确定要删除自定义回复么?',
    confirmDeleteMessage: '您确定要删除消息记录么?',
  },

  serverSuccess: {
    updated: '更新成功',
    appUpdated: '应用更新成功',
    forumUpdated: '论坛更新成功',
    mallUpdated: '商城更新成功',
  },

  app,
  routes,
  menu,
  forum,
  mall,
  user,
  news,
  sdks,
  setting,
  operateLog,
  stats,
  wcp,
  point,
  customerService,
  notification,
  error
}