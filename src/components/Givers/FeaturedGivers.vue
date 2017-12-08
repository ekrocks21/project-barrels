<template>
 <v-container grid-list-lg>
  <v-layout 
   class="mt-5"
   row wrap>
   <v-flex 
    xs12 
    sm6
    v-for="giver in givers" 
    :key="giver.id" 
    class="mb-5">

     <v-card> 
<!-- Cover Image & Profile Image -->
      <v-card-media 
       id="coverImage" 
       :src="giver.coverImage" 
       height="200px">
       <v-card-actions>
        <v-spacer></v-spacer>

<!--Follow Giver Button -->        
         <v-btn 
          class="mr-2 secondary--text"  
          fab  
          small 
          dark 
          v-tooltip:left="{ html: 'follow' }">
           <v-icon>
            add
          </v-icon>
         </v-btn>

        </v-card-actions>
          <div id="avatar">
            <img :src="giver.profileImage" height="100"/>
          </div>
      </v-card-media>
      
      <v-card-actions 
       primary-title 
       class="pl-4 pt-3 pb-0 mb-0">

        <div>
          <h5 
           class="mb-2" 
           id="userName">
            @{{ giver.userName }}
<!-- verified icon -->            
            <v-btn 
             small 
             icon 
             flat 
             fab 
             class="mb-2">
              <v-icon 
               class="secondary--text">
                verified_user
              </v-icon>
            </v-btn>
          </h5>
        </div>

        <v-spacer></v-spacer>

          <v-btn 
           :to="'giver/' + giver.id" 
           class="secondary--text mb-2 mr-2" 
           flat 
           icon 
           small 
           fab>
            <v-icon>
              chevron_right
            </v-icon>
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
        donationsDialog: false
      }
    },
    computed: {
      givers () {
        return this.$store.getters.loadedGivers
      }
    }
  }
</script> 

<style scoped>

#shop-title-card {
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

#userName {
  color: #212121;
  font-size: 26px;
  font-family: 'Product Sans';
  text-transform: lowercase;
}

</style>