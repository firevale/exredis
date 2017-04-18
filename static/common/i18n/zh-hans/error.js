 export default {
   pageTitle: '糟糕， 出错了',

   // errors replied from acs server
   server: {
     networkError: '网络错误，请稍后再试',
     badRequestParams: '请求参数错误',

     userNameTooLong: '用户名超长',
     accountInUse: '账号已被使用',
     mobileInUse: '手机号码已被其他账号使用',
     emailInUse: '电子邮箱已被其他账号使用',
     nicknameInUse: '昵称已被其他用户使用',
     accountNotExist: '用户名或密码错误',
     invalidVerifyCode: '验证码输入有误',
     passwordNotMatch: '用户名或密码错误',
     tooManyFails: '您已经多次输错密码，请稍后再试',
     sendSmsFailed: '验证短信发送失败, 请稍后再试',
     sendSmsCooldown: '一分钟内不能发送多次验证码',
     sendEmailFailed: '验证邮件发送失败，请稍后再试',
     sendEmailCooldown: '一分钟内不能发送多次验证码',
     accountNotFound: '账号不存在',
     accountIdChanged: '账号被修改',
     sendSmsCooldown: '一分钟内只能发送一次，请稍后再试',
     imageSize128x128: '图片的尺寸必须为128x128',
     imageSize400x400: '图片的尺寸必须为400x400',
     imageSize640x260: '图片的尺寸必须为640x260',
     imageFormatPNG: '图片格式必须为PNG文件',
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
     forumNotExist: '论坛不存在',
     postNotExist: '帖子不存在',
     commentNotFound: '评论不存在',
     needLogin: '需要登录',
     userNotExist: '用户不存在',
   },

   // errors generated by form validator
   validation: {
     requireAccountId: '请输入您的手机号码/电子邮箱',
     requireMobile: '请输入您的手机号码',
     requireEmail: '请输入您的电子邮箱',
     requirePassword: '请输入密码',
     requireVerifyCode: '请输入验证码',
     invalidAccountId: '请输入正确的手机号码／电子邮箱',
     invalidMobileNumber: '请输入正确的手机号码',
     invalidEmailAddress: '请输入正确的电子邮箱',
     invalidPasswordLength: '密码长度6~20位',
     invalidVerifyCodeLength: '验证码长度4~6位',
     mobileNotChanged: '当前已绑定此手机号码',
     emailNotChanged: '当前已绑定此电子邮箱',
     postContentRequired: '帖子内容不能为空',
     postTitleMinLength: '帖子标题至少4个字',
     postTitleMaxLength: '帖子标题不能超过30个字',
     commentContentRequired: '回帖内容最少5个字',
   }
 }