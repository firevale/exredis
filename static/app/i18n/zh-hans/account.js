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
  update: '修改',
  notAuthenticated: '未认证',
  fetchVeiryCode: '获取验证码',
  cooldownText: '重新发送({timer}s)',

  hint: {
    currentBoundMobile: '提示: 您当前已绑定手机"{mobile}"',
    currentBoundEmail: '提示: 您当前已绑定邮箱"{email}"',
    currentNickName: '提示: 您当前的昵称为"{nickname}"',
  },

  placeholder: {
    inputMobileNumber: '请输入手机号码',
    inputVerifyCode: '请输入验证码',
    inputEmail: '请输入邮箱地址',
    inputPassword: '请输入密码',
    inputNickname: '请输入新的昵称',
    inputResidentName: '请输入您的真实姓名',
    inputResidentId: '请输入您的身份证号码',
  },

  messages: {
    mobileBindSuccess: '已绑定手机{mobile}',
    emailBindSuccess: '已绑定邮箱{email}',
    nicknameUpdated: '昵称已成功修改',
    residentInfoUpdated: '实名制信息已成功更新',
  },

  error: {
    userIdCheckFail: '用户信息中含有敏感词汇，请修改后重新提交',
    nickNameError: '用户昵称只允许【中文/数字/字母/下划线】',
  }
}