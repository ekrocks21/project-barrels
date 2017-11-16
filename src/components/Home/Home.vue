<template>
  <v-app>
  <HomeCarousel></HomeCarousel>
    <HomeCategories></HomeCategories>
  <FeaturedGiver></FeaturedGiver>
  <HomeProducts></HomeProducts>
    
  </v-app>
</template>

<script>
  import HomeCarousel from './HomeCarousel.vue'
  import FeaturedGiver from './FeaturedGiver.vue'
  import HomeCategories from './HomeCategories.vue'
  import HomeProducts from './HomeProducts.vue'
  export default {
    components: {
      HomeCarousel: HomeCarousel,
      HomeCategories: HomeCategories,
      FeaturedGiver: FeaturedGiver,
      HomeProducts: HomeProducts
    },
    computed: {
      userProfile () {
        return this.$store.getters.userProfile[0]
      },
      shops () {
        return this.$store.getters.loadedShops
      }
    }
  }
</script>


