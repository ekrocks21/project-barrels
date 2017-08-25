<template>
      <v-container fluid grid-list-md class="hidden-xs-only">
        <h3 class="hidden-sm-and-down mt-5 mb-4 primary--text headline" style="text-align: center"> Featured givers</h3>
        <v-layout row wrap>
          <v-flex xs12 sm4
            v-for="items in items"
            :key="items.title"
            class="mt-5">
            <v-card 
            class="pa-3 ma-3"
            hover
            ><a id="launch-featured-giver-url" v-bind:href="items.url">
              <v-icon class="mr-2 secondary--text" v-html="items.icon"></v-icon>
              <a v-text="items.title"></a>
              <v-card-media 
              style="text-align: center" 
              class="mt-4"  
              contain>
                <img id="featured-giver-image" :src="items.image">
              </v-card-media>
              <v-card-title
              style="justify-content: center">
              <a class="primary--text" v-text="items.name"></a>
              </v-card-title>
            </a></v-card>
          </v-flex>
      </v-layout> 
      </v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { image: '../static/featured-giver-monica.png', title: 'Featured Giver ', name: 'Monica Style Muse', icon: 'verified_user', social: '@monica', url: '/earn' },
          { image: '../static/featured-giver-taylor.png', title: 'Featured Giver ', name: 'Taylor Mason', icon: 'verified_user', social: '@taylor' },
          { image: '../static/featured-giver-eric.png', title: 'Featured Giver ', name: 'Eric Kane', icon: 'verified_user', social: '@kane' }
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

  #featured-giver-image {
    margin: 0 auto;
    background-size: contain;
    width: 150px;
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
