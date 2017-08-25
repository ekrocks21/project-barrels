<template>
  <v-app>
  <FeaturedShopsCarousel></FeaturedShopsCarousel>
  <FeaturedShopsGivers></FeaturedShopsGivers>
    
  </v-app>
</template>

<script>
  import FeaturedShopsCarousel from './FeaturedShopsCarousel.vue'
  import FeaturedShopsGivers from './FeaturedShopsGivers.vue'
  export default {
    components: {
      FeaturedShopsCarousel: FeaturedShopsCarousel,
      FeaturedShopsGivers: FeaturedShopsGivers
    }
  }
</script>

