export default {
  'zh-hans': {
    admin: {
      menu: {
        dashboard: '概况',
        appManage: '应用管理',
        userManage: '账号管理',
        orderManage: '订单管理',
        forumManage: '论坛管理',
        adminUsers: '管理员账户管理',
        appGoods: '商品管理',
        appEdit: '修改配置',
        appOrders: '订单管理',
        appStats: '统计信息',
        settings: '系统设置',
      },

      routes: {
        Home: '首页',
        Dashboard: '概况',
        AppManage: '应用管理',
        Users: '账号管理',
        Orders: '订单管理',
        Forums: '论坛管理',
        Settings: '系统设置',
        AppInfo: '应用基本信息',
        AppEdit: '修改应用配置',
        AppGoods: '应用商品管理',
        AppOrders: '应用订单管理',
        AppStats: '应用统计数据',
      },

      app: {
        basicInfo: '基本信息',
        sdkInfo: 'SDK配置',
        goodsInfo: '商品配置',

        goods: {
          id: '商品ID',
          name: '商品名称',
          description: '商品简介',
          price: '商品价格',
          productIds: '产品ID',
          add: '添加新商品',
        }
      },

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
        csPhoneNumber: '客服电话',
      },

      currency: {
        CNY: '人民币',
        HKD: '港币',
        USD: '美元',
        undefined: '货币未设置',
      },

      admin: '管理后台',
      firevalePlatform: '火谷平台',
      showDetail: '查看详情',
      edit: '编辑',
      editConfig: '修改配置',
      submit: '提交修改',
      cancel: '取消',

      titles: {
        selectSdk: '请选择要添加的SDK:',
        editSdkInfo: '编辑{sdk}接入参数',
        updateSuccess: '保存成功',
        updateFailed: '保存失败',
      },

      messages: {
        sdkInfoUpdated: '{sdk}接入参数的修改已成功保存',
        unknownError: '未知错误，请联系管理员',
        appInfoUpdated: '{appName}配置已成功更新'
      },

      sdks: {
        anzhi: '安智',
        baidu: '百度',
        cc: '虫虫',
        coolpad: '酷派',
        downjoy: '当乐',
        gfan: '机锋市场',
        huawei: '华为',
        iyouxi: '爱游戏',
        lenovo: '联想',
        mumayi: '木蚂蚁',
        oppo: 'OPPO',
        qh360: '360',
        qxz: '七匣子',
        htc: 'HTC聚乐',
        sogou: '搜狗',
        uc: 'UC', 
        vivo: 'VIVO',
        yyh: '应用汇',
        youku: '优酷',
        xiaomi: '小米',
        wdj: '豌豆荚',
        ggplay: 'Google Play',
        facebook: 'Facebook',
        haima: '海马助手',
        i4: '爱思助手',
        iiapple: 'I苹果',
        itools: 'Itools助手',
        ky: '快用助手',
        meizu: '魅族',
        ndcom: '91助手',
        pp: 'PP助手',
        qq: '腾讯QQ',
        tbt: '同步推',
        xy: 'XY助手',

        assigned: '分配的',
        add: '添加',

        keys: {
          app_id: 'App Id',
          app_uid: '应用ID（APP UID)',
          app_key: 'App Key',
          app_secret: 'App Secret',
          pay_key: 'Pay Key',
          pay_pub_key: '支付公钥',
          pay_priv_key: '支付私钥',
          pay_id: '支付id[PAY ID]',
          pub_key: '公钥',
          priv_key: '私钥',
          game_code: '游戏ID[Game Code]',
          rsa_key: 'RSA 秘钥',
          client_id: '客户端ID[Client ID]',
          client_secret: '客户端秘钥[Client Secret]',
          cp_id: 'CP ID',
          cp_key: 'CP KEY',
        }
      }
    },
  }
}