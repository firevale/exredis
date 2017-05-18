<template>
  <modal :visible="visible">
    <div v-if="users" class="box">
      <div class="has-text-centered" style="width: 100%; margin-bottom: 10px">
        <h5 class="title is-5">{{ section.level==2? $t('admin.titles.addAppManager'):$t('admin.titles.addAppCustomerService') }}</h5>
      </div>
      <form name="section" @submit.prevent="handleSubmit">
        <aside class="menu">
          <ul class="menu-list">
            <li v-for="item in users"><a @click="selectUser(item)" :class="selectUserId==item.id ? 'is-active':''">{{item.nickname}}</a></li>
          </ul>
        </aside>
        <div class="has-text-centered" style="margin-top: 15px">
          <a class="button is-primary is-fullwidth" :class="{'is-loading': processing}" @click.prevent="handleSubmit" :disabled="!this.selectUserId">{{ $t('common.add') }}</a>
        </div>
      </form>
    </div>
    <div class="box" v-else>
      <div class="has-text-centered">
        <span class="icon is-large">
          <i class="fa fa-spinner fa-spin"></i>
        </span>
        <h2 class="subtitle" style="margin-top: 20px">
            {{ $t('admin.titles.loading') }}
        </h2>
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
    visible: {
      type: Boolean,
      default: true
    },
    section: Object,
    callback: Function,
  },
  mounted: async function() {
    this.getUsers()
  },

  data() {
    return {
      processing: false,
      users: undefined,
      selectUserId: undefined,
      selectUserAccountId: undefined
    }
  },

  methods: {
    getUsers: async function() {
      let par = new Object()
      par.level = this.section.level
      let result = await this.$acs.getUsersByLevel(par)
      if (result.success) {
        this.users = result.users
      }
    },
    selectUser: function(user) {
      this.selectUserId = user.id
      this.selectUserAccountId = user.email
    },
    handleSubmit: async function() {
      if (this.selectUserId) {
        this.processing = true
        let result = await this.$acs.addAdminUser({
          level: this.section.level,
          admin_id: this.selectUserId,
          account_id: this.selectUserAccountId
        })

        this.processing = false
        if (result.success) {
          if (this.callback) {
            this.callback(result)
          }
          this.visible = false
        }
      }
    }
  },

  components: {
    Modal,
  },
}
</script>