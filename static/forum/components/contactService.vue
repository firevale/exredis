<template>
  <div class="content-item">
    <div class="row-menu" style="padding-top: 2rem; position: relative;">
      <i class="fa fa-pencil-square-o" style="display: none;" :class="{'pencil-icon': showIcon}" aria-hidden="true"></i>
      <textarea v-model="message" class="issue-content" :class="{'writeIcon': showIcon}" :placeholder="$t('forum.customService.contactPlaceHolder')"
        @focus="showIcon=false" @blur="checkIcon">
      </textarea>
    </div>
    <div class="row-menu">
      <input class="submit-btn" type="button" :value="$t('forum.customService.submitBtn')"></input>
    </div>
    <div class="bottom-box row-menu">
      <div class="bottom-contact">
        <div>官方热线 : <span>010-23456789</span></div>
        <div>官方主页 : <span>firevale.qs.com</span></div>
        <div>微信公众号 : <span>firevale</span></div>
      </div>
      <div class="bottom-contact">
        <div>官方论坛 : <span>firevale.qs.it.com</span></div>
        <div>官方贴吧 : <span>枪神默示录</span></div>
        <div>官方微博 : <span>枪神默示录</span></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        showIcon: true,
        message: '',
      }
    },
    computed:{
      
    },
    methods:{
      checkIcon(){
        if(this.message){
          this.showIcon=false
        }else{
          this.showIcon=true
        }
      },
    }
  }
</script>
<style lang="scss">
  @import "../scss/forum";
  .issue-content {
    resize: vertical;
    flex: 1;
    height: 18rem;
    padding: 1rem 1rem;
    font-size: 1.2rem;
  }
  
  .writeIcon {
    padding: 1rem 4rem;
  }
  
  .pencil-icon {
    display: block !important;
    position: absolute;
    top: 3rem;
    left: 1rem;
    font-size: 2rem !important;
    color: $dark;
  }
  
  .submit-btn {
    background: $primary;
    color: $white;
    font-size: 1.3rem;
    padding: 1rem 12rem;
  }
  
  .bottom-box {
    background: $text-grey;
    margin: 3rem .1rem .1rem .1rem;
    height: 10rem;
  }
  
  .bottom-contact {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span {
      color: $link;
    }
  }
</style>