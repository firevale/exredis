export default {
  'zh-hans': {
    admin: {
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

      menu: {
        dashboard: '概况',
        appManage: '应用管理',
        userManage: '账号管理',
        orderManage: '订单管理',
        forumManage: '论坛管理',
        questionManage: '问题反馈',
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
        Questions: '问题反馈',
        Settings: '系统设置',
        AppInfo: '应用基本信息',
        NewApp: '添加新应用',
        EditApp: '修改应用配置',
        AppGoods: '应用商品管理',
        AppOrders: '应用订单管理',
        AppStats: '应用统计数据',
        EditForum: '修改论坛配置',
      },

      news: {
        activityInfo: '活动管理',
        noticeInfo: '公告管理',
        newsInfo: '新闻管理',

        id: '编号',
        title: '标题',
        content: '内容',
        pic: '题图',
        edit: '修改',
        delete: '删除',
        deleteOk: '删除成功',
        created_at: '创建时间',
        active: '是否启用',

        activity: {
          add: '添加新活动',
          addSuccess: '添加成功',
          
        },

        notice: {

        },

        news: {

        }
      },
      question: {
        questionInfo:'问题反馈'
      },

      forum: {
        enterForum: '论坛配置',
        basicInfo: '基本信息',
        sectionInfo: '版块配置',

        id: '编号',
        title: '标题',
        content: '内容',
        pic: '题图',
        edit: '修改',
        delete: '删除',
        created_at: '创建时间',
        active: '是否启用',

        section: {
          title: '版块名称',
          sort: '版块排序',
          add: '添加新版块',
        },
      },

      setting: {
        basicInfo: '基本信息',
        keywordInfo: '敏感词配置',
        notFound: '配置项没有找到',
        deleteOk: '删除成功',
        addOk: '添加成功',
        updateOk: '修改成功',
        id: '配置编号',
        configName: '配置名',
        configValue: '配置值',
        configGroup: '分组',
        active: '是否启用',
        add: '添加新配置',
        edit: '修改',
        delete: '删除',
        memo: '备注',

        groups: {
          basicInfo: '基本信息',
          keyword: '敏感词',
        },

        keyword: {
          edit: '修改',
          tip: '请输入敏感词',
        }
      },

      app: {
        basicInfo: '基本信息',
        sdkInfo: 'SDK配置',
        goodsInfo: '商品配置',
        add: '添加新应用',

        goods: {
          icon: '商品图片',
          id: '商品ID',
          name: '商品名称',
          description: '商品简介',
          price: '商品价格',
          productIds: '产品ID',
          productId: '产品ID',
          add: '添加新商品',
        }
      },

      upload: {
        title: '上传',
        dropToUpload: '拖拽文件以上传',
        progress: '上传进度',
        filename: '文件名',
        speed: '上传速度',
        uploadImage: '上传图片',
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
        updateSuccess: '保存成功',
        deleteSuccess: '删除成功',
        uploadSuccess: '文件上传成功',
        uploadFailed: '文件上传失败',
        updateFailed: '保存失败',
        requestFailed: '请求失败',
        uploadGoodsIcon: '修改商品『{goodsName}』的图标',
        uploadAppIcon: '修改应用『{appName}』的图标',
        uploadForumIcon: '修改论坛『{forumName}』的图标',
        editGoodsProductId: '编辑商品『{goodsName}』在『{sdk}』渠道的产品ID',
        ok: '确认',
        cancel: '取消',
        warning: '警告',
        searchOrders: '输入用户ID/订单号搜索',
        oops: '哦噢。。。',
        noOrderToDisplay: '当前没有任何可以显示的订单',
        loading: '正在加载数据...',
        editActivityInfo: '编辑活动信息',
        editNoticeInfo: '编辑公告信息',
        editNewsInfo: '编辑新闻信息',
        uploadNewsPic: '修改题图',
      },

      messages: {
        sdkInfoUpdated: '{sdk}接入参数的修改已成功保存',
        unknownError: '未知错误，请联系管理员',
        appInfoUpdated: '{appName}配置已成功更新',
        uploadSuccess: '{fileName}已成功上传',
        goodsInfoUpdated: '商品{goodsName}信息已成功更新',
        confirmDeleteGoods: '您确定要删除商品『{goodsName}』么?',
        goodsProductIdUpdated: '商品『{goodsName}』在『{sdk}』渠道的产品ID已成功更新',
        confirmDeleteSection: '您确定要禁用该论坛版块么?',
        sectionInfoUpdated: '论坛版块信息已成功更新',
        forumInfoUpdated: '论坛信息已成功更新',
        confirmDeleteSetting: '您确定要删除该配置项么?',
        confirmDeleteNews: '您确定要删除该内容么?',
      },

      serverSuccess: {
        appUpdated: '应用更新成功',
        forumUpdated: '论坛更新成功',
      },

      serverError: {
        imageSize128x128: '图片的尺寸必须为128x128',
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
        newsNotFound: '未找到该内容',
      },

      sdks: {
        applestore: 'iTunes Connect',
        ggplay: '谷歌商店',
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
        wechat: '微信',

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
          signature: '签名',
          package_name: '包名',
          partnerid: "商户号",
          sign_key: "签名Key",
        }
      }
    },
  }
}