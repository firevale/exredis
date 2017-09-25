<template>
  <div>
    <el-dialog v-if="message" :title="title" :visible.sync="visible" :modal="false" style="width:1300px; height:1300px">
      <div class="message-body">
        <div v-for="msg in messages" :key="msg.id" class="talk">
          <div class="user-info" :class="{'is-right': !msg.from.id && msg.from.openid.match(/^gh_.*$/)}">
            {{ msg.from.nickname }}
          </div>
          <div class="content box" :class="{'is-success': !msg.from.id}">
            {{msg.content}}
            <div class="datetime">{{msg.inserted_at | formatServerDateTime}}</div>
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
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      message: undefined,
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
  watch: {
    'visible' (newValue) {
      if (!newValue) {
        this.$emit("close")
      }
    }
  },
  methods: {
    open(message) {
      this.visible = true
      this.message = message
      this.fetchData()
    },
    close() {
      this.visible = false
    },
    async reply() {
      var appId = this.$route.params.appId
      var result = await this.$acs.replyUserWcpMessage(appId, this.message.from.openid, this.content)
      if (result.success) {
        this.messages.push(result.message)
        this.content = ''
      }
    },
    async fetchData() {
      this.messages = []
      var appId = this.$route.params.appId
      var result = await this.$acs.listUserWcpMessages(appId, this.message.from.openid)
      if (result.success) {
        this.messages = result.messages
      }
    }
  }
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

.dialog-fade-enter-active {
  animation: dialog-fade-in .3s;
}

.dialog-fade-leave-active {
  animation: dialog-fade-out .3s;
}

@keyframes dialog-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>