export default {
  install : function(Vue, options) {
    Vue.prototype.$acs = {
      async getPagedPost(page, records_per_page, order, section_id, forum_id) {
        let response = await Vue.http.post('/forum_actions/get_paged_post', {
          page,
          records_per_page,
          order,
          section_id,
          forum_id,
        })
        return await response.json()
      },

      async getForumInfo(forum_id) {
        let response = await Vue.http.post('/forum_actions/get_forum_info', {forum_id})
        return await response.json()
      },

      async addPost(forum_id, section_id, title, content) {
        let response = await Vue.http.post('/forum_actions/add_post', {forum_id, section_id, title, content,})
        return await response.json()
      },

      async getPostDetail(post_id) {
        let response = await Vue.http.post('/forum_actions/get_post_detail', {post_id})
        return await response.json()
      },

      async deleteCommon(common_id) {
        let response = await Vue.http.post('/forum_actions/delete_comment', {common_id})
        return await response.json()
      },

      async togglePostFavorite(post_id) {
        let response = await Vue.http.post('/forum_actions/toggle_post_favorite', {post_id})
        return await response.json()
      },

      async setPostStatus(post_id, status) {
        let response = await Vue.http.post('/forum_actions/set_post_status', {post_id, status,})
        return await response.json()
      },

      async getPostCommons(post_id, page, records_per_page) {
        let response = await Vue.http.post('/forum_actions/get_post_comments', {post_id, page, records_per_page,})
        return await response.json()
      },
    }
  }
}
