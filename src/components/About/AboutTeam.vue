<template>
      <v-container fluid grid-list-md>
        <h3 class="mt-5 mb-4 primary--text" style="text-align: center">Meet the Team</h3>
        <v-layout row wrap style="margin-left: 20%; margin-right:20%">
          <v-flex xs12 sm6
            v-for="items in items"
            :key="items.title"
            class="mt-5">
            <v-card 
            class="pa-3 ma-3"
            hover
            >
              <v-icon class="mr-2 info--text" v-html="items.icon"></v-icon>
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
          { image: '../static/founder-eric.png', title: 'Founder & CEO ', name: 'Eric Kane', icon: 'build', social: '@kane' },
          { image: '../static/featured-giver-taylor.png', title: 'Founder & CTO', name: 'Taylor Mason', icon: 'code', social: '@taylor' },
          { image: '../static/founder-elizabeth.png', title: 'People Lead', name: 'Elizabeth Bryndza', icon: 'directions_walk', social: '@lizard', url: '/earn' },
          { image: '../static/featured-giver-monica.png', title: 'Influencer in Residence ', name: 'Monica Style Muse', icon: 'verified_user', social: '@monica', url: '/earn' }
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
