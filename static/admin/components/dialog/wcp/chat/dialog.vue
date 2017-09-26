<template>
  <modal :visible="visible">
    <div class="box">
      <div class="heading has-text-centered">
        <h5 class="title is-5">{{title}}</h5>
      </div>
      <div class="message-body">
        <div v-for="msg in messages" :key="msg.id" class="talk">
          <div class="user-info" :class="{'is-right': !msg.from.id && !msg.from.openid.match(/^gh_.*$/)}">
            {{ msg.from.nickname }}
          </div>
          <div class="content box" :class="{'is-success': !msg.from.id}">
            {{msg.content}}
            <div class="datetime">
              <small><timeago :since="msg.inserted_at | convertServerDateTime" :auto-update="60"></timeago></small>
            </div>
          </div>
        </div>
      </div>
      <div class="form">
        <div class="field">
          <div class="control">
            <textarea class="textarea" v-model="content" placeholder="请输入回复内容" style="min-height:80px"></textarea>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="reply" :disabled="content.trim() == '' ?  'disabled' : undefined">
            回复
          </button>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>
import {
  Modal
} from 'vue-bulma-modal'

export default {
  props: {
    visible: Boolean,
    message: Object,
    appId: String,
  },
  data() {
    return {
      messages: [],
      content: '',
    }
  },
  computed: {
    title() {
      return `与${this.userName}的对话`
    },
    userName() {
      return this.message.from.nickname
    }
  },
  mounted: function() {
    this.fetchData()
  },
  methods: {
    async reply() {
      let result = await this.$acs.replyUserWcpMessage(this.appId, this.message.from.openid, this.content)
      if (result.success) {
        this.messages.push(result.message)
        this.content = ''
      }
    },
    async fetchData() {
      this.messages = []
      let result = await this.$acs.listUserWcpMessages(this.appId, this.message.from.openid)
      if (result.success) {
        this.messages = result.messages
        console.log(this.messages)
      }
    }
  },
  components: {
    Modal,
  },
};
</script>
<style lang="scss" scoped>
.message-body {
  height: 300px;
  overflow-y: scroll;
  margin-bottom: 1rem;
}

div.talk {
  margin-bottom: 1rem;
  .user-info {
    height: 2rem;
    line-height: 2rem;
    font-weight: bold;
    &.is-right {
      text-align: right;
    }
  }
  .content.box {
    padding: .5rem !important;
    .datetime {
      color: gray;
      text-align: right;
    }
  }
}
</style>