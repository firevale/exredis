<template>
<div>
  <div class="tile is-full has-text-left" style="padding: 1rem 0">
    <h6 class="title is-6" style="font-weight: 400">{{$t('forum.detail.replyBtn') + ": " + currentPostTitle}}</h6>
  </div>
  <form @submit.prevent="handleSubmit" v-show="currentPostTitle">
    <div id="toolbar">
      <button class="ql-bold"></button>
      <button class="ql-italic"></button>
      <button class="fv-ql-image" @click.prevent="onInsertImage">
        <svg viewBox="0 0 18 18">
          <rect class="ql-stroke" height="10" width="12" x="3" y="4"></rect>
          <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
          <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
        </svg>
      </button>
      <button class="fv-ql-undo" @click.prevent="editor.history.undo()">
        <svg viewbox="0 0 18 18">
          <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
          <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
        </svg>
      </button>
      <button class="fv-ql-redo" @click.prevent="editor.history.redo()">
        <svg viewbox="0 0 18 18">
          <polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon>
          <path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path>
        </svg>
      </button>
    </div>
    <quill-editor ref="commentEditor" v-model="content" :config="editorOption" @ready="setEditor" @input="handleValidation($v.content)">
    </quill-editor>
    <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
      <span class="icon is-sign">!</span>
      <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
    </div>
    <div class="tile is-full has-text-centered" style="justify-content: center; margin-top: 0.5rem">
      <input type="submit" :value="$t('forum.newPost.btnTxt')" class="button is-info" :class="processing ? 'is-disabled' : ''"
      />
    </div>
  </form>
</div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import menuModal from '../components/menuModal'
import upload from '../components/fileUpload'

import {
  postPreview
} from '../components/preview'
import message from '../components/message'

import * as utils from 'common/utils'
import * as acs from 'common/acs'

const touchMap = new WeakMap()

export default {
  computed: {
    ...mapGetters(['userInfo', 'currentPostTitle']),

    errorHint: function() {
      if (!this.$v.content.required) {
        return this.$t('forum.error.commentContentRequired')
      }

      return ''
    },
  },

  mounted: async function() {
    if (!this.currentPostTitle) {
      let result = await this.$acs.getPostDetail(this.$route.params.postId)
      if (result.success) {
        this.setCurrentPostTitle(result.detail.title)
      }
    }
  },

  data() {
    return {
      editorOption: {
        modules: {
          toolbar: '#toolbar',
          history: {
            delay: 2000,
            maxStack: 100,
            userOnly: true
          }
        },
      },
      content: '',
      editor: undefined,
      errorMessage: '',
      processing: false,
    }
  },

  validations: {
    content: {
      required: function(val) {
        return this.editor && this.editor.getText()
          .trim()
          .length >= 5
      }
    }
  },

  methods: {
    ...mapActions([
      'setCurrentPostTitle'
    ]),

    setEditor: function(editor) {
      this.editor = editor
    },

    handleValidation: function($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch(), 2000))
    },

    onInsertImage: function() {
      console.log('on insert image clicked')
    },

    preview() {
      postPreview({
        visible: true,
        item: {
          user: this.userInfo,
          rank: '',
          time: utils.nowFromServer(),
          content: this.content,
        },
      })
    },

    handleSubmit: async function() {
      if (!this.$v.$error && !this.processing) {
        this.processing = true
        let postId = this.$route.params.postId
        let result = await this.$acs.addComment(postId, this.content)
        if (result.success) {
          message.showMsg(this.$t('forum.writeComment.addSuccess'))
          this.$router.replace({
            name: 'detail'
          })
        }
        this.processing = false
      }
    },
  }
}
</script>
