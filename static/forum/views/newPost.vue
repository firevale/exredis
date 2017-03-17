<template>
  <div>
    <div class="tile is-full has-text-left" style="padding: 1rem 0">
      <span class="title is-5 is-clickable" style="margin: 0 0.5rem 0 0; font-weight: 400" @click="showSelectSectionMenu">{{ selectedSectionTitle }}</span>
      <span class="icon image-icon icon-pull-down is-clickable" @click="showSelectSectionMenu"> 
      </span>
    </div>
    <form class="post" @submit.prevent="handleSubmit" v-show="selectedSectionTitle">
      <p class="control is-horizontal" style="margin-bottom: 1.5rem">
        <input class="input" style="border-radius: 0" type="text" v-model.trim="title" :placeholder="$t('forum.newPost.titlePlaceholder')"></input>
      </p>
      <quill-editor v-model="content" @ready="setEditor" @input="handleValidation($v.content)">
      </quill-editor>
      <div class="tile is-full has-text-left" style="margin-top: 0.5rem" v-show="errorHint">
        <span class="icon is-sign">!</span>
        <span class="is-primary" style="font-size: 1rem">{{errorHint}}</span>
      </div>
      <div class="tile is-full has-text-centered" >
        <input type="submit" :value="$t('forum.newPost.btnTxt')" class="button is-info" 
          :class="processing || $v.$invalid ? 'is-disabled' : ''" />
      </div>
    </form>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapActions
  } from 'vuex'

  import {
    required,
    minLength,
    maxLength
  } from 'vuelidate/lib/validators'

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
      ...mapGetters([
        'userInfo',
        'forumInfo',
        'currentSectionId'
      ]),

      selectedSectionTitle() {
        let item = this.sectionMenuItems[this.selectedSectionId]
        return item ? item.title : ''
      },

      errorHint: function() {
        if (!this.$v.title.required) {
          return this.$t('forum.newPost.titlePlaceholder')
        } else if (!this.$v.title.minLength) {
          return this.$t('forum.error.postTitleMinLength')
        } else if (!this.$v.title.maxLength) {
          return this.$t('forum.error.postTitleMaxLength')
        } else if (!this.$v.content.required) {
          return this.$t('forum.error.commentContentRequired')
        }

        return ''
      },
    },

    validations: {
      title: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30),
      },
      content: {
        required: function(val) {
          return this.editor && this.editor.getText().trim().length >= 5
        }
      }
    },

    data() {
      return {
        title: '',
        content: '',
        selectedSectionId: 1,
        sectionMenuItems: {},
        processing: false,
        editor: undefined,
      }
    },

    mounted: function() {
      this.$nextTick(_ => {
        let menuItems = {}
        this.selectedSectionId = this.currentSectionId || 1
        this.forumInfo.sections.forEach(section => {
          menuItems[section.id] = {
            title: section.title,
            value: section.id
          }
        })
        this.sectionMenuItems = menuItems
      })
    },

    methods: {
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

      showSelectSectionMenu() {
        menuModal.showModal({
          menuItems: this.sectionMenuItems,
          selectedValue: this.selectedSectionId,
          onOk: menuItem => this.selectedSectionId = menuItem.value
        })
      },

      // preview() {
      //   postPreview({
      //     visible: true,
      //     item: {
      //       user: this.userInfo,
      //       section: this.sectionMenuItems[this.selectedSectionId],
      //       title: this.title,
      //       time: utils.nowFromServer(),
      //       content: this.content
      //     },
      //   })
      // },

      handleSubmit: async function() {
        if (!this.$v.$invalid && !this.processing) {
          this.processing = true
          let forumId = this.$router.currentRoute.params.forumId
          let result = await this.$acs.addPost(forumId, this.selectedSectionId, this.title, this.content)

          if (result.success) {
            message.showMsg(this.$t('forum.newPost.addSuccess'))
            this.$router.replace({
              name: 'postList'
            })
          }
          this.processing = false
        }
      },
    }
  }
</script>