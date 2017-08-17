<template>
  <div>
    <el-dialog v-if="message" :title="title" :visible.sync="visible" :modal="false">
      <div class="message-body">
        <div class="talk">
          <div class="user-info">系统</div>
          <div class="content box">激活码领取尚未开启，有关“先锋首测”的最新消息小狐狸这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息</div>
        </div>
        <div class="talk">
          <div class="user-info is-right">系统</div>
          <div class="content box">这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息</div>
        </div>
        <div class="talk">
          <div class="user-info">系统</div>
          <div class="content box">激活码领取尚未开启，有关“先锋首测”的最新消息小狐狸这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息</div>
        </div>
        <div class="talk">
          <div class="user-info is-right">系统</div>
          <div class="content box">这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息</div>
        </div>
        <div class="talk">
          <div class="user-info">系统</div>
          <div class="content box">激活码领取尚未开启，有关“先锋首测”的最新消息小狐狸这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息</div>
        </div>
        <div class="talk">
          <div class="user-info is-right">系统</div>
          <div class="content box">这是一段信息这是一段信息这是一段信息这是一段信息这是一段信息</div>
        </div>
      </div>
      <div class="form">
        <div class="field">
          <div class="control">
            <textarea class="textarea" placeholder="请输入回复内容" style="min-height:80px"></textarea>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary">
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
      message: undefined
    }
  },
  computed: {
    title() {
      return `与${this.message.fromname}的对话`
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
      console.info(this.message)
    },
    close() {
      this.visible = false
    }
  }
};
</script>
<style lang="scss" scoped>
.el-dialog--small {
  width: 700px !important;
}

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
  .box {
    padding: .5rem !important;
  }
}
</style>