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
                </v-card-media></router-link>
                <v-card-actions class="pa-1">
                <div id="shop-title-card">
                  <router-link 
                  style="text-decoration: none" 
                  :to="'/shops/' + shop.id">
                    <v-card-title 
                    id="shop-title"
                    style="font-size:16px; 
                    font-family: 'Product Sans'">
                    {{ shop.shopName }}
                    </v-card-title>
                  </router-link>  
                </div> 
                <v-spacer></v-spacer>
                <v-dialog v-model="donationsDialog" lazy absolute>
                    <v-btn v-tooltip:left="{ html: 'donations earned' }" class="secondary--text" slot="activator" flat><v-icon left class="secondary--text">loyalty</v-icon> $3000</v-btn>
                      <v-card>
                        <v-card-title>
                          <v-btn @click.native="donationsDialog = false" flat small style="text-transform: none; font-size: 18px; font-weight: 400"><v-icon left>info_outline</v-icon>About Donations</v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="primary--text">Each purchase via <span style="font-family:'Product Sans'; color: #212121; font-weight:600; font-size: 16px">GOOD Influence</span> earns a donation.
                        </v-card-text>
                        <v-card-text class="primary--text">It's simple - you shop, we earn a commission from Amazon, and then we donate it, <span style="font-weight:600; color: #212121; font-size: 16px; font-family:'Product Sans'">100%.</span>
                        </v-card-text>
                <v-card-actions>

                  <v-spacer></v-spacer>
                  <v-btn class="secondary--text" flat="flat" @click.native="donationsDialog = false">Do Good, Easily</v-btn>
                </v-card-actions>
              </v-card>
           </v-dialog>
            
            </v-card-actions>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-divider></v-divider>
                <v-card-actions class="pt-1 pb-1 pl-0" style="background-color: #ffffff">
              <follow-dialog
                :shopId="shop.id"
                v-if="userIsAuthenticated">
              </follow-dialog>
                 <v-spacer></v-spacer>
                  <v-btn :to="'/shops/' + shop.id"
                    icon
                    style="cursor: pointer;" 
                    class="secondary--text">
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
    data () {
      return {
        donationsDialog: false
      }
    },
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

#shop-title-card {
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#header-link {
    text-decoration: none;
}

#header-link:hover {
    text-decoration: underline;
}

#shop-title {
  text-transform: capitalize;
}

</style>