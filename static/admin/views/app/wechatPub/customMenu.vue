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
      <table class="table is-bordered is-narrow goods-table">
        <thead>
          <tr>
            <th></th>
            <th>第一列</th>
            <th>第二列</th>
            <th>第三列</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="font-size:10pt;">二级菜单No.1</td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
          </tr>
          <tr>
            <td style="font-size:9pt;">二级菜单No.2</td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
          </tr>
          <tr>
            <td style="font-size:9pt;">二级菜单No.3</td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
          </tr>
          <tr>
            <td style="font-size:9pt;">二级菜单No.4</td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
          </tr>
          <tr>
            <td style="font-size:9pt;">二级菜单No.5</td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
            <td>
              <input class="input" type="text">
            </td>
          </tr>
          <tr>
            <td style="font-size:9pt;">一级菜单按钮</td>
            <td>
              <input class="input" type="text" value="菜单1">
            </td>
            <td>
              <input class="input" type="text" value="菜单2">
            </td>
            <td>
              <input class="input" type="text" value="菜单3">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="column is-4">
      <div class="field has-addons">
        <label style="font-weight:bold;">{{ $t('admin.wcp.menus.params') }}</label>
      </div>
      <div class="field has-addons">
        <label class="label">{{ $t('admin.wcp.menus.name') }}：</label>
        <p class="control">
          <input class="input is-small" style="width:200px;" type="text" value="">
        </p>
      </div>
      <div class="field has-addons">
        <label class="label">{{ $t('admin.wcp.menus.type') }}：</label>
        <p class="control">
          <span class="select is-media">
            <select>
              <option value="click">  点击事件(传回服务器)  </option>
              <option value="url">  访问网页(直接跳转)  </option>
            </select>
          </span>
        </p>
      </div>
      <div class="field has-addons">
        <label class="label">{{ $t('admin.wcp.menus.key') }}：</label>
        <p class="control">
          <input class="input is-small" type="text" style="width:200px;" value="">
        </p>
      </div>
      <div class="field has-addons">
        <label class="label">{{ $t('admin.wcp.menus.url') }}：</label>
        <p class="control">
          <input class="input is-small" type="text" style="width:200px;" value="">
        </p>
      </div>
      <label style="font-size:10pt;">{{ $t('admin.wcp.menus.tip') }}</label>
    </div>
    <div class="column is-12 has-text-centered">
      <p style="margin: 5px auto">
        <input type="submit" style="display: inline-block; font-size: 1rem;" :value="$t('admin.wcp.btnGetMenu')"
          class="button is-primary" :class="loading ? 'is-disabled' : ''" />
        <input type="submit" style="display: inline-block; font-size: 1rem;" :value="$t('admin.wcp.btnUpdateMenu')"
          class="button is-primary" :class="loading ? 'is-disabled' : ''" />
      </p>
    </div>
  </div>
</template>
<script>
import {
  mapActions
} from 'vuex'
export default {
  data() {
    return {
      menus: {
        "button": [{
            "type": "click",
            "name": "",
            "key": "V1001_TODAY_MUSIC"
          },
          {
            "name": "菜单",
            "sub_button": [{
                "type": "view",
                "name": "搜索",
                "url": "http://www.soso.com/"
              },
              {
                "type": "view",
                "name": "视频",
                "url": "http://v.qq.com/"
              },
              {
                "type": "click",
                "name": "赞一下我们",
                "key": "V1001_GOOD"
              }
            ]
          }
        ]
      },
      page: 1,
      total: 1,
      recordsPerPage: 10,
      loading: true
    }
  },
  methods: {}
}
</script>