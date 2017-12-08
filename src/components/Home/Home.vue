<template>
  <v-app>
    <HomeCarousel></HomeCarousel>
    <FeaturedGivers></FeaturedGivers>
    <HomeProducts></HomeProducts>
  </v-app>
</template>

<script>
  import HomeCarousel from './HomeCarousel.vue'
  import FeaturedGivers from '@/components/Givers/FeaturedGivers.vue'
  import HomeProducts from './HomeProducts.vue'
  export default {
    components: {
      HomeCarousel: HomeCarousel,
      FeaturedGivers: FeaturedGivers,
      HomeProducts: HomeProducts
    },
    computed: {
      givers () {
        return this.$store.getters.loadedGivers
      },
      userProfile () {
        if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
          return this.$store.getters.user.id
        }
      }
    }
  }
</script>


