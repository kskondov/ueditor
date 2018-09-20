<template>
    <div class='image-editable'>
      <vue-dropzone
        v-if="!isActive"
        :class="{ active: isActive }"
        ref="myVueDropzone" id="imageTest"
        :options="dropzoneOptions"
      ></vue-dropzone>
      <slot>

      </slot>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vueDropzone from 'vue2-dropzone'

export default {
  components:{
    vueDropzone
  },
  computed: {
    ...mapGetters(['editedContent', 'isActive'])
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 760,
        maxFilesize: 0.5,
        maxFiles: 1,
        headers: { 'My-Awesome-Header': 'header value' }
      }
    }
  },
}

</script>

<style>
  .active{
    display: none;
  }
</style>
