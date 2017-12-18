<template>
<v-container grid-list-sm>
<!-- loader -->
 <v-layout row wrap v-if="loading">
  <v-flex xs12 class="text-xs-center">
   <v-progress-circular
    indeterminate
    class="secondary--text mt-5"
    :width="5"
    :size="70"></v-progress-circular>
  </v-flex>
 </v-layout>
<!-- Product -->
 <v-layout row wrap v-else>
  <v-flex xs12 sm4
   v-for="product in products" 
   :key="product.id" 
   class="mt-5">
    <v-card hover
    style="margin:10px">
<!-- productImage -->
     <v-card-media
      style="background-color: #212121;"
      :src="product.productImage"
      height="200px">
    </v-card-media>

<!-- actions row 1 -->
    <v-card-actions class="pa-3">
     <p id="product-name">
      {{ product.productName }}
     </p>
      <v-spacer></v-spacer>
        <v-btn 
         v-bind:href="product.productUrl"  
         style="cursor: pointer;" 
         target="blank" 
         outline 
         small 
         flat 
         class="secondary--text">
         {{ product.productPrice }}
        </v-btn>
    </v-card-actions>

    <v-divider></v-divider>
<!-- actions row 2 -->
    <v-card-actions>
<!-- favorite button -->      
     <v-btn v-if="userIsCreator" 
      icon @click="deleteProduct(product['.key'])">
       <v-icon 
        class="light--text">
        delete_forever
      </v-icon>
     </v-btn>

    <v-btn v-if="userIsCreator != true" 
      icon>
       <v-icon 
        class="primary--text">
        favorite_outline
      </v-icon>
     </v-btn>
<!-- donations button -->      
     <v-btn 
     v-if="userIsCreator != true" 
      v-tooltip:bottom="{ html: '100% of Affiliate Donated' }" 
      class="secondary--text" 
      slot="activator" 
      icon 
      flat>
       <v-icon 
        class="secondary--text">
         loyalty
       </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
<!-- share button -->       
      <v-btn 
       icon>
        <v-icon 
         class="light--text">
          share
        </v-icon>
      </v-btn>
    </v-card-actions>
   </v-card>
  </v-flex>
</v-layout>
</v-container>
</template>

<script>
  // import firebase from 'firebase'
  export default {
    props: ['giverId'],
    data () {
      return {
        items: [
          { title: 'Share', icon: 'share', subheader: 'Share this with friends' },
          { title: 'Add to Favorites', icon: 'favorite_outline' }

        ],
        products: this.$store.getters.loadedGiver(this.giverId).products
      }
    },
    /* methods: {
      deleteProduct (key) {
        firebase.database().ref('givers/' + this.$store.getters.loadedGiver(this.giverId + '/products').child(key).remove()
      }
    }, */
    computed: {
      giver () {
        return this.$store.getters.loadedGiver(this.giverId)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.giver.id
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>

#product-name {
  font-size:16px;
  font-weight: 500;
  line-height: 0px;
}

</style>