<template>
  <v-container grid-list-sm>
    <router-link id="header-link" to="/shops" ><h3 class="hidden-md-and-up mb-3 ml-3 mt-0 primary--text headline" style="text-align: left">Featured Givers</h3></router-link>
       <router-link id="header-link" to="/shops" > <h3 class="hidden-sm-and-down mb-5 mt-5 primary--text headline" style="text-align: left">Featured Givers</h3></router-link>  
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
        class="mb-5">
       <v-card hover style="margin:10px"> 
            <v-layout row>
              <v-flex xs12>  
                <router-link style="text-decoration: none" :to="'/shops/' + shop.id"> <v-card-media
                  :src="shop.imageUrl"
                  height="200px">
                </v-card-media>
                <v-card-text>
                <div style="font-size:20px; font-family: 'Product Sans'">{{ shop.shopName }}</div>
                </v-card-text></router-link>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-card-actions style="background-color: #ffffff">
                   <follow-dialog
                :shopId="shop.id"
                v-if="userIsAuthenticated">
              </follow-dialog>
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
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['shopId'],
    computed: {
      featuredShops () {
        return this.$store.getters.featuredShops
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script> 

<style scoped>

#header-link {
    text-decoration: none;
}

#header-link:hover {
    text-decoration: underline;
}

</style>