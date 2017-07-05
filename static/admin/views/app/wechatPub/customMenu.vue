<template>
  <div class="columns">
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
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
          </tr>
          <tr>
            <td style="font-size:9pt;">二级菜单No.2</td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
          </tr>
          <tr>
            <td style="font-size:9pt;">二级菜单No.3</td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
          </tr>  
          <tr>
            <td style="font-size:9pt;">二级菜单No.4</td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
          </tr>
          <tr>
            <td style="font-size:9pt;">二级菜单No.5</td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
            <td><input class="input" type="text"></td>
          </tr> 
          <tr>
            <td style="font-size:9pt;">一级菜单按钮</td>
            <td><input class="input" type="text" value="菜单1"></td>
            <td><input class="input" type="text" value="菜单2"></td>
            <td><input class="input" type="text" value="菜单3"></td>
          </tr>                                           
        </tbody>
      </table>
    </div>
    <div class="column is-4">
      <label style="is-bold">按钮其他参数</label>
      <div>名称:<input class="input" type="text" value="菜单1"></div>
      <div>类型:<input class="input" type="text" value="菜单1"></div>
      <div>Key:<input class="input" type="text" value="菜单1"></div>
      <div>Url:<input class="input" type="text" value="菜单1"></div>
      <label style="font-size:10pt;">如果有下级菜单请忽略上述类型和Key、Url等参数。</label>
    </div>
    <div class="tile is-full has-text-centered">
      <p style="margin: 5px auto">
        <input type="submit" style="display: inline-block; font-size: 1rem;" value="$t('admin.wcp.btnTitle')"
          class="button is-primary" class="processing || $v.$invalid ? 'is-disabled' : ''" :disabled="$v.$invalid"
        />
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