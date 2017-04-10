<template>
  <div @click="selectedId==question.id?selectedId='':selectedId=question.id">
    <div class="level-content">
      <nav class="level is-mobile">
        <div class="level-left">
          <span style="flex: 1;">{{question.inserted_at | formatServerDateTime}}</span>
        </div>
        <div class="level-right">
          <span v-if="question.answer === null">{{$t('customerService.myService.noReply') }}</span>
          <span v-else class="service-reply">{{$t('customerService.myService.alreadyReply') }}</span>
        </div>
      </nav>
    </div>
    <div class="level-content">
      <nav class="level is-mobile">
        <div class="level-left">
          <span style="flex: 1;">{{question.title}}</span>
        </div>
        <div class="level-right">
          >
        </div>
      </nav>
    </div>
    <div v-show="selectedId==question.id && question.answer!==null" class="level-content reply-content">
      {{$t('customerService.reply') }}
      <article class="message">
        <div class="message-body">{{question.answer}}
        </div>
      </article>
    </div>
    <hr>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import * as filter from 'common/js/filters'

  export default {
    props: {
      searchKeyword: {
        type: String,
        default: '',
      },
      question: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        selectedId: '',
      }
    }

  }
</script>