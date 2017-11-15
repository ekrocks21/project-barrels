<template>
  <v-layout row wrap>
      <v-flex xs12 sm4
        v-for="product in products" 
        :key="product.id" 
        class="mt-5">
        <v-card hover style="margin:10px">
                <a v-bind:href="product.productUrl" style="text-decoration:none"><v-card-media
                  :src="product.productImageUrl"
                  height="200px">
                </v-card-media>
                <v-card-text>
                <p style="font-size:16px; line-height: 0px">{{ product.productName }}</p>
                <p style="font-size:14px; line-height: 7px; margin-bottom: 0px">{{ product.productPrice }}</p>
                </v-card-text></a>

                <v-card-actions style="background-color: #fafafa">
                <v-btn 
                  v-if="userIsCreator"
                  icon
                  icon style="cursor: pointer">
                  <v-icon class="primary--text">delete_forever</v-icon>
                </v-btn>  
                <v-spacer></v-spacer>
                <favorite-product
                :products="products.id"
                v-if="userIsAuthenticated">
              </favorite-product>

                  <v-btn 
                    icon
                    v-bind:href="product.productUrl" 
                    icon style="cursor: pointer;" 
                    target="blank"
                    v-bind:ripple="{ class: 'info--text' }">
                  <v-icon class="secondary--text">launch</v-icon>
                </v-btn>
                </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        products: this.$store.getters.loadedShop(this.shopId).products
      }
    },
    props: ['shopId', 'products.id'],
    computed: {
      shop () {
        return this.$store.getters.loadedShop(this.shopId)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.shop.creatorId
      }
    }
  }
</script>