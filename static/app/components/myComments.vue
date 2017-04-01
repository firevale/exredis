<template>
<div class="content-item">
  <div class="title-line">
     <h5 class="title is-5">{{ $t('forum.personal.reply') }}{{delHtmlTag(itemData.content)}}</h5>
  </div> 
  <div class="level">
     <div class="level-left level-item">
      <span class="subtitle">{{ itemData.inserted_at | formatServerDateTime }}</span>
       <span class="subtitle" style="margin:0 1em">|</span>
        <span class="subtitle">{{ itemData.post.comms + '/' + itemData.post.reads }}</span>
     </div> 
   </div>
   <div class="title-line has-background">
     <h5 class="title is-5">{{ $t('forum.personal.originalPost') }}[{{ itemData.post.section.title }}] {{ itemData.post.title | filterKeyword }}</h5>
  </div>   
</div>
</template>
<script>
import * as filter from 'common/filters'

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