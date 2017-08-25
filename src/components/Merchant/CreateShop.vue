<template>
  <v-container>
     <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
  <v-card raised class="mt-5 mb-5">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 mt-5 mb-3>
        <h4 class="headline primary--text" style="font-family: 'Product Sans'" >Create a GOOD Influence Shop</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateShop">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="ShopName"
                label="Shop Name"
                id="shopName"
                v-model="shopName"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="tagLine"
                label="Tagline"
                id="tagLine"
                v-model="tagLine"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="location"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="shopImage"
                label="Shop Logo"
                id="shopImage"
                v-model="shopImage"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="shopImage" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="shopHeader"
                label="Shop Header"
                id="shopHeader"
                v-model="shopHeader"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="shopHeader" height="150">
              <v-checkbox 
              v-bind:label="`I Agree to the Terms and Conditions`" v-model="shopTerms" 
              id="shopTerms"
              name="shopTerms"
              info></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="primary mb-5"

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
        shopImage: '',
        shopHeader: '',
        shopTerms: ''
      }
    },
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
          shopImage: this.shopImage,
          shopHeader: this.shopHeader
        }
        this.$store.dispatch('createShop', shopData)
        this.$router.push('/shops')
      }
    }
  }
</script>
