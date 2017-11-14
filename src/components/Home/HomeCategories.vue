<template>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs2 
          v-for="categories in categories"
          :key="categories.id"
          class="hidden-xs-only mt-3">
            <v-card 
            id="home-main-categories-lg-card"
            raised
            hover
            class="ma-3"
            @click="onLoadCategories (categories.id )"
            style="cursor: pointer">
            <v-card-title class="mb-0 pb-0" >
                  <p  class="mb-0 primary--text" v-text="categories.name"></p>
              </v-card-title> 
              <v-card-media
              contain>
                <img id='home-main-categories-lg-image' :src="categories.image">
              </v-card-media>
            </v-card>
          </v-flex>
      </v-layout> 
      </v-container>
</template>

<script>
  export default {
    data () {
      return {
        categories: [
          { image: './static/kitchen-dining.svg', id: 'household', name: 'Home & Living' },
          { image: './static/sports-outdoors.svg', id: 'outdoors', name: 'Sports & Outdoors' },
          { image: './static/health-beauty.svg', id: 'health', name: 'Health & Beauty' },
          { image: './static/kids-baby.svg', id: 'kids', name: 'Kids & Baby' },
          { image: './static/tech-electronics.svg', id: 'electronics', name: 'Electronics' },
          { image: './static/art-paint.svg', id: 'arts', name: 'Arts & Crafts' }
        ]
      }
    },
    methods: {
      onLoadCategories (id) {
        this.$router.push('/' + id)
      }
    }
  }
</script>

<style scoped>

 
</style>
