import {
  openNotification,
  processAjaxError
} from 'admin/miscellaneous'

import { i18n } from './vue-i18n'
import axios from 'axios'

const processResponse = (result, successMessage) => {
  if (!result.success) {
    processAjaxError(result)
  } else if (successMessage) {
    console.log(successMessage)
    openNotification({
      title: i18n.t('admin.notification.title.success'),
      message: successMessage,
      type: 'success',
      duration: 4500,
    })
  } else if (result.i18n_message) {
    openNotification({
      title: i18n.t('admin.notification.title.success'),
      message: i18n.t(result.i18n_message, result.i18n_message_object),
      type: 'success',
      duration: 4500,
    })
  }

  return Promise.resolve(result)
}

const post = (uri, params, successMessage) => {
  return axios.post(uri, params)
    .then(response => processResponse(response.data, successMessage))
    .catch(e => {
      openNotification({
        title: i18n.t('admin.notification.title.failed'),
        message: i18n.t('admin.notification.message.unknownError'),
        type: 'danger',
        duration: 4500,
      })
      return Promise.resolve({ success: false })
    })
}

export default {
  install: function(Vue, options) {
    Vue.prototype.$acs = {
      listAdminApps() {
        return post('/admin_actions/list_admin_apps', {})
      },

      updateAppInfo(params, successMessage) {
        return post('/admin_actions/app/update_app_info', params, successMessage)
      },

      updateAppSdkInfo(params, successMessage) {
        return post('/admin_actions/app/update_app_sdk_info', params, successMessage)
      },

      updateAppGoodsInfo(params, successMessage) {
        return post('/admin_actions/app/update_app_goods_info', params, successMessage)
      },

      updateAppGoodsProductId(params, successMessage) {
        return post('/admin_actions/app/update_app_goods_product_id', params, successMessage)
      },

      deleteAppGoods(params, successMessage) {
        return post('/admin_actions/app/delete_app_goods', params, successMessage)
      },

      generateDummySdkInfo(params) {
        return post('/admin_actions/app/generate_dummy_sdk_info', params)
      },

      fetchOrders(params) {
        return post('/admin_actions/fetch_orders', params)
      },

      searchOrders(params) {
        return post('/admin_actions/search_orders', params)
      },

      fetchAppForum(params) {
        return post('/forum_actions/get_app_forum', params)
      },

      updateForumInfo(params, successMessage) {
        return post('/admin_actions/forum/update_forum', params, successMessage)
      },

      updateForumSectionInfo(params, successMessage) {
        return post('/admin_actions/forum/update_forum_section', params, successMessage)
      },

      getSetting(params) {
        return post('/admin_actions/setting/get_setting', params)
      },

      getSettingsByGroup(params) {
        return post('/admin_actions/setting/get_settings_by_group', params)
      },

      updateSettingByName(params, successMessage) {
        return post('/admin_actions/setting/update_setting_by_name', params, successMessage)
      },

      deleteSettingByName(params, successMessage) {
        return post('/admin_actions/setting/delete_setting', params, successMessage)
      },

      getPagedNews(app_id, group, page, records_per_page) {
        return post('/admin_actions/games/get_paged_news_admin', {
          app_id,
          group,
          page,
          records_per_page
        })
      },

      getPagedQuestions(app_id, page, records_per_page) {
        return post('/customer_service_actions/get_paged_questions', {
          app_id,
          page,
          records_per_page
        })
      },

      updateQuestion(params, successMessage) {
        return post('/admin_actions/customer_service/update_question', params, successMessage)
      },

      deleteQuestion(params, successMessage) {
        return post('/admin_actions/customer_service/delete_question', params, successMessage)
      },

      getNewsDetail(news_id) {
        return post('/games_actions/get_news_detail', { news_id })
      },

      updateNews(params) {
        return post('/admin_actions/games/update_news', params)
      },

      toggleStatus(params, successMessage) {
        return post('/admin_actions/games/toggle_news_status', params, successMessage)
      },

      listMalls(params, successMessage) {
        return post('/mall_actions/list_malls', params, successMessage)
      },

      updateMallInfo(params, successMessage) {
        return post('/admin_actions/mall/update_mall', params, successMessage)
      },

      listMallGoods(params) {
        return post('/mall_actions/list_mall_goods', params)
      },

      updateGoods(params) {
        return post('/admin_actions/mall/update_mall_goods', params)
      },

      toggleMallGoodsStatus(params) {
        return post('/admin_actions/mall/toggle_mall_goods_status', params)
      },

      deleteMallGoods(params) {
        return post('/admin_actions/mall/delete_mall_goods', params)
      },

      getGoodsDetail(params) {
        return post('/mall_actions/get_pmall_goods_detail', params)
      },

      listMallOrders(params) {
        return post('/mall_actions/list_mall_orders', params)
      },

      getFatMallOrder(params) {
        return post('/mall_actions/get_fat_mall_order', params)
      },

      setMallOrderPaid(params) {
        return post('/admin_actions/mall/set_mall_order_paid', params)
      },

      refundOrder(params) {
        return post('/admin_actions/mall/refund_order', params)
      },

      listAppAdminUsers(params) {
        return post('/admin_actions/user/list_app_admin_users', params)
      },

      deleteAdminUser(params) {
        return post('/admin_actions/user/delete_admin_user', params)
      },

      getUserFromRedis(params) {
        return post('/admin_actions/user/get_user_from_redis', params)
      },

      searchUser(params) {
        return post('/admin_actions/user/search_user', params)
      },

      addAdminUser(params) {
        return post('/admin_actions/user/add_admin_user', params)
      },

      getCurrentUserLevel(params) {
        return post('/admin_actions/user/get_current_user_level', params)
      },

      searchUsers(params) {
        return post('/admin_actions/user/search_users', params)
      },

      getUserInfo(id) {
        return post('/admin_actions/user/get_user_info', { id })
      },

      generateLoginCodes(params, successMessage) {
        return post('/admin_actions/login_codes/gen_codes', params, successMessage)
      },

      delLoginCodes(params, successMessage) {
        return post('/admin_actions/login_codes/del_codes', params, successMessage)
      },

      fetchLoginCodesStats(params) {
        return post('/admin_actions/login_codes/stats_info', params)
      },

      assignLoginCodes(params, successMessage) {
        return post('/admin_actions/login_codes/assign_codes', params, successMessage)
      },

      listMyLoginCodes(params) {
        return post('/admin_actions/login_codes/list_my_codes', params)
      },

      createAppWcpConfig(params) {
        return post('/admin_actions/wcp/create_app_wcp_config', params)
      },

      updateAppWcpConfig(params, successMessage) {
        return post('/admin_actions/wcp/update_app_wcp_config', params, successMessage)
      },

      getWcpMenu(params) {
        return post('/admin_actions/wcp/get_wcp_menu', params)
      },

      updateWcpMenu(params) {
        return post('/admin_actions/wcp/update_wcp_menu', params)
      },

      updateWcpMessageRule(params) {
        return post('/admin_actions/wcp/update_wcp_message_rule', params)
      },

      deleteWcpMessageRule(rule_id, successMessage) {
        return post('/admin_actions/wcp/delete_wcp_message_rule', { rule_id }, successMessage)
      },

      listWcpMessageRules(app_id, page, records_per_page) {
        return post('/admin_actions/wcp/list_wcp_message_rules', {
          app_id,
          page,
          records_per_page
        })
      },

      listWcpUserMessages(data) {
        return post('/admin_actions/wcp/list_wcp_user_messages', data)
      },

      listUserWcpMessages(app_id, open_id) {
        return post('/admin_actions/wcp/list_user_wcp_messages', {
          app_id,
          open_id
        })
      },

      replyUserWcpMessage(app_id, open_id, content) {
        return post('/admin_actions/wcp/reply_user_wcp_message', {
          app_id,
          open_id,
          content
        })
      },

      getOnlineChart(app_id) {
        return post('/admin_actions/stats/onlines', {
          app_id
        })
      },

      getRealtimeMetrics(app_id) {
        return post('/admin_actions/stats/realtime_metrics', {
          app_id
        })
      },

      getStatsByDate(params) {
        return post('/admin_actions/stats/get_stats_by_date', params)
      },

      getUserTimingByDate(params) {
        return post('/admin_actions/stats/get_user_timing_by_date', params)
      },

      getRetentionStats(params) {
        return post('/admin_actions/stats/get_stats_retention', params)
      },

      getStatsDevice(params) {
        return post('/admin_actions/stats/get_stats_device', params)
      },

      getStatsDeviceDetails(params) {
        return post('/admin_actions/stats/get_stats_device_details', params)
      },

      listAdminOperateLog(params) {
        return post('/admin_actions/log/list_admin_operate_logs', params)
      },

      listPMallPointLogs(params) {
        return post('/admin_actions/pmall/list_pmall_point_logs', params)
      },

      adminAddPMallPoint(params, successMessage) {
        return post('/admin_actions/pmall/admin_add_pmall_point', params, successMessage)
      },

      listPMallGoods(params) {
        // TODO: 从前端读, 不要从admin_actions获取
        return post('/admin_actions/pmall/list_pmall_goods', params)
      },

      updatePMallGoods(params) {
        return post('/admin_actions/pmall/update_pmall_goods', params)
      },

      togglePMallGoodsStatus(params) {
        return post('/admin_actions/pmall/toggle_pmall_goods_status', params)
      },

      deletePMallGoods(params) {
        return post('/admin_actions/pmall/delete_pmall_goods', params)
      },

      getPointGoodsDetail(params) {
        return post('/admin_actions/pmall/get_pmall_goods_detail', params)
      },

      getTaskList() {
        return post('/admin_actions/pmall/get_task_list', {})
      },

      updateTask(params, successMessage) {
        return post('/admin_actions/pmall/update_task', params, successMessage)
      },

      deleteTaskBar(params) {
        return post('/admin_actions/pmall/delete_task', params)
      },

      toggleTaskStatus(params, successMessage) {
        return post('/admin_actions/pmall/toggle_task_status', params, successMessage)
      },

      changeTaskBarsSort(needChange) {
        return post('/admin_actions/pmall/change_taskbars_sort', { needChange})
      },

      listPmallQuestions(params) {
        return post('/admin_actions/pmall/list_pmall_questions', params)
      },

      updatePmallQuestion(params, successMessage) {
        return post('/admin_actions/pmall/update_pmall_question', params, successMessage)
      },

      deletePmallQuestion(params, successMessage) {
        return post('/admin_actions/pmall/delete_pmall_question', params, successMessage)
      },
    }
  }
}