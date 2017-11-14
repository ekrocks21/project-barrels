<template>
  <v-container>
     <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
  <v-card raised class="mt-5 mb-5">
  <div style="background-color: #ffffff">
    <v-layout row ml-4 mr-4>
      <v-flex xs12  mt-4 mb-2>
        <h4 class=" headline" style="color: #212121; font-family: 'Product Sans'" >Create a Shop</h4>
      </v-flex>
    </v-layout>
    </div>
    <v-divider></v-divider>
    <v-layout row ml-4 mr-4 mt-5>
      <v-flex xs12>
        <form @submit.prevent="onCreateShop">
          <v-layout row ml-4 mr-4>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="shopName"
                label="Shop Name"
                id="shopName"
                v-model="shopName"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row ml-4 mr-4>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="tagLine"
                label="Tagline"
                id="tagLine"
                v-model="tagLine"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row ml-4 mr-4>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row ml-4 mr-4>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"></v-text-field>
            </v-flex>
          </v-layout>
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
          <v-layout row ml-4 mr-4>
            <v-flex xs12 sm6 offset-sm3>
              <v-checkbox 
              v-bind:label="`I Agree to the Terms and Conditions`" v-model="shopTerms" 
              id="shopTerms"
              name="shopTerms"
              required
              info></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row ml-4 mr-4>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="secondary mb-5"

                :disabled="!formIsValid"
                type="submit">Create Shop</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        shopName: '',
        tagLine: '',
        description: '',
        location: '',
        imageUrl: '',
        shopTerms: false,
        image: null
      }
    },
    props: ['id'],
    computed: {
      formIsValid () {
        return this.shopName !== '' &&
          this.shopTerms !== false
      }
    },
    methods: {
      onCreateShop () {
        if (!this.formIsValid) {
          return
        }
        const shopData = {
          shopName: this.shopName,
          tagLine: this.tagLine,
          description: this.description,
          location: this.location,
          image: this.image
        }
        this.$store.dispatch('createShop', shopData)
        this.$router.push('/profile/' + this.$store.getters.user.id)
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
