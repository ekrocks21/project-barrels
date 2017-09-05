<template>
  <v-layout row wrap>
      <v-flex xs12 sm4
        v-for="product in products" 
        :key="shop.id" 
        class="mt-5">
        <v-card hover style="margin:10px">
                <v-card-media
                  :src="product.productImageUrl"
                  height="200px">
                </v-card-media>
                <v-card-text>
                <p style="font-size:16px; line-height: 0px">{{ product.productName }}</p>
                <p style="font-size:14px; line-height: 7px; margin-bottom: 0px">{{ product.productPrice }}</p>
                </v-card-text>
                <v-card-actions style="background-color: #fafafa">
                <v-spacer></v-spacer>
                  <v-btn 
                    v-bind:href="product.productUrl" 
                    icon style="cursor: pointer;" 
                    target="blank"
                    v-bind:ripple="{ class: 'info--text' }">
                  <v-icon class="info--text">launch</v-icon>
                </v-btn>
                </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  export default {
    props: ['shop'],
    computed: {
      products () {
        return this.$store.getters.loadedProducts
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script>