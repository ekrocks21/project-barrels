<template>

    <v-btn icon  slot="activator" v-if="productIsFavorite" @click="onFavorite">
    <v-icon class="love--text">favorite</v-icon>
    </v-btn>
    <v-btn icon slot="activator" v-else @click="onFavorite">
    <v-icon class="primary--text"> favorite_outline</v-icon>
    </v-btn>
    
</template>

<script>
  export default {
    data () {
      return {
        favoriteDialog: false,
        products: this.$store.getters.loadedShop(this.shopId).products
      }
    },
    computed: {
      shop () {
        return this.$store.getters.loadedShop(this.shopId)
      },
      productIsFavorite () {
        return this.$store.getters.user.favoritedProducts.findIndex(productId => {
          return productId === this.productId
        }) >= 0
      }
    },
    props: ['shopId'],
    methods: {
      onFavorite () {
        if (this.productIsFavorite) {
          this.$store.dispatch('favoriteProduct', this.productId)
        } else {
          this.$store.dispatch('unFavoriteProduct', this.productId)
        }
      }
    }
  }
</script>