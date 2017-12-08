<template>
 <v-container>
<!-- loader -->   
  <v-layout row wrap v-if="loading">
   <v-flex xs12 class="text-xs-center">
    <v-progress-circular
     indeterminate
     class="secondary--text mt-5"
     :width="5"
     :size="70">
    </v-progress-circular>
   </v-flex>
  </v-layout>

<!-- Giver Profile Card -->  
  <v-layout row wrap v-else>
    <v-flex xs12 sm12 mt-5>
      <v-card class="mb-1" >

 <!-- Cover Image & Profile Image -->

        <v-card-media id="coverImage" 
         :src="giver.coverImage" 
         height="220px">

        <v-card-actions>
<!-- share button -->
           <v-btn 
            class="ml-3"  
            fab 
            small 
            dark 
            v-tooltip:right="{ html: 'share the love' }">
             <v-icon>share</v-icon>
           </v-btn>
            <v-spacer></v-spacer>

<!-- update giver template -->

             <template>
              <v-spacer></v-spacer>
               <update-giver 
                v-if="userIsCreator" 
                :giver="giver">
               </update-giver>
            </template>

<!-- If this user is not the creator show follow button -->            

            <v-btn 
             v-if="userIsCreator === false" 
             dark 
             class="secondary mb-2 mr-2"
             small>
             Follow
            </v-btn>

        </v-card-actions> 

<!-- avatar for giver profile image -->        
        <div id="avatar">
          <img :src="giver.profileImage" height="100"/>
        </div>
    </v-card-media> <!-- End v-card-media -->
      
      <!-- Profile Name & Logout -->

        <v-card-actions 
         primary-title 
         class="pl-4 pt-3 pb-0 mb-0">
          <div>
           <h5 
            id="userName"
            class="mb-0 pb-0" >
            @{{ giver.userName }}

<!-- verified giver tooltip -->            
             <v-btn 
              small 
              icon 
              flat 
              fab 
              class="mb-2 pb-0" 
              v-tooltip:right="{ html: 'verified giver' }">
               <v-icon 
               class="secondary--text">
               verified_user
              </v-icon>
             </v-btn>
            </h5>

<!-- givers Bio -->
             <p class="light--text">{{ giver.userBio }}</p>

          </div>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>

<!-- show givers products -->  
      <giver-products 
                :giverId="this.id">
    </giver-products>
 </v-container> 
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      // return the giver object for this giver
      giver () {
        return this.$store.getters.loadedGiver(this.id)
      },
      // is this user logged in?
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      // determines if current user is the user who created this giver profile
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.giver.id
      },
      // computed property for loader
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

#avatar {
 text-align: center;
 background-size: cover;
 margin: 0 auto;
 background-position: top center;
/* round the edges to a circle with border radius 1/2 container size */
 border-radius: 50%;
}

#coverImage {
 background-color: #212121;
}

#userName {
 color: #212121;
 font-size: 26px;
 font-family: 'Product Sans';
 text-transform: lowercase;
}

</style>