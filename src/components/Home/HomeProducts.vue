<template>
  <v-container grid-list-sm>
      <router-link 
      id="header-link" 
      to="/shops">
        <h3 
        class="hidden-md-and-up mb-3 ml-3 mt-0 primary--text headline" 
        style="text-align: left">
        Featured Products
        </h3>
      </router-link>

      <router-link 
      id="header-link" 
      to="/shops"> 
        <h3 
        class="hidden-sm-and-down mb-5 mt-5 primary--text headline" 
        style="text-align: left">
        Featured Products
        </h3>
      </router-link> 
   <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="secondary--text mt-5"
          :width="5"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>   
 
  <v-layout v-else  row wrap>
      <v-flex xs12 sm4
        v-for="product in products" 
        :key="product.id" 
        class="mb-5">
        <v-card 
        hover 
        style="margin:10px">
                <a v-bind:href="product.productUrl" 
                style="text-decoration: none"
                target="blank">
                  <v-card-media
                    :src="product.productImageUrl"
                    height="200px">
                  </v-card-media>
                </a>

                  <v-card-actions class="pa-1">
                    <div id="products-title-card">
                     <a id="product-link" v-bind:href="product.productUrl" 
                     
                     target="blank"> 
                      <v-card-title
                      class="primary--text" 
                      style="font-size:16px">
                      {{ product.productName }}
                      </v-card-title>
                     </a>
                    </div>  
                    <v-spacer></v-spacer>

                    <v-dialog v-model="donationsDialog" lazy absolute>
                      <v-btn v-tooltip:left="{ html: 'donations earned' }" class="secondary--text" slot="activator" flat><v-icon left class="secondary--text">loyalty</v-icon> $3000</v-btn>
                        <v-card>
                         <v-card-title>
                            <v-btn @click.native="donationsDialog = false" flat small style="text-transform: none; font-size: 18px; font-weight: 400"><v-icon left>info_outline</v-icon>About Donations</v-btn>
                         </v-card-title>
                            <v-divider></v-divider>
                        <v-card-text 
                        class="primary--text">
                        Each purchase via 
                          <span 
                          style="font-family:'Product Sans'; 
                          color: #212121; 
                          font-weight:600; 
                          font-size: 16px">
                          GOOD Influence
                          </span> 
                          earns a donation.
                        </v-card-text>
                        <v-card-text 
                          class="primary--text">
                          It's simple - you shop, we earn a commission from Amazon, and then we donate it, 
                            <span 
                            style="font-weight:600; 
                            color: #212121; 
                            font-size: 16px; 
                            font-family:'Product Sans'">
                            100%.
                            </span>
                        </v-card-text>
                         <v-card-actions>
                          <v-spacer></v-spacer>
                            <v-btn 
                            class="secondary--text" 
                            flat="flat" 
                            @click.native="donationsDialog = false">
                            Do Good, Easily
                            </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                      
                  </v-card-actions>

                <v-divider></v-divider>

                <v-card-actions class="pa-1 pl-3">
                  <v-btn v-tooltip:right="{ html: 'buy on amazon' }" v-bind:href="product.productUrl"  style="cursor: pointer;" 
                        target="blank" outline small flat light class="primary--text ">${{ product.productPrice }}</v-btn>
                <v-spacer></v-spacer>
                <favorite-product
                :productId="product.id"
                v-if="userIsAuthenticated">
              </favorite-product>

                <v-menu top lazy offset-y>
                  <v-btn 
                    icon
                    slot="activator"
                    icon style="cursor: pointer;" 
                    v-bind:ripple="{ class: 'info--text' }">
                    <v-icon 
                      class="primary--text">
                      keyboard_arrow_down
                    </v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile v-for="item in items" :key="item.title" @click="">
                      <v-list-tile-action style="min-width:26px">
                        <v-icon style="font-size: 16px" class="primary--text"> {{ item.icon}} </v-icon>
                      </v-list-tile-action>  
                       <v-list-tile-title 
                       style="color:#212121">
                       {{ item.title }}
                       </v-list-tile-title>
                      </v-list-tile>
                    </v-list>
                  </v-menu>

                </v-card-actions>


        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        donationsDialog: false,
        items: [
          { title: 'Share', icon: 'share', subheader: 'Share this with friends' },
          { title: 'Add to Favorites', icon: 'favorite_outline' }

        ]
      }
    },
    props: ['productId'],
    computed: {
      products () {
        return this.$store.getters.setProduct
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

#product-link {
  text-decoration: none;
  text-transform: capitalize;

}

#product-link:hover {
  text-decoration: underline;
}

#header-link:hover {
    text-decoration: underline;
}

#products-title-card {
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>