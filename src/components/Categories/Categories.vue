<template>
      <v-container fluid grid-list-md>
        <v-layout row wrap mb-5>
          <v-flex xs12 sm4
          v-for="categories in categories"
          :key="categories.id"
          class="mt-5">
            <v-card 
            raised
            hover
            class="ma-3"
            @click="onLoadCategories (categories.id )"
            style="cursor: pointer">
             <v-card-title class="mb-0 pb-0" >
                  <h4  class="mb-0 primary--text headline" v-text="categories.name"></h4>
              </v-card-title> 
              <v-card-media>
                <img :src="categories.image">
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
          { image: '../static/kitchen-dining.svg', name: 'Home & Living', id: 'household' },
          { image: '../static/health-beauty.svg', name: 'Health & Beauty', id: 'health' },
          { image: '../static/art-paint.svg', name: 'Arts & Crafts', id: 'art' },
          { image: '../static/kids-baby.svg', name: 'Kids & Baby', id: 'kids' },
          { image: '../static/tech-electronics.svg', name: 'Electronics', id: 'electronics' },
          { image: '../static/sports-outdoors.svg', name: 'Sports & Outdoors', id: 'outdoors' }
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

#product-price {
  color: #607D8B;
  text-align: left;
  padding-top: 5px;
}

#product-launch-icon {
  color: #10b6a0 !important;
}
#launch-product-url {
  color: #ffffff;

}
</style>
