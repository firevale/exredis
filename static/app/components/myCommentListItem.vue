<template>
  <div class="content-item has-bottom-line">
    <div class="tile is-vertical">
      <div class="tile" style="margin-left: 1rem">
        <h5 class="title is-5">{{ $t('forum.personal.reply') }}</h5>
        <h5 v-if="!itemData.active" class="title is-5" style="font-weight:300">{{delHtmlTag(itemData.content)}}</h5>
        <h5 v-else class="title is-5">{{delHtmlTag(itemData.content)}}</h5>
      </div>
      <div class="tile" style="margin-left: 1rem">
        <span class="subtitle is-marginless">{{ itemData.inserted_at | formatServerDateTime }}</span>
        <span class="subtitle" style="margin:0 1em">|</span>
        <span class="subtitle">{{ itemData.post.comms + '/' + itemData.post.reads }}</span>
      </div>
      <v-touch class="tile has-background is-clickable" style="align-items: center;" @tap="showDetail">
        <h5 class="title is-5" style="margin: 0.5rem">{{ $t('forum.personal.originalPost') }}[{{ itemData.post.section.title }}] {{ itemData.post.title | filterKeyword }}</h5>
      </v-touch>
    </div>
  </div>
</template>
<script>
import * as filter from 'common/js/filters'

export default {
  props: {
    itemData: {
      type: Object,
      default: null,
    },
  },

  computed: {

  },

  methods: {
    showDetail() {
      this.$router.push({
        name: 'detail',
        params: {
          postId: this.itemData.post.id
        },
      })
    },
    delHtmlTag(html) {
      return filter.filterKeyword(html.replace(/<[^>]+>/g, "").trim().substring(0, 20))
    }
  },
}
</script>