<template>
  <aside class="menu app-sidebar animated" :class="{ slideInLeft: show, slideOutLeft: !show }">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li v-for="(item, index) in menu" :key="item.path">
        <router-link :to="item.path" :exact="true" :aria-expanded="isExpanded(item) ? 'true' : 'false'" v-if="item.path"
          @click.native="toggle(index, item)">
          <span class="icon is-small"><i :class="['fa', item.meta.icon]"></i></span> {{ item.meta.label || item.name }}
          <span class="icon is-small is-angle" v-if="item.children && item.children.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </router-link>
        <a :aria-expanded="isExpanded(item)" v-else @click="toggle(index, item)">
          <span class="icon is-small"><i :class="['fa', item.meta.icon]"></i></span> {{ item.meta.label || item.name }}
          <span class="icon is-small is-angle" v-if="item.children && item.children.length">
            <i class="fa fa-angle-down"></i>
          </span>
        </a>
        <expanding v-if="item.children && item.children.length">
          <ul v-show="isExpanded(item)">
            <li v-for="subItem in item.children" v-if="subItem.path" :key="subItem.path">
              <router-link :to="generatePath(item, subItem)">
                {{ subItem.meta && subItem.meta.label || subItem.name }}
              </router-link>
            </li>
          </ul>
        </expanding>
      </li>
    </ul>
  </aside>
</template>
<script>
import Expanding from 'vue-bulma-expanding'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  components: {
    Expanding
  },

  props: {
    show: Boolean
  },

  data() {
    return {
      isReady: false,
    }
  },

  mounted() {
    let route = this.$route
    if (route.name) {
      this.isReady = true
      this.shouldExpandMatchItem(route)
    }
  },

  computed: {
    ...mapGetters([
      'indexMenuitems', 'menuitems', 'adminLevel'
    ]),

    menu: function() {
      let result = []
      if (this.$route.params.appId) {
        result = this.menuitems.map(item => {
          return {
            name: item.name,
            path: item.path ? item.path.replace(":appId", this.$route.params.appId) : undefined,
            meta: item.meta,
            children: item.children ? item.children.map(subItem => {
              return {
                name: subItem.name,
                path: subItem.path ? subItem.path.replace(":appId", this.$route.params.appId) : undefined,
                meta: subItem.meta,
              }
            }) :undefined,
          }
        })
      } 
      else {
        result = this.indexMenuitems
      }
      return result.filter(this.checkPower)
    }
  },

  methods: {
    ...mapActions([
      'expandMenu'
    ]),

    isExpanded(item) {
      return item.meta.expanded
    },

    checkPower(item) {
      return item.meta.level.indexOf(this.adminLevel + ",") >= 0
    },

    toggle(index, item) {
      this.expandMenu({
        index: index,
        expanded: !item.meta.expanded
      })
    },

    shouldExpandMatchItem(route) {
      let matched = route.matched
      let lastMatched = matched[matched.length - 1]
      let parent = lastMatched.parent || lastMatched
      const isParent = parent === lastMatched

      if (isParent) {
        const p = this.findParentFromMenu(route)
        if (p) {
          parent = p
        }
      }

      if ('expanded' in parent.meta && !isParent) {
        this.expandMenu({
          item: parent,
          expanded: true
        })
      }
    },

    generatePath(item, subItem) {
      return `${item.component ? item.path + '/' : ''}${subItem.path}`
    },

    findParentFromMenu(route) {
      const menu = this.menu
      for (let i = 0, l = menu.length; i < l; i++) {
        const item = menu[i]
        const k = item.children && item.children.length
        if (k) {
          for (let j = 0; j < k; j++) {
            if (item.children[j].name === route.name) {
              return item
            }
          }
        }
      }
    }
  },

  watch: {
    $route(route) {
      this.isReady = true
      this.shouldExpandMatchItem(route)
    }
  }

}
</script>