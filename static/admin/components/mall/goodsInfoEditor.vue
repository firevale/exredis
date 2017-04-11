<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child">
        <div class="table-responsive" v-if="forum">
          <table class="table is-bordered is-striped is-narrow goods-table">
            <thead v-show="forum.sections && forum.sections.length > 0">
              <tr>
                <th>{{ $t('admin.forum.id') }}</th>
                <th>{{ $t('admin.forum.section.title') }}</th>
                <th>{{ $t('admin.forum.section.sort')}}</th>
                <th>{{ $t('admin.forum.created_at')}}</th>
                <th>{{ $t('admin.forum.active')}}</th>
                <th>{{ $t('admin.forum.edit')}}</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th :colspan="6" style="text-align: center; vertical-align: bottom; height: 60px; border: none">
                  <a class="button is-primary" style="min-width: 100px" @click="addNewSection">
                    <i class="fa fa-plus" style="margin-right: 5px"></i> {{ $t('admin.forum.section.add') }}
                  </a>
                </th>
              </tr>
            </tfoot>
            <tbody v-show="forum.sections && forum.sections.length > 0">
              <tr v-for="(section, index) in forum.sections">
                <td> {{ section.id }} </td>
                <td> {{ section.title }} </td>
                <td> {{ section.sort }} </td>
                <td> {{ section.inserted_at | formatServerDateTime }} </td>
                <td v-if="section.active">正常</td><td v-else>禁用</td>
                <td class="is-icon">
                  <a @click.prevent="editSectionInfo(section, index)">
                    <i class="fa fa-pencil"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
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

  import {
    openNotification,
    processAjaxError
  } from 'admin/miscellaneous'

  import Vue from 'admin/vue-i18n'

  import sectionInfoDialog from 'admin/components/dialog/forum/sectionInfo'
  const sectionInfoDialogComponent = Vue.extend(sectionInfoDialog)

  const openSectionInfoDialog = (propsData = {
    visible: true
  }) => {
    return new sectionInfoDialogComponent({
      el: document.createElement('div'),
      propsData
    })
  }

  import Tooltip from 'vue-bulma-tooltip'

  export default {
    props: {
      forum: Object,
    },

    methods: {

      editSectionInfo: function(section, index) {
        openSectionInfoDialog({
          section: section,
          visible: true,
          callback: new_section => {
            this.forum.sections[index] = new_section
          },
        })
      },

      addNewSection: function() {
        openSectionInfoDialog({
          section: {
            id: '',
            sort: 0,
            title: '',
            active: true,
            forum_id: this.forum.id,
          },
          visible: true,
          callback: section => {
            this.forum.sections.push(section)
          },
        })
      },


    },

    components: {
      Tooltip
    }

  }
</script>
