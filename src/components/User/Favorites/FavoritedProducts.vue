<template>

    <v-btn icon 
    slot="activator" 
    v-if="productIsFavorite" 
    @click="onFavorite">
    <v-icon 
    class="love--text">favorite</v-icon>
    </v-btn>
    <v-btn icon slot="activator" v-else @click="onFavorite">
    <v-icon class="primary--text"> favorite_outline</v-icon>
    </v-btn>
    
</template>

<script>
  export default {
    props: ['productId'],
    computed: {
      product () {
        return this.$store.getters.setProducts(this.productId)
      },
      productIsFavorite () {
        return this.$store.getters.user.favoriteProducts.findIndex(productId => {
          return productId === this.productId
        }) >= 0
      }
    },
    methods: {
      onFavorite () {
        if (this.productIsFavorite) {
          this.$store.dispatch('unFavoriteProduct', this.productId)
        } else {
          this.$store.dispatch('favoriteProduct', this.productId)
        }
      }
    }
  }
</script>