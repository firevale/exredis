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
        <li>如果要快速看到微信上的菜单最新状态，需要重新关注，否则需要静静等待N小时</li>
      </ul>
    </div>
    <div class="column is-8" style="padding:10px;">
      <div class="columns is-multiline" style="border:1px #ccc solid; margin:3px;">
        <div class="column is-2"></div>
        <div class="column is-10">
          <div class="columns">
            <div class="column">第一列</div>
            <div class="column">第二列</div>
            <div class="column">第三列</div>
          </div>
        </div>
        <div class="column is-2" style="font-size:10pt; line-height:450%;">
          <ul>
            <li>二级菜单No.1</li>
            <li>二级菜单No.2</li>
            <li>二级菜单No.3</li>
            <li>二级菜单No.4</li>
            <li>二级菜单No.5</li>
            <li>一级菜单按钮</li>
          </ul>
        </div>
        <div class="column is-10">
          <div class="columns is-multiline" v-if="wcpParams.menu">
            <div class="column is-one-third">
              <div class="column" v-for="(button, index) in wcpParams.menu.button[0].sub_button">
                <input class="input" type="text" @click.prevent="setCurrentButton(button)" v-model.trim="button.name">
              </div>
              <div class="column">
                <input class="input" type="text" @click.prevent="setCurrentButton(wcpParams.menu.button[0])" v-model.trim="wcpParams.menu.button[0].name">
              </div>
            </div>
            <div class="column is-one-third">
              <div class="column" v-for="(button, index) in wcpParams.menu.button[1].sub_button">
                <input class="input" type="text" @click.prevent="setCurrentButton(button)" v-model.trim="button.name">
              </div>
              <div class="column">
                <input class="input" type="text" @click.prevent="setCurrentButton(wcpParams.menu.button[1])" v-model.trim="wcpParams.menu.button[1].name">
              </div>
            </div>
            <div class="column is-one-third">
              <div class="column" v-for="(button, index) in wcpParams.menu.button[2].sub_button">
                <input class="input" type="text" @click.prevent="setCurrentButton(button)" v-model.trim="button.name">
              </div>
              <div class="column">
                <input class="input" type="text" @click.prevent="setCurrentButton(wcpParams.menu.button[2])" v-model.trim="wcpParams.menu.button[2].name">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-4">
      <div class="field has-addons">
        <label style="font-weight:bold;">{{ $t('admin.wcp.menus.params') }}</label>
      </div>
      <div class="field has-addons">
        <label class="label">{{ $t('admin.wcp.menus.name') }}：</label>
        <p class="control">
          <input class="input is-small" style="width:200px;" type="text" v-model.trim="selectedButton.name">
        </p>
      </div>
      <div class="field has-addons" v-if="selectedButton.type">
        <label class="label">{{ $t('admin.wcp.menus.type') }}：</label>
        <p class="control">
          <span class="select is-media">
            <select v-model="selectedButton.type">
              <option v-for="option in options" v-bind:value="option.value">
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
    </div>
    <div class="column is-12 has-text-centered">
      <p style="margin: 5px auto">
        <input type="button" style="display: inline-block; font-size: 1rem;" :value="$t('admin.wcp.btnGetMenu')"
          class="button is-primary" :class="loading ? 'is-disabled' : ''" @click.prevent="getMenu()" />
        <input type="button" style="display: inline-block; font-size: 1rem;" :value="$t('admin.wcp.btnUpdateMenu')"
          class="button is-primary" :class="loading ? 'is-disabled' : ''" @click.prevent="updateMenu()"
        />
      </p>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  processAjaxError
} from 'admin/miscellaneous'

import Toast from 'common/components/toast'

export default {
  mounted: async function() {
    this.addWcpEmptyParams()
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
      options: [{
          text: '点击事件(传回服务器)',
          value: 'click'
        },
        {
          text: '访问网页(直接跳转)',
          value: 'view'
        }
      ],
      menuModel: {
        "button": [{
            "name": "主菜单1",
            "sub_button": [{
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              }
            ]
          },
          {
            "name": "主菜单2",
            "sub_button": [{
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              }
            ]
          },
          {
            "name": "主菜单3",
            "sub_button": [{
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              },
              {
                "type": "click",
                "name": "",
                "key": ""
              }
            ]
          }
        ]
      },
    }
  },
  methods: {
    ...mapActions([
      'updateWcpParams',
    ]),

    setCurrentButton: function(button) {
      this.selectedButton = button
    },

    addWcpEmptyParams: async function() {
      this.loading = true
      let app_id = this.$route.params.appId
      let result = await this.$acs.addWcpEmptyParams({
        app_id: app_id,
        menu: this.menuModel
      })

      if (result.success) {
        this.updateWcpParams(result.wcpconfig)
      }

      this.loading = false
    },

    getMenu: async function() {
      this.loading = true
      let result = await this.$acs.getWcpMenu({
        app_id: this.wcpParams.app_id
      })
      alert(result)
      console.log("-----------------getMenu:" + result)
      this.loading = false
    },

    updateMenu: async function() {
      this.loading = true
      let result = await this.$acs.update_wcp_menu({
        app_id: this.wcpParams.app_id,
        menu: this.wcpParams.menu
      })
      alert(result)
      console.log("-----------------getMenu:" + result)
      this.loading = false
    },
  },

  watch: {
    selected: function(val) {
      this.selectedButton.type = val
    }
  },
}
</script>