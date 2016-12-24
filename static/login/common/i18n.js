export default {
  'zh-hans': {
    account: {
      loginPage: {
        title: '火谷账号登陆',
        quickTitle: '选择账号登陆',
        titleRegister: '账号注册',
        titleBind: '账号绑定',
        retrievePasswordTitle: '找回密码',
        titleReset: '密码重置',
        btnSubmit: '登录',
        btnReset: '重置',
        sendVerifyCode: '获取验证码',
        sendVerifyCodeAgain: '重新发送',
        userPlaceHolder: '请输入手机号/邮箱地址',
        userOnlyEmailPlaceHolder: '请输入邮箱',
        userPasswordPlaceHolder: '请输入密码，6-20位英文或数字',
        verifyCodePlaceholder: '请输入验证码',
        forgetPassword: '忘记密码',
        registration: '快速注册',
        otherWays: '选择登录方式',
        changeCode: '更换',
      },

      registerPage:{
        btnRegister: '注册',
        btnBind: '绑定账号',
        sendAgain: "重新发送",
        cooldownText: "重新发送({timer}s)",
        goLoginPage: '已有帐号>',
        messageTip: '发送验证码成功',
        nextStep: '下一步',
        pleaseInputAccountName: '请输入手机号或电子邮件地址',
        pleaseInputCaptchaVerifyCode: '请输入验证码，点击图片可更换',
        pleaseInputMobileVerifyCode: '请输入您手机收到的验证码',
        pleaseInputPassword: '设置账号密码',
      },

      retrievePasswordPage: {
        nextStep: '下一步',
        sendPhoneCodeTipPre: '我们已向您的手机号',
        sendPhoneCodeTipEnd: '发送了验证短信',
        sendEmailCodeTipPre: '我们已向您的邮箱',
        sendEmailCodeTipEnd: '发送了验证信息',
        pleaseInputAccountName: '请输入您的账号',
        verifyCodeSentToEmail: '我们已经向您的邮箱<strong>{email}</strong>发送了验证码',
        verifyCodeSentToSms: '我们已经向您的手机<strong>{mobile}</strong>发送了验证码',
        setNewPassword: '请设定新密码',
        complete: '完成',
      },

      quickLoginPage: {
        gotoSelectAccount: '其他账号登陆>',
      },

      personalCenter: {
        title: '个人中心',
        changeAccount: '切换账号',
      },

      error: {
        requireUserName: '请输入用户名',
        userNameTooLong: '用户名超长',
        invalidAccountName: '请输入正确的邮箱或手机号码',
        invalidEmailAddress: '请输入正确的电子邮件地址',
        accountInUse: '账号已被使用',
        accountNotExist: '用户名或密码错误',
        requirePassword: '请输入密码',
        passwordWrong: '密码长度6-20位',
        invalidVerifyCode: '验证码输入有误',
        verifyCodeTooShort: '验证码至少有4个字符',
        passwordNotMatch: '用户名或密码错误',
        tooManyFails: '您已经多次输错密码，请稍后再试',
        sendSmsFailed: '验证短信发送失败, 请稍后再试',
        sendSmsCooldown: '一分钟内不能发送多次验证码',
        sendEmailFailed: '验证邮件发送失败，请稍后再试',
        sendEmailCooldown: '一分钟内不能发送多次验证码',
        accountNotFound: '账号不存在',
        networkError: '网络错误，请稍后再试',
        accountIdChanged: '账号被修改'
      },

      types: {
        anonymous: '快速游戏',
        firevale: '火谷账号',
        qq: 'qq',
        wechat: '微信',
        weibo: '微博',
      },

      alert: {
        hint: '提示',
        anonymousHintMessage: '为保障您的游戏数据安全，请尽快绑定一个帐号，以免因刷机等原因导致游戏数据丢失！',
        cancel: '取消',
      }
    },


  }
}