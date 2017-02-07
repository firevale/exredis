const state = {
    issues: ['闪退卡顿', '无法登录', '无法连接', '充值', '游客帐号', '公测返利', '签到奖品', '活动',]
}

const mutations = {
    'COMMON_ISSUES_SET'(state, newIssues){
        state = newIssues.slice(0)
    }
}

export default{
    state,
    mutations
}