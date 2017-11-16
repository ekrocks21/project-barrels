<template>
      <v-container grid-list-md class="mt-5">
        <router-link id="header-link" to="/electronics" ><h3 class="hidden-md-and-up mb-3 ml-3 primary--text headline" style="text-align: left">Tech &amp; Electronics</h3></router-link>
       <router-link id="header-link" to="/electronics" > <h3 class="hidden-sm-and-down mt-3 mb-5 primary--text headline" style="text-align: left">Tech &amp; Electronics</h3></router-link> 
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
                  <v-icon style="color: #212121">favorite_outline</v-icon>
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

#header-link {
    text-decoration: none;
}

#header-link:hover {
    text-decoration: underline;
}

#product-launch-icon {
  color: #10b6a0 !important;
}
#launch-product-url {
  color: #ffffff;

}
</style>
