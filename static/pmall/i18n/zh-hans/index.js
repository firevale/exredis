import upload from 'common/i18n/zh-hans/upload'
import common from 'common/i18n/zh-hans/common'
import error from 'common/i18n/zh-hans/error'

export default {
  upload,
  common,
  error,
  pmall: {
    sign: {
      success: '签到成功,+{point}积分',
      signed: '你已经签到过了，明日再来'
    },
    address: {
      addSuccess: '地址添加成功'
    },
    exchange: {
      success: '兑换成功,{point}积分',
      failed: '兑换失败',
      pointless: '积分不足',
      unactive: '该商品己下架',
      limit: '你己兑换过了',
      expired: '你来晚了，兑换时间己截止',
      soldout: '你来晚了，该商品己被抢光了',
      missing_address: '你忘填写收货地址啦～',
    },
    draw: {
      pointless: '抱歉，您的积分不足',
      soldout: '你来晚了，该物品己被抢光了',
      nonsetting: '没有配置',
    },
    question: {
      nonexists: '问答题不存在',
      success: '回答正确',
      failed: '回答错误',
      answer: {
        exists: "今日已答完"
      }
    },
    bindMobile: {
      notFound: '用户不存在',
      success: '绑定成功'
    }
  }
}