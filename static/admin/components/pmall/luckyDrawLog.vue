<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <div class="columns is-gapless has-text-centered" style="border-bottom: 1px solid #ccc; padding:5px; color:#aaa;">
            <div class="column">
              <p>{{ $t('admin.point.draw.name')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.draw.num')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.draw.rate')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.draw.edit')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.draw.delete')}}</p>
            </div>
          </div>
          <div v-if="draws">
            <div class="columns has-text-centered" style="border-bottom: 1px solid #ccc;" v-show="draws && draws.length > 0"
              v-for="(draw, index) in draws" :key="draw.id">
              <div class="column">
                <p>{{ draw.name }}</p>
              </div>
              <div class="column">
                <p>{{ draw.num }}</p>
              </div>
              <div class="column">
                <p>{{ draw.rate }}</p>
              </div>
              <div class="column">
                <a @click.prevent="editDraw(draw, index)">
                  <i class="fa fa-pencil"></i>
                </a>
              </div>
              <div class="column">
                <a @click.prevent="delDraw(draw.id, index)">
                  <i class="fa fa-trash-o"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  i18n
} from 'admin/vue-i18n'

import {
  showMessageBox
} from 'admin/components/dialog/messageBox'

import {
  showImageUploadDialog
} from 'common/components/imageUpload'

import drawDialog from 'admin/components/dialog/point/luckyDraw'
const drawDialogComponent = Vue.extend(drawDialog)

const openDrawDialog = (propsData = {
  visible: true
}) => {
  return new drawDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

export default {
  data() {
    return {
      draws: [],
      picWidth: 300,
      picHeight: 400,
      processing: false
    }
  },

  created: function() {
    this.getDraws()
  },

  methods: {
    getDraws: async function() {
      this.processing = true
      let result = await this.$acs.listPmallDraws()
      if (result.success) {
        this.draws = result.draws
      }
      this.processing = false
    },

    updateDrawPic: function(draw) {
      showImageUploadDialog(this.$i18n, {
        postAction: '/admin_actions/pmall/upload_draw_pic',
        width: this.picWidth,
        height: this.picHeight,
        data: {
          draw_id: draw.id
        },
        headers: {
          'x-csrf-token': window.acsConfig.csrfToken
        },
        extensions: ['png', 'jpg', 'jpeg'],
        title: this.$t('admin.titles.uploadDrawPic', {
          picWidth: this.picWidth,
          picHeight: this.picHeight
        }),
        callback: response => draw.pic = response.pic,
      })
    },

    editDraw: function(draw, index) {
      openDrawDialog({
        draw: draw,
        visible: true,
        callback: result => {
          this.draws[index] = result
        },
      })
    },

    delDraw: function(drawId, index) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.point.draw.confirmDelete'),
        type: 'danger',
        onOK: async _ => {
          this.processing = true
          let result = await this.$acs.deletePmallDraw({
            draw_id: drawId,
          }, this.$t('admin.point.draw.deleted'))
          if (result.success) {
            this.draws.splice(index, 1)
          }
          this.processing = false
        },
      })
    },

    addNewDraw: function() {
      if (this.draws.length >= 8) {
        alert("只能设置8个奖品");
      } else {
        openDrawDialog({
          draw: {
            id: '0',
            name: '',
            pic: '',
            num: '',
            rate: '',
            app_id: this.$route.params.appId
          },
          visible: true,
          callback: result => {
            this.draws.unshift(result)
          },
        })
      }
    },
  },
}
</script>