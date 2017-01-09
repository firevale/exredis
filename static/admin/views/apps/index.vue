<template>
  <div class="columns is-multiline box">
    <article class="column is-3" v-for="app in appList">
      <div class="tile is-parent">
        <figure class="image is-64x64">
          <img :src="app.icon ? app.icon : 'https://placehold.it/64x64?text=128x128'"></img>
        </figure>
        <div class="tile is-vertical is-child" style="padding-left: 5px;">
          <h3 class=""> {{app.name}} </h3>
          <router-link class="button is-small is-outlined" style="margin-top: 15px" :to="{name: 'AppEdit', params: {appId: app.id}}">
            <span class="icon is-small"><i class="fa fa-search"></i></span>
            <span> {{ $t('admin.showDetail') }} </span>
          </router-link>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  export default {

    created: function() {

    },

    mounted: function() {


    },

    data: function() {
      return {

      }
    },

    computed: {
      ...mapGetters([
        'appList'
      ]),
    },

    methods: {

    }
  }
</script>

<style lang="scss">
</style>