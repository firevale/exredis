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
      fetchAppList() {
        return post('/admin_actions/fetch_apps', {})
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

      fetchForum(params) {
        return post('/forum_actions/fetch_forum', params)
      },

      updateForumInfo(params, successMessage) {
        return post('/admin_actions/forum/update_forum_info', params, successMessage)
      },

      updateForumSectionInfo(params, successMessage) {
        return post('/admin_actions/forum/update_section_info', params, successMessage)
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

      updateMallInfo(params, successMessage) {
        return post('/admin_actions/mall/update_mall_info', params, successMessage)
      },

      fetchGoods(params) {
        return post('/mall_actions/fetch_goods', params)
      },

      updateGoods(params) {
        return post('/admin_actions/mall/update_goods', params)
      },

      toggleGoodsStatus(params) {
        return post('/admin_actions/mall/toggle_goods_status', params)
      },

      deleteMallGoods(params) {
        return post('/admin_actions/mall/delete_goods', params)
      },

      getGoodsDetail(params) {
        return post('/mall_actions/get_goods_detail', params)
      },

      fetchMallOrders(params) {
        return post('/mall_actions/fetch_order_list', params)
      },

      fetchMallOrder(params) {
        return post('/mall_actions/fetch_order', params)
      },

      updateOrderPayed(params) {
        return post('/admin_actions/mall/update_order_paid', params)
      },

      refundOrder(params) {
        return post('/admin_actions/mall/refund_order', params)
      },

      addUser(params) {
        return post('/admin_actions/user/add_user', params)
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

      getUserById(id) {
        return post('/admin_actions/user/get_user_by_id', { id })
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

      fetchMyLoginCodes(params) {
        return post('/admin_actions/login_codes/fetch_my_codes', params)
      },

      addWcpEmptyParams(params) {
        return post('/admin_actions/wcp/add_wcp_empty_params', params)
      },

      updateWcpParams(params, successMessage) {
        return post('/admin_actions/wcp/update_wcp_params', params, successMessage)
      },

      updateWcpRules(params) {
        return post('/admin_actions/wcp/update_wcp_message_rule', params)
      },

      getWcpMenu(params) {
        return post('/admin_actions/wcp/get_wcp_menu', params)
      },

      updateWcpMenu(params) {
        return post('/admin_actions/wcp/update_wcp_menu', params)
      },

      deleteRule(rule_id, successMessage) {
        return post('/admin_actions/wcp/delete_wcp_message_rule', { rule_id }, successMessage)
      },

      deleteMessage(message_id, successMessage) {
        return post('/admin_actions/wcp/delete_wcp_message', { message_id }, successMessage)
      },

      getRuleList(app_id, page, records_per_page) {
        return post('/admin_actions/wcp/get_rule_list', {
          app_id,
          page,
          records_per_page
        })
      },

      getMessageList(data) {
        return post('/admin_actions/wcp/get_message_list', data)
      },
      getUserMessageList(app_id, open_id) {
        return post('/admin_actions/wcp/get_user_message_list', {
          app_id,
          open_id
        })
      },
      replyUserMessage(app_id, open_id, content) {
        return post('/admin_actions/wcp/reply_user_message', {
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

      getBriefStats(app_id) {
        return post('/admin_actions/stats/brief_stats', {
          app_id
        })
      },

      getStatsByDay(params) {
        return post('/admin_actions/stats/get_stats_by_day', params)
      },

      getUserTimingByDay(params) {
        return post('/admin_actions/stats/get_user_timing_by_day', params)
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

      getOperateLog(params) {
        return post('/admin_actions/log/get_operate_log', params)
      },

      addOperateLog(params) {
        return post('/admin_actions/log/add_operate_log', params)
      },

      getPointLogs(params) {
        return post('/admin_actions/point/get_point_logs', params)
      },

      addPoint(params, successMessage) {
        return post('/admin_actions/point/admin_add_point', params, successMessage)
      },

      fetchPointGoods(params) {
        return post('/admin_actions/point_mall/fetch_goods', params)
      },

      updatePointGoods(params) {
        return post('/admin_actions/point_mall/update_goods', params)
      },

      togglePointGoodsStatus(params) {
        return post('/admin_actions/point_mall/toggle_goods_status', params)
      },

      deletePointGoods(params) {
        return post('/admin_actions/point_mall/delete_goods', params)
      },

      getPointGoodsDetail(params) {
        return post('/admin_actions/point_mall/get_goods_detail', params)
      },
    }
  }
}