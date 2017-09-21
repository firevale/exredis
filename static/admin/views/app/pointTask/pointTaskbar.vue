<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-vertical">
      <article class="tile is-child is-12">
        <div class="column">
          <a class="button is-primary" style="min-width: 100px" @click="addNewTaskBar">
            <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.point.task.add') }}
          </a>
        </div>
      </article>
      <article class="tile is-child is-12">
        <div class="table-responsive">
          <div class="columns is-gapless has-text-centered" style="border-bottom: 1px solid #ccc; padding:5px; color:#aaa;">
            <div class="column">
              <p>{{ $t('admin.point.task.pic') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.task.name') }}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.task.point')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.task.active')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.task.edit')}}</p>
            </div>
            <div class="column">
              <p>{{ $t('admin.point.task.delete')}}</p>
            </div>
          </div>
          <div v-if="taskBars">
            <div v-dragula="taskBars" bag="taskbar">
              <div class="columns has-text-centered" style="border-bottom: 1px solid #ccc;" v-show="taskBars && taskBars.length > 0"
                v-for="(taskBar, index) in taskBars" :key="taskBar.id">
                <div class="column">
                  <center>
                    <figure class="image news-pic" @click="updateTaskPic(taskBar)">
                      <img :src="taskBar.pic ? taskBar.pic: 'https://placehold.it/144x144?text=144X144'" style="max-height:60px; width:auto; "></img>
                    </figure>
                  </center>
                </div>
                <div class="column">
                  <p>{{ taskBar.name }}</p>
                </div>
                <div class="column">
                  <p>{{ taskBar.point }}</p>
                </div>
                <div class="column">
                  <center>
                    <toggle-button :value="taskBar.active" color="#4e9ed8" :sync="true" :labels="{checked: $t('admin.newSwitchOn'), unchecked: $t('admin.newSwitchOff')}"
                      @change="toggleTaskBar(taskBar)"> </toggle-button>
                  </center>
                </div>
                <div class="column">
                  <a @click.prevent="editTaskBar(taskBar, index)">
                  <i class="fa fa-pencil"></i>
                </a>
                </div>
                <div class="column">
                  <a @click.prevent="delTaskBar(taskBar.id, index)">
                  <i class="fa fa-trash-o"></i>
                </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

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

import taskBarDialog from 'admin/components/dialog/point/taskBar'
const taskBarDialogComponent = Vue.extend(taskBarDialog)

const openTaskBarDialog = (propsData = {
  visible: true
}) => {
  return new taskBarDialogComponent({
    i18n,
    el: document.createElement('div'),
    propsData
  })
}

export default {
  data() {
    return {
      taskBars: [],
      oldSorts: [],
      picWidth: 144,
      picHeight: 144,
      processing: false
    }
  },

  created: function() {
    this.getTaskBars()
    Vue.vueDragula.options("taskbar", {
      direction: 'vertical',
      copy: false
    })
    Vue.vueDragula.eventBus.$on(
      'dropModel',
      (args) => {
        let needChange = ''
        for (var i = 0; i < this.taskBars.length; i++) {
          if (this.oldSorts[i] != this.taskBars[i].sort) {
            needChange += this.taskBars[i].id + '=' + this.oldSorts[i] + ','
            this.taskBars[i].sort = this.oldSorts[i]
          }
        }
        this.changeTaskBarsSort(needChange)
      }
    )
  },

  methods: {
    getTaskBars: async function() {
      this.processing = true
      let result = await this.$acs.getTaskList()
      if (result.success) {
        this.taskBars = result.tasks
        for (var i = 0; i < this.taskBars.length; i++) {
          this.oldSorts.push(this.taskBars[i].sort)
        }
      }
      this.processing = false
    },

    changeTaskBarsSort: async function(needChange) {
      this.processing = true
      let result = await this.$acs.changeTaskBarsSort(needChange)
      this.processing = false
    },

    editTaskBar: function(taskBar, index) {
      openTaskBarDialog({
        taskBar: taskBar,
        visible: true,
        callback: result => {
          this.taskBars[index] = result
        },
      })
    },

    delTaskBar: function(taskBarId, index) {
      showMessageBox({
        visible: true,
        title: this.$t('admin.titles.warning'),
        message: this.$t('admin.point.task.confirmDeleteTask'),
        type: 'danger',
        onOK: async _ => {
          this.processing = true
          let result = await this.$acs.deleteTaskBar({
            task_id: taskBarId,
          }, this.$t('admin.point.task.configDeleted'))
          if (result.success) {
            this.taskBars.splice(index, 1)
          }
          this.processing = false
        },
      })
    },

    toggleTaskBar: async function(taskBar) {
      this.processing = true
      let result = await this.$acs.toggleTaskStatus({
        task_id: taskBar.id,
      }, taskBar.active ? this.$t('admin.point.task.unPublishOK') : this.$t(
        'admin.point.task.publishOk'))
      this.processing = false
      if (result.success) {
        taskBar.active = !taskBar.active
      }
    },

    updateTaskPic: function(taskBar) {
      showImageUploadDialog(this.$i18n, {
        postAction: '/admin_actions/pmall/upload_task_pic',
        width: this.picWidth,
        height: this.picHeight,
        data: {
          task_id: taskBar.id
        },
        extensions: ['png', 'jpg', 'jpeg'],
        title: this.$t('admin.titles.uploadNewsPic', {
          picWidth: this.picWidth,
          picHeight: this.picHeight
        }),
        callback: response => taskBar.pic = response.pic,
      })
    },

    addNewTaskBar: function() {
      openTaskBarDialog({
        taskBar: {
          id: '0',
          pic: '',
          name: '',
          sub_name: '',
          point: '',
          path: '',
          sort: '',
          active: false,
          app_id: this.$route.params.appId
        },
        visible: true,
        callback: result => {
          this.taskBars.push(result)
        },
      })
    },
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