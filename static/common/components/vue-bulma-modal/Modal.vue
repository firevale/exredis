<template>
  <transition :name="transition" mode="in-out" appear :appear-active-class="enterClass" :enter-active-class="enterClass"
    :leave-active-class="leaveClass" @beforeEnter="beforeEnter" @afterEnter="afterEnter" @beforeLeave="beforeLeave"
    @afterLeave="afterLeave">
    <div :class="classes" v-if="show">
      <div class="modal-background" @click="deactive"></div>
      <slot></slot>
    </div>
  </transition>
</template>
<script>
import BaseModal from './BaseModal'

export default {
  mixins: [BaseModal],

  props: {
    closable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes() {
      return ['modal', 'animated', 'is-active']
    }
  }
}
</script>