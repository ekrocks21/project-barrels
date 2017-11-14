<template>
  <v-container fluid>
  <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="secondary--text mt-5"
          :width="5"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
  <v-layout 
  v-else 
  row wrap >
      <v-flex xs12 sm4
        v-for="shop in featuredShops" 
        :key="shop.id" 
        class="mb-2 mt-5">
        <router-link style="text-decoration: none" :to="'/shops/' + shop.id"><v-card hover style="margin:10px"> 
            <v-layout row>
              <v-flex xs12>  
                <v-card-media
                  :src="shop.imageUrl"
                  height="200px">
                </v-card-media>
                <v-card-text>
                <div style="font-size:20px; font-family: 'Product Sans'">{{ shop.shopName }}</div>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-card-actions style="background-color: #fafafa">
                 <v-spacer></v-spacer>
                  <v-btn :to="'/shops/' + shop.id"
                    icon
                    style="cursor: pointer;" 
                    v-bind:ripple="{ class: 'info--text' }">
                  <v-icon class="primary--text">chevron_right</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
        </v-card></router-link>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      featuredShops () {
        return this.$store.getters.featuredShops
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script> 