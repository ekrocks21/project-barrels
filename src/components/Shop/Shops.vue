<template>
  <v-container>
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
  row wrap 
  v-for="shop in shops" 
  :key="shop.id" 
  class="mb-2 mt-5">
      <v-flex xs12 sm6 offset-sm3>
        <v-card hover>
          <v-card-title>
          <h5 style="color:#212121; font-size:22px">{{ shop.shopName }}</h5>
          </v-card-title>  
            <v-layout row>
              <v-flex xs12>  
                <v-card-media
                  :src="shop.imageUrl"
                  height="200px">
                </v-card-media>
                <v-card-text>
                <div style="font-size:16px">{{ shop.tagLine }}</div>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-card-actions>
                 <v-spacer></v-spacer>
                  <v-btn flat :to="'/shops/' + shop.id">
                  <v-icon left light>arrow_forward</v-icon>
                    View Shop
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
        </v-card>
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