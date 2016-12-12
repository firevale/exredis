<template>
  <div>
    <div class="columns">
      <div class="column is-11">
        <a v-for="item in headerTag" class="button" style="color: {{item.color}}; backgroundColor: {{item.bgColor}}">{{item.name}}</a>
        <span>{{title}}</span>
        <i v-if="hasPicture" class="fa fa-picture-o note-picture"></i>
        <a v-for="item in tailTag" class="button" style="color: {{item.color}}; backgroundColor: {{item.bgColor}}">{{item.name}}</a>
      </div>
    </div>
    <div class="column is-1">{{time}}</div>
  </div>
</template>
<script>
  export default {
    props:{
      tagBgColor:{
        type: String,
        default: '#f00',
      },
      tagColor:{
        type: String,
        default: '#fff',
      },
      itemData:{
        type: Object,
        default: null,
      }
    },

    data: function(){
        return {
            headerTag:[
              {name: '置顶', bgColor: '#f00', color: '#fff'},
              {name: '推荐', bgColor: '#0f0', color: '#fff'},
              ],
            title: '【游戏攻略】新手练级指南',
            hasPicture: true,
            tailTag:[
              {name: '精', bgColor: '#ff0', color: '#fff'},
              {name: 'HOT', bgColor: '#f00', color: '#fff'},
            ],
            author: '火谷测试',
            time: '2分钟前',
            noteCount: '2/11',
        }
    },
  }
</script>
<style lang="scss">
  .note-picture{
    color: green;
  }
</style>