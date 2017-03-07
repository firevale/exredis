export default {
  install : function(Vue, options) {
    Vue.prototype.$acs = {
      async getForumInfo(forum_id) {
        let response = await Vue.http.post('/forum/get_forum_info', {forum_id})
        return await response.json()
      },

      async getForumInfo() {
        let response = await Vue.http.post('/forum/get_forum_info', {})
        return await response.json()
      }
    }
  }
}
