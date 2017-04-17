export default {
  accountTitle: '个人中心',      
  userId: '用户ID',
  nickname: '昵称',
  mobile: '绑定手机',
  email: '绑定邮箱',
  residentInfo: '实名认证',
  logout: '退出登录',
  notBound: '未绑定',
  bind: '绑定',
  notAuthenticated: '未认证',
  fetchVeiryCode: '获取验证码',
  cooldownText: '重新发送({timer}s)',

  hint: {
    currentBoundModile: '提示: 您当前已绑定手机{mobile}',
  },

  placeholder: {
    inputMobileNumber: '请输入手机号码',
    inputVerifyCode: '请输入验证码',
    inputEmail: '请输入邮箱地址',
    inputPassword: '请输入密码',
  }, 

  error: {
    requireMobile: '请输入手机号码',
    requireVerifyCode: '请输入验证码',
    requirePassword: '请输入密码',
    requireEmail: '请输入电子邮箱',
    invalidMobileNumber: '请输入正确的手机号码',
    invalidEmail: '请输入正确的电子邮箱',
    mobileNotChanged: '当前已绑定此手机号码',
    emailNotChanged: '当前已绑定此电子邮箱',
    invalidVerifyCodeLength: '验证码长度4~6位',
    sendSmsCooldown: '一分钟内只能发送一次，请稍后再试',
  }
}