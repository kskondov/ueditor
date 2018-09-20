export const UMixins = {
  methods: {
    async GetPropByString(obj, propString, value) {
      if (!propString) {
        return obj
      }
      let prop
      let props = propString.split('.')
      if (props.length > 1) {
        this.editedContent.slider[props[1]].src = value
      } else {
        for (var i = 0, iLen = props.length - 1; i < iLen; i++) {
          prop = props[i]

          var candidate = obj[prop]

          if (candidate !== undefined) {
            obj = candidate
          } else {
            break
          }
        }
      }
      obj[props[i]] = value
      // this.$store.dispatch('saveEditedContent', this.editedContent)
      return obj
    },
    getProperty(propertyName, object) {
      let parts = propertyName.split('.')
      let length = parts.length
      let property = object || this
      for (let i = 0; i < length; i++) {
        property = property[parts[i]]
      }
      return property
    },
    async getThumbnails() {
      const thumbs = await document.querySelectorAll('.image-editable')
      for (let i = 0; i < thumbs.length; i++) {
        let thumbName = thumbs[i].dataset.name
        let splittedThumbs = thumbName.split('.')
        let imageNode = document.createElement('img')
        if (splittedThumbs.length > 1) {
          imageNode.src = (this.getProperty(thumbName, this.editedContent).src)
          thumbs[i].firstChild.appendChild(imageNode)
        } else if (splittedThumbs.length === 1) {
          imageNode.src = this.editedContent[thumbName]
          thumbs[i].firstChild.appendChild(imageNode)
        }
      }
    }
  }
}
