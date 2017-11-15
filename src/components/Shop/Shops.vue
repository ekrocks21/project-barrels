<template>
  <v-container grid-list-md class="mt-5">
    <h3 class="hidden-md-and-up mb-3 ml-3  primary--text headline" style="text-align: left">Featured Shops</h3>
        <h3 class="hidden-sm-and-down mt-3 mb-5 ml-3 primary--text headline" style="text-align: left">Featured Shops</h3>
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
        v-for="shop in shops" 
        :key="shop.id" 
        class="mb-2">
        <router-link :to="'/shops/' + shop.id" style="text-decoration: none"> <v-card hover style="margin:10px"> 
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
                  <v-icon class="secondary--text">launch</v-icon>
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
      shops () {
        return this.$store.getters.loadedShops
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>