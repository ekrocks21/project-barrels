<template>
<v-container grid-list-sm>
      <router-link id="header-link" to="/shops" ><h3 class="hidden-md-and-up mb-3 ml-3 mt-0 primary--text headline" style="text-align: left">Featured Products</h3></router-link>
       <router-link id="header-link" to="/shops" > <h3 class="hidden-sm-and-down mb-5 mt-5 primary--text headline" style="text-align: left">Featured Products</h3></router-link> 
  <v-layout row wrap>
      <v-flex xs12 sm4
        v-for="product in products" 
        :key="product.id" 
        class="mb-5">
        <v-card hover style="margin:10px">
                <v-card-media
                  :src="product.productImageUrl"
                  height="200px">
                </v-card-media>
                <v-card-actions class="pa-3">

                <p style="font-size:16px; line-height: 0px">{{ product.productName }}</p>
                <v-spacer></v-spacer>
                <v-btn v-bind:href="product.productUrl"  style="cursor: pointer;" 
                    target="blank" outline small flat light class="primary--text ">${{ product.productPrice }}</v-btn>
                </v-card-actions>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn 
                icon 
                v-tooltip:right="{ html: 'every purchase generates a donation' }"
                style="cursor: pointer"
                v-bind:ripple="{ class: 'secondary--text' }"
                >
                  <v-icon class="secondary--text">loyalty</v-icon>
                </v-btn>
                <p class="secondary--text">$200 Raised</p>
                <v-spacer></v-spacer>

                <v-menu top lazy offset-y>
                  <v-btn 
                    icon
                    slot="activator"
                    icon style="cursor: pointer;" 
                    v-bind:ripple="{ class: 'info--text' }">
                    <v-icon class="primary--text">keyboard_arrow_down</v-icon>
                  </v-btn>
                  <v-list>
                    <v-list-tile v-for="item in items" :key="item.title" @click="">
                      <v-list-tile-action style="min-width:26px">
                        <v-icon style="font-size: 16px" class="primary--text"> {{ item.icon}} </v-icon>
                        
                      </v-list-tile-action>  
                       <v-list-tile-title style="color:#212121">{{ item.title }}</v-list-tile-title>
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
        items: [
          { title: 'Share', icon: 'share', subheader: 'Share this with friends' },
          { title: 'Add to Favorites', icon: 'favorite_outline' }

        ],
        products: this.$store.getters.setProduct
      }
    },
    computed: {
      products () {
        return this.$store.getters.setProduct
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