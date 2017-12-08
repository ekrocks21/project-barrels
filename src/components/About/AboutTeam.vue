<template>
      <v-container grid-list-sm>
        <h3 class="mt-5 mb-4 primary--text" style="text-align: center">Our Team</h3>
        <v-layout class="mb-5" row wrap>
          <v-flex xs12 sm6
            v-for="items in items"
            :key="items.title"
            class="mt-5">
            <v-card
            class="pa-3 ma-3"
            hover
            >
            <v-card-title style="justify-content: center">
              
              <p id="about-team-title"><v-icon class="mr-2 mb-1 secondary--text" v-html="items.icon"></v-icon>{{ items.title }}</p>
            </v-card-title>  
              <v-card-media 
              style="text-align: center" 
              class="mt-0" 
              :src="items.image"
              height="150" 
              contain>
              </v-card-media>
              <v-card-title
              style="justify-content: center">
              <p id="about-team-name" class="light--text mt-2" v-text="items.name"></p>
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
          { image: '../static/founder-eric.png', title: 'Founder & CEO ', name: 'Eric Kane', icon: 'favorite', social: '@kane' },
          { image: '../static/featured-giver-taylor.png', title: 'Founder & CTO', name: 'Taylor Mason', icon: 'code', social: '@taylor' },
          { image: '../static/founder-elizabeth.png', title: 'People Lead', name: 'Elizabeth Bryndza', icon: 'directions_walk', social: '@lizard', url: '/earn' },
          { image: '../static/featured-giver-monica.png', title: 'Influencer in Residence ', name: 'Monica Style Muse', icon: 'verified_user', social: '@monica', url: '/earn' }
        ]
      }
    }
  }
</script>



<style scoped>




#about-team-title {
  text-align: center;
  font-size: 24px;
  font-family: 'Product Sans';
}

#about-team-name {
  font-size: 18px;
}

</style>
