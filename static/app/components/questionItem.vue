<template>
  <div @click="selectedId==question.id?selectedId='':selectedId=question.id">
    <div class="level-content">
      <nav class="level is-mobile">
        <div class="level-left">
          <p class="subtitle is-6">{{question.inserted_at | formatServerDateTime}}</p>
        </div>
        <div class="level-right">
          <p class="subtitle is-6" v-if="question.answer === null">{{$t('customerService.myService.noReply') }}</p>
          <p class="service-reply subtitle is-6" v-else>{{$t('customerService.myService.alreadyReply') }}</p>
        </div>
      </nav>
    </div>
    <div class="level-content">
      <nav class="level is-mobile">
        <div class="level-left">
          <p class="subtitle is-6">{{question.title}}</p>
        </div>
        <div class="level-right">
          <p style="padding-right:0.20rem" class="subtitle is-6">></p>
        </div>
      </nav>
    </div>
    <div v-show="selectedId==question.id && question.answer!==null" class="level-content reply-content">
      <p class="subtitle is-6"> {{$t('customerService.reply') }}</p>
      <article class="message">
        <div class="message-body subtitle is-6">
          {{question.answer}}
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