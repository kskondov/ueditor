<template>
<div class='text-editable'>
  <slot>

  </slot>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
    ...mapGetters(['isActive'])
    },
    mounted () {
      for(let i =0; i<this.$el.children.length; i+=1){
        if(this.isActive){
          this.$el.children[i].setAttribute('contenteditable', false)
          }else {
          this.$el.children[i].setAttribute('contenteditable', true)
        }
      }
    }
  }
</script>
