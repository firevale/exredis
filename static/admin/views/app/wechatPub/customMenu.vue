<template>
  <div class="columns is-multiline">
    <div class="column is-12" style="padding:10px;">
      <h2 style="font-weight:bold;">使用说明及规则，请仔细阅读</h2>
      <ul style="list-style:circle; padding:10px 0 10px 20px; font-size:11pt;">
        <li>官方要求：一级菜单按钮个数为2-3个</li>
        <li>官方要求：如果设置了二级菜单，子按钮个数为2-5个</li>
        <li>官方要求：按钮描述，既按钮名字，不超过16个字节，子菜单不超过40个字节</li>
        <li>如果name不填，此按钮将被忽略</li>
        <li>如果一级菜单为空，该列所有设置的二级菜单都会被忽略</li>
        <li>key仅在SingleButton（单击按钮，无下级菜单）的状态下设置，如果此按钮有下级菜单，key将被忽略</li>
        <li>所有二级菜单都为SingleButton</li>
        <li>如果要快速看到微信上的菜单最新状态，需要<strong style="color: red">重新关注</strong>，否则需要静静等待N小时</li>
        <li>菜单项为点击事件，并且菜单key为<strong style="color: red">assign_login_code</strong>时，点击该菜单事件触发激活码回复</li>
      </ul>
    </div>
    <div class="column is-7" style="padding:10px;">
      <div class="columns is-multiline" style="border:1px #ccc solid; margin:3px;">
        <div class="column is-3"></div>
        <div class="column is-9">
          <div class="columns">
            <div class="column">第一列</div>
            <div class="column">第二列</div>
            <div class="column">第三列</div>
          </div>
        </div>
        <div class="column is-2" style="font-size:10pt; line-height:450%;">
          <ul>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>二级菜单</li>
            <li>&nbsp;</li>
            <li>&nbsp;</li>
            <li>一级菜单</li>
          </ul>
        </div>
        <div class="column is-10">
          <div class="columns is-multiline" v-if="wcpParams.menu">
            <div class="column is-one-third" v-dragula="wcpParams.menu.button[0].sub_button" bag="column0">
              <div class="column" v-for="(button, index) in wcpParams.menu.button[0].sub_button" :key="button.name">
                <input class="input" type="text" @click.prevent="setCurrentButton(button)" v-model.trim="button.name">
              </div>
              <div class="column">
                <p class="control has-icons-left">
                  <input class="input" type="text" @click.prevent="setCurrentButton(wcpParams.menu.button[0])" v-model.trim="wcpParams.menu.button[0].name">
                  <span class="icon is-small is-left">
                    <i class="fa fa-reorder"></i>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-one-third" v-dragula="wcpParams.menu.button[1].sub_button" bag="column1">
              <div class="column" v-for="(button, index) in wcpParams.menu.button[1].sub_button" :key="button.name">
                <input class="input" type="text" @click.prevent="setCurrentButton(button)" v-model.trim="button.name">
              </div>
              <div class="column">
                <p class="control has-icons-left">
                  <input class="input" type="text" @click.prevent="setCurrentButton(wcpParams.menu.button[1])" v-model.trim="wcpParams.menu.button[1].name">
                  <span class="icon is-small is-left">
                    <i class="fa fa-reorder"></i>
                  </span>
                </p>
              </div>
            </div>
            <div class="column is-one-third" v-dragula="wcpParams.menu.button[2].sub_button" bag="column2">
              <div class="column" v-for="(button, index) in wcpParams.menu.button[2].sub_button" :key="button.name">
                <input class="input" type="text" @click.prevent="setCurrentButton(button)" v-model.trim="button.name">
              </div>
              <div class="column">
                <p class="control has-icons-left">
                  <input class="input" type="text" @click.prevent="setCurrentButton(wcpParams.menu.button[2])" v-model.trim="wcpParams.menu.button[2].name">
                  <span class="icon is-small is-left">
                    <i class="fa fa-reorder"></i>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-5">
      <div class="field has-addons">
        <label style="font-weight:bold;">{{ $t('admin.wcp.menus.params') }}</label>
      </div>
      <div class="field has-addons">
        <label class="label">{{ $t('admin.wcp.menus.name') }}：</label>
        <p class="control">
          <input class="input is-small" style="width:200px;" type="text" v-model.trim="selectedButton.name">
        </p>
      </div>
      <div class="field has-addons">
        <label class="label">{{ $t('admin.wcp.menus.type') }}：</label>
        <p class="control">
          <span class="select is-media">
            <select v-model="selectedButton.type">
              <option v-for="option in options" v-bind:value="option.value" :key="option.value">
                {{ option.text }}
              </option>
            </select>
          </span>
        </p>
      </div>
      <div class="field has-addons" v-if="selectedButton.type=='click'">
        <label class="label">{{ $t('admin.wcp.menus.key') }}：</label>
        <p class="control">
          <input class="input is-small" type="text" style="width:200px;" v-model.trim="selectedButton.key">
        </p>
      </div>
      <div class="field has-addons" v-if="selectedButton.type=='view'">
        <label class="label">{{ $t('admin.wcp.menus.url') }}：</label>
        <p class="control">
          <input class="input is-small" type="text" style="width:200px;" v-model.trim="selectedButton.url">
        </p>
      </div>
      <label style="font-size:10pt;">{{ $t('admin.wcp.menus.tip') }}</label>
      <br/>
      <label style="font-size:10pt;">{{ $t('admin.wcp.menus.tip2') }}</label>
    </div>
    <div class="column is-12 has-text-centered">
      <p style="margin: 5px auto">
        <input type="button" style="display: inline-block; font-size: 1rem;" :value="$t('admin.wcp.btnGetMenu')"
          class="button is-primary" :class="loading ? 'is-disabled' : ''" @click.prevent="getMenu()"></input>
        <input type="button" style="display: inline-block; font-size: 1rem;" :value="$t('admin.wcp.btnUpdateMenu')"
          class="button is-primary" :class="loading ? 'is-disabled' : ''" @click.prevent="updateMenu()"></input>
      </p>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'

import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  processAjaxError
} from 'admin/miscellaneous'

import Toast from 'common/components/toast'

export default {
  created: function() {
    Vue.vueDragula.options(this.bagId, {
      direction: 'vertical',
    })
  },
  mounted: async function() {
    this.createAppWcpConfig()
  },

  computed: {
    ...mapGetters([
      'wcpParams'
    ]),
  },

  data() {
    return {
      selectedButton: {},
      loading: true,
      bagId: 'menus',
      options: [{
          text: '点击事件(传回服务器)',
          value: 'click'
        },
        {
          text: '访问网页(直接跳转)',
          value: 'view'
        }
      ],
      subMenuModel: {
        "name": "",
        "sub_button": [{
            "type": "",
            "name": "",
            "key": "",
            "url": ""
          },
          {
            "type": "",
            "name": "",
            "key": "",
            "url": ""
          },
          {
            "type": "",
            "name": "",
            "key": "",
            "url": ""
          },
          {
            "type": "",
            "name": "",
            "key": "",
            "url": ""
          },
          {
            "type": "",
            "name": "",
            "key": "",
            "url": ""
          }
        ]
      },
    }
  },
  methods: {
    ...mapActions([
      'updateAppWcpConfig',
    ]),

    setCurrentButton: function(button) {
      this.selectedButton = button
    },

    createAppWcpConfig: async function() {
      this.loading = true
      let app_id = this.$route.params.appId
      let result = await this.$acs.createAppWcpConfig({
        app_id: app_id,
        menu: ''
      })

      if (result.success) {
        let config = result.wcpconfig
        config.menu = this.fixFullMenu(config.menu)
        this.updateAppWcpConfig(config)
      }

      this.loading = false
    },

    getMenu: async function() {
      this.loading = true
      let response = await this.$acs.getWcpMenu({
        app_id: this.wcpParams.app_id
      })
      if (response.success) {
        this.wcpParams.menu = this.fixFullMenu(response.menu)
        Toast.show(this.$t('admin.wcp.menus.getSuccess'))
      } else {
        processAjaxError(response)
      }
      this.loading = false
    },

    updateMenu: async function() {
      this.loading = true
      let newmenu = JSON.parse(JSON.stringify(this.wcpParams.menu)); //deep copy
      newmenu = JSON.parse(JSON.stringify(this.cleanEmpty(newmenu)).replace(/null,/g, '').replace(
        /,null/g, ''))

      let response = await this.$acs.updateWcpMenu({
        app_id: this.wcpParams.app_id,
        menu: newmenu
      })
      if (response.success) {
        Toast.show(this.$t('admin.wcp.menus.updateSuccess'))
      } else {
        processAjaxError(response)
      }

      this.loading = false
    },

    cleanEmpty: function(obj) {
      for (var i in obj) {
        var value = obj[i];
        if ((typeof value === 'object') && !Array.isArray(value)) {
          if (!value["name"] || value["name"].trim() === '') {
            delete obj[i];
          }
        }
        if (typeof value === 'object') {
          if (Array.isArray(value)) {
            if (value.length == 0) {
              delete obj[i];
              continue;
            }
          }
          value = this.cleanEmpty(value);
          if (this.isEmpty(value)) {
            delete obj[i];
          }
        } else {
          if (value === null || value === undefined || value === '') {
            delete obj[i];
          }
        }
      }
      return obj;
    },

    isEmpty: function(object) {
      for (var name in object) {
        return false;
      }
      return true;
    },

    fixFullMenu: function(obj) {
      if (obj) {
        obj.button[0] = this.fixMenu(obj.button[0]);
        obj.button[1] = this.fixMenu(obj.button[1]);
        obj.button[2] = this.fixMenu(obj.button[2]);
      } else {
        obj = {
          "button": []
        }
        for (var i = 0; i < 3; i++) {
          let newmenu = JSON.parse(JSON.stringify(this.subMenuModel)); //deep copy
          obj.button.push(newmenu);
        }
      }
      return obj;
    },

    fixMenu: function(obj) {
      if (obj) {
        let sub_button = obj.sub_button;
        if (sub_button && Array.isArray(sub_button)) {
          let ml = 5 - sub_button.length;
          if (ml > 0) {
            for (var i = 0; i < ml; i++) {
              let temp = {
                type: '',
                name: '',
                key: '',
                url: ''
              };
              sub_button.unshift(temp);
            }
          }
        } else {
          let nm = JSON.parse(JSON.stringify(this.subMenuModel.sub_button)); //deep copy
          obj.push(nm)
        }
      } else {
        let newmenu = JSON.parse(JSON.stringify(this.subMenuModel)); //deep copy
        obj = newmenu;
      }
      return obj;
    },
  },

  watch: {
    selected: function(val) {
      this.selectedButton.type = val
    }
  },
}
</script>
<style scoped>
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";
  filter: alpha(opacity=80);
}

.gu-hide {
  display: none !important;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.gu-transit {
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}
</style>