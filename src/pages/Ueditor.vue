<template>
  <div>
    <button
      @click="stateChange(false);"
      v-show="isActive"
      class="edit">Edit edit</button>
    <button
      @click="stateChange(true);"
      v-show="!isActive"
      class="close-editor">Close editor</button>
      <u-image-editable data-name=name>
          <img :src = editedContent.name>
      </u-image-editable>
      <u-text-editable data-name=text1>
        <div>{{editedContent.text1}}</div>
      </u-text-editable>
      <div>
        <u-text-editable data-name=text2>
          <div>{{editedContent.text2}}</div>
        </u-text-editable>
          <u-text-editable data-name=text3>
          <div >{{editedContent.text3}}</div>
          <u-text-editable data-name=text4>
          <div>{{editedContent.text4}}</div>
          </u-text-editable>
        </u-text-editable>
      </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { UMixins } from '@/mixins/UMixins'
  import { UImageEditable } from '@/components/index'
  import { UTextEditable } from '@/components/index'

export default {
  mixins: [UMixins],
  components: {
    UImageEditable,
    UTextEditable,
  },
  data: () => ({
    fire: false,
    editor: {}
  }),
  created () {
    if (this.dispatchOnce === false) {
      this.$store.dispatch('fetchEditedContent', 'new')
      this.$store.dispatch('dispatchOnce', true)
      console.log('The Store is successfully filled with data !!!')
    } else {
      console.log('Dispatched once !!!!')
    }
  },
  computed: {
    ...mapGetters(['editedContent', 'isActive', 'dispatchOnce']),
    ...mapActions(['saveEditedContent', 'changeActive', 'fetchEditedContent'])
  },
  mounted (){
    this.getThumbnails()
  },
  updated (){
    this.getThumbnails()
  },
  methods: {
    async imageSave (state) {
      if (state === true) {
        for (let i = 0; i < document.querySelectorAll('[data-dz-thumbnail]').length; i += 1) {
          const elem = {
            data: await document.querySelectorAll('[data-dz-thumbnail]')[i].src,
            name: await document.querySelectorAll('[data-name]')[i].dataset.name
          }
          this.saveContent(elem)
        }
        this.fire = true
      }
    },
    async textSave (state) {
      let textEditableElements = document.querySelectorAll('[contenteditable]')
      if (state === false) {
        for (let i = 0; i < textEditableElements.length; i += 1) {
          textEditableElements[i].attributes.contenteditable.value = true
        }
      } else {
        for (let i = 0; i < textEditableElements.length; i += 1) {
          textEditableElements[i].attributes.contenteditable.value = false
          const elem = {
            data: await document.querySelectorAll('[contenteditable]')[i].innerText,
            name: await document.querySelectorAll('[contenteditable]')[i].dataset.name
          }
          this.saveContent(elem)
        }
      }
    },
    async saveContent (elem) {
      if (elem) {
        await this.GetPropByString(this.editedContent, elem.name, elem.data)
      } else {
        console.log('NO CHANGE')
      }
    },
    stateChange (state) {
      this.$store.dispatch('changeActive', state)
      this.textSave(state)
      this.imageSave(state)
    }
  }
}
</script>
<style lang="css" scoped>
.container{
  z-index: 2;
}
.dropzone{
  height: 100%;
  width: 80%;
}
.edit, .close-editor{
  z-index: 2;
  top: 0;
  left: 0;
  width: 150px;
  height: 75px;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  position: fixed;
}
.edit{
  background: red;
}
.close-editor{
  background: green;
}
.text-editable, .image-editable{
  padding-left: 400px
}

</style>

