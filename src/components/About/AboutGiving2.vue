<template>
      <v-container grid-list-sm>
        <v-layout class="mb-5" row wrap>
          <v-flex xs12 sm4
            v-for="items in items"
            :key="items.title"
            class="mt-0 mb-5">
            <v-card 
            
            
            class="ma-3 mb-5"
            hover
            >
              <v-card-title style="justify-content: center" id="about-give-title" v-text="items.title"></v-card-title>
              <v-card-media 
              style="text-align: center" 
              class="mt-4"  
              contain>
                <v-icon class="primary--text" id="about-give-icon">{{ items.icon }}</v-icon>
              </v-card-media>
              <v-card-title
              style="justify-content: center">
              <a class="light--text" v-text="items.name"></a>
              </v-card-title>
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
          { image: '../static/founder-eric.png', title: 'Make a Purchase ', name: 'Purchase via Amazon', icon: 'shopping_cart', social: '@kane' },
          { image: '../static/featured-giver-taylor.png', title: 'Generate a Donation', name: 'We will donate 100% of our commission', icon: 'loyalty', social: '@taylor' },
          { image: '../static/founder-elizabeth.png', title: 'Support Giving Projects ', name: 'Simple, Transparent, and Impactful', icon: 'favorite', social: '@lizard', url: '/earn' }
        ]
      }
    }
  }
</script>



<style scoped>
  #home-main-card-lg {
    height:125px !important;
  }
  #appHomeMain {
    background: #fafafa;
  }

  #about-give-title {
    font-family: 'Product Sans';
    font-size: 24px;
    text-align: center;
  }

 #about-give-icon {
    font-size: 80px;
 }



#home-featured-giver-lg-social {
  color: #607D8B;
  text-align: center;
  padding-top: 5px;
  font-size: 11px;
}

#launch-featured-giver-url {
  text-decoration: none;
}
</style>
