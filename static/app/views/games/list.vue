<template>
  <div class="tile is-ancestor is-vertical root-container">
    <div class="columns is-multiline">
      <article class="tile is-child notification" v-for="app in appList" @click.prevent="showForum(app.id)">
        <div class="tile is-parent">
          <div class="tile is-vertical is-child">
            <img :src="app.icon ? app.icon : 'https://placehold.it/64x64?text=128x128'"></img>
            <h2 style="font-weight: bold"> {{app.name}} </h2>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {

  data() {
    return {
      appList: []
    }
  },

  methods: {
    mounted: async function() {
      console.log("---------------------")
      await this.loadData()
    },

    loadData: async function() {
      let result = await this.$acs.getApps()

      if (result.success) {
        this.appList = result.apps
      }
    },

    showGames: function(app_id) {
      this.$router.push({
        name: "gamesIndex",
        params: {
          app_id: app_id
        },
      })
    }

  },
}
</script>