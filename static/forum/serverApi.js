export default {
  install : function(Vue, options) {
    Vue.prototype.$acs = {
      async getPagedPost(page, records_per_page, order) {
        let response = await Vue.http.post('/forum_actions/get_paged_post', {page, records_per_page, order,})
        return await response.json()
      },

      async getForumInfo(forum_id) {
        let response = await Vue.http.post('/forum_actions/get_forum_info', {forum_id})
        return await response.json()
      }
    }
  }
}
