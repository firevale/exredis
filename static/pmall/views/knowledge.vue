<template>
  <div class="know-ledge">
    <header class="is-flex flex-center">
      <img src="~assets/pmall/1247_03.png" />
    </header>
    <div class="items is-flex">
      <div class="q-item">
        <h1 class="title has-text-centered is-size-large">问答题</h1>
        <h2 class="subtitle is-size-medium is-grey-dark">{{question.question}}</h2>
      </div>
      <div class="a-item is-flex">
        <div class="column is-3 has-text-left">
          <img src="~assets/pmall/1247_03_01.png" />
        </div>
        <div class="answer column is-6 has-text-left">
          <ul>
            <li class="is-flex flex-vcentered">
              <input type="radio" v-model.trim="correct" :value="question.a1">&nbsp;A
              <span class="subtitle is-size-small is-grey-dark">{{question.a1}}</span>
            </li>
            <li class="is-flex flex-vcentered">
              <input type="radio" v-model.trim="correct" :value="question.a2">&nbsp;B
              <span class="subtitle is-size-small is-grey-dark">{{question.a2}}</span>
            </li>
            <li class="is-flex flex-vcentered">
              <input type="radio" v-model.trim="correct" :value="unknow">&nbsp;C
              <span class="subtitle is-size-small is-grey-dark">{{unknow}}</span>
            </li>
          </ul>
          <div class="is-flex flex-center">
            <a v-if="!isComplete" class="button btn-answer-ok" @click="onSubmit"></a>
            <a v-else class="button btn-answer-complete"></a>
          </div>
          <div v-show="isCorrect" class="answer-yes is-flex flex-center">
            <img src="~assets/pmall/1247_r_03.png" />
          </div>
          <div v-show="isWwrong" class="answer-error is-flex flex-center">
            <img src="~assets/pmall/1247_2_03.png" />
          </div>
        </div>
        <div class="column is-3 has-text-right">
          <img src="~assets/pmall/1247_03_02.png" />
        </div>
      </div>
      <div class="n-item">
        <p class="title has-text-left">每日问答页面的积分注解：</p>
        <p class="subtitle is-size-small is-grey-dark">1:每日问答问题根据游戏里面游戏问答题库进行随机产出</p>
        <p class="subtitle is-size-small is-grey-dark">2:答对得积分，答错无积分</p>
      </div>
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
      correct: '',
      unknow: '加载中',
      question: {
        question: '加载中',
        a1: '加载中',
        a2: '加载中'
      },
      isCorrect: false,
      isWwrong: false,
      isComplete: false
    }
  },

  mounted() {
    this.loadData()
  },
  methods: {
    loadData: async function() {
      let result = await this.$acs.getDailyQuestion()
      if (result.success) {
        this.isComplete = result.exists > 0
        this.question = result.question
        this.unknow = "不知道"
      }
    },
    onSubmit: async function() {
      if (!this.processing) {
        this.processing = true
        let result = await this.$acs.answerQuestion(this.question.id, this.correct)
        if (result.success) {
          if (result.answer) {
            this.isCorrect = true
            this.isWwrong = false
          } else {
            this.isWwrong = true
            this.isCorrect = false
          }
        }
        this.isComplete = true
        this.processing = false
      }
    }
  }

}
</script>