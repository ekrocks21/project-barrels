<template>
  <v-container>
          <v-layout row ml-4 mr-4>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="150" class="mt-3 mb-0 ">
               <v-btn raised small class="primary--text" @click="onPickFile">Upload Image</v-btn>
                <input 
                type="file" 
                style="display: none" 
                ref="fileInput" 
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>      
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        imageUrl: ''
      }
    },
    props: ['id'],
    computed: {
    methods: {
      onUpdateProfileImage () {
        const giverImageData = {
          image: this.image
        }
        this.$store.dispatch('updateGiverProfileImage', giverImageData)
        this.$router.push('/giver/' + this.$store.getters.user.id)
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please upload a png or jpg file.')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>
