<template>
  <modal ref="modal" :visible="visible">
    <div class="tile box is-ancestor is-vertical" style="padding: 10px; margin: 0">
      <div class="tile is-parent border-horizontal" style="padding: 0 0 10px 0">
        <div class="tile is-child is-3">
          <file-upload class="file-upload" ref="upload" name="file" :drop="true" :multiple="true" :post-action="params.action" :accept="params.accept"
            :extensions="params.extensions" :header="params.headers" @addFileUpload="addFileUpload" @afterFileUpload="afterFileUpload"></file-upload>
        </div>
        <div v-if="files&&files.length" class="tile is-child is-8 is-vertical">
          <div class="columns" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{$t('forum.upload.filename')}}:</label>
            </div>
            <div class="column is-9">
              <label v-for="item in files" class="label">{{ item.name }}</label>
            </div>
          </div>
          <div class="columns" v-if="file && file.active" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{$t('forum.upload.progress')}}:</label>
            </div>
            <div class="column is-9">
              <progress class="progress is-small is-primary" style="margin-top: 5px" :value="file.progress" max="100"> {{ file.progress }}%</progress>
            </div>
          </div>
          <div class="columns" v-if="file && file.active" style="margin-bottom: 0">
            <div class="column is-3">
              <label class="label pull-right">{{$t('forum.upload.speed')}}:</label>
            </div>
            <div class="column is-9">
              <label class="label">{{ file.speed | downLoadSpeedStr }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="container menu-panel" style="margin-top: 10px">
        <a class="button is-primary is-small is-outlined" :class="{'is-disabled': files&&files.length ? file&&file.success || file&&file.active : true, 'is-loading': upload ? upload.active : false}"
          @click="upload.active = true">
          <span class="icon is-small"><i class="fa fa-upload" aria-hidden="true"> </i></span>
          <span>{{ $t('forum.upload.title') }}</span>
          </a>
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
      params: {
        type: Object,
        default: {},
      }
    },
    computed: {
      file() {
        let curFile = null
        this.files.forEach(file => {
          if (file.active) {
            curFile = file
          }
        })
        return curFile
      }
    },
    data: function () {
      return {
        files: [],
        upload: undefined,
        modal: undefined,
        callback: undefined,
        visible: false,
      }
    },
    mounted() {
      this.files = []
      this.upload = this.$refs.upload
      this.modal = this.$refs.modal
    },
    methods: {
      addFileUpload: function (file, upload) {
        let newFile = true
        this.files.forEach(
          (item) => {
            if (item.name == file.name) {
              newFile = false
              return
            }
          }
        )
        newFile ? this.files.push(file) : ''
        this.upload = upload
      },

      afterFileUpload(file, component) {
        let response = this.file.data
        let errno = this.file.errno

        this.files = this.files.filter((item, index) => {
          return item.name != file.name
        })

        if (typeof (this.callback) == 'function') {
          if (!errno) {
            this.callback({
              code: 0,
              data: {
                id: 'imgname',
                url: 'http://img0.imgtn.bdimg.com/it/u=3156638004,2702203078&fm=23&gp=0.jpg',
              }
            })
          } else {
            this.callback(response)
          }
        }
        if (!this.files || !this.files.length) {
          if (this.upload) {
            this.upload.files = []
            this.modal.deactive()
          }
        }
      },
    },

    components: {
      fileUpload: require('./fileUpload.vue'),
      Modal
    }
  }
</script>
<style lang="scss">
  .file-upload {
    display: block;
  }
  
  .file-upload span {
    display: block;
    font-size: 18px;
    padding: 1em;
    font-weight: bold;
    border: 1px solid #888;
  }
  
  .drop-active {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
    opacity: .4;
    background: #000;
  }
  
  .menu-panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>