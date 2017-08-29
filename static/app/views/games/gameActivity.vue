<template>
  <div class="columns is-multiline is-mobile" style="margin:0 2rem">
    <v-touch v-for="item in activityList" :key="item.id" class="column is-half is-clickable" v-on:tap="showActivityDetail(item)">
      <center>
        <img v-if="item.pic" :src="item.pic | imageStaticUrl" style="border-radius: .5rem;"></img>
        <img v-else src="https://placehold.it/640x260?text=640x260" style="border-radius: .5rem;"></img>
      </center>
    </v-touch>
  </div>
</template>
<script>
export default {
  created: function() {
    this.fetchData()
  },

  watch: {
    '$route': 'fetchData'
  },

  data() {
    return {
      activityList: [],
      detail: Object,
    }
  },

  methods: {
    fetchData: async function() {
      let app_id = this.$route.params.app_id
      let result = await this.$acs.getPagedNews(app_id, "activity", 1, 12)

      if (result.success) {
        this.activityList = result.news
      }
    },

    showActivityDetail(item) {
      this.$router.push({
        path: `/games/${this.$route.params.app_id}/activity/${item.id}`
      })
    },
  }
}
</script>