<template>
      <v-container grid-list-lg>
        <h3 class="mt-5 mb-4 primary--text" style="text-align: center">Community Policies</h3>
        <v-layout class="mb-5" row wrap>
          <v-flex xs12 sm6
            v-for="items in items"
            :key="items.title"
            class="mt-1">
            <v-card
            class="pt-3"
            hover
            flat
            >
            <v-card-title style="justify-content: center">
              <p class="light--text" id="about-team-title"><v-icon class="mr-2 mb-1 secondary--text" v-html="items.icon"></v-icon>{{ items.title }}</p>
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
          { title: 'Privacy Policy', name: 'Last Updated: 01/01/2018', icon: 'security', social: '@kane' },
          { title: 'Frequently Asked Questions', name: 'Taylor Mason', icon: 'question_answer', social: '@taylor' },
          { title: 'Terms of Use', icon: 'directions_walk', social: '@lizard', url: '/earn' },
          { title: 'Contact Us ', name: 'Monica Style Muse', icon: 'email', social: '@monica', url: '/earn' }
        ]
      }
    }
  }
</script>



<style scoped>




#about-team-title {
  text-align: center;
  font-size: 16px;
}

#about-team-name {
  font-size: 18px;
}

</style>
