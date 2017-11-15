<template>
      <v-container  grid-list-md class="mt-5">
        <div>
          <v-breadcrumbs divider="/">
            <v-breadcrumbs-item 
               v-for="bread in breads" :key="bread.text"
               :disabled="bread.disabled" to="/categories" class="mb-4">
              {{ bread.text }}
            </v-breadcrumbs-item>
          </v-breadcrumbs>
        </div>
        <v-layout row wrap mb-5>
          <v-flex xs12 sm3
          v-for="(item, i) in items"
          :key="i"
          class="mt-0">
            <v-card 
            id="home-featured-products-lg-card"
            raised
            hover
            style="cursor: default"
            class="ma-3">
              <v-card-media>
                <img :src="item.image">
              </v-card-media>
              <v-card-title class="mb-0 pb-0">
                <div>
            <a style="text-decoration: none; color: #212121" class="mb-0" v-text="item.name" v-bind:href="item.url"></a>
            <div class="primary--text" v-text="item.price"></div>
          </div>
              </v-card-title>  
              <v-card-actions class="white mt-0 pt-0">
                <v-spacer></v-spacer>
                <v-btn 
                icon 
                style="cursor: pointer"
                v-bind:ripple="{ class: 'secondary--text' }"
                >
                  <v-icon class="secondary--text">favorite_outline</v-icon>
                </v-btn>

                <v-btn 
                v-bind:href="item.url" 
                icon style="cursor: pointer;" 
                target="blank"
                v-bind:ripple="{ class: 'info--text' }">
                  <v-icon class="info--text">launch</v-icon>
                </v-btn>
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
        breads: [
          {
            text: 'Categories',
            disabled: false
          },
          {
            text: 'Sports & Outdoors',
            disabled: true
          }
        ],
        items: [
          { image: '../static/google-home.png', name: 'Google Home', price: '$99.99', url: 'http://www.amazon.com' },
          { image: '../static/google-home.png', name: 'Google Home', price: '$99.99', url: 'http://www.amazon.com' },
          { image: '../static/google-home.png', name: 'Google Home', price: '$99.99', url: 'http://www.amazon.com' },
          { image: '../static/google-home.png', name: 'Google Home', price: '$99.99', url: 'http://www.amazon.com' },
          { image: '../static/google-home.png', name: 'Google Home', price: '$99.99', url: 'http://www.amazon.com' },
          { image: '../static/google-home.png', name: 'Google Home', price: '$99.99', url: 'http://www.amazon.com' },
          { image: '../static/google-home.png', name: 'Google Home', price: '$99.99', url: 'http://www.amazon.com' },
          { image: '../static/google-home.png', name: 'Google Home', price: '$99.99', url: 'http://www.amazon.com' }
        ]
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
