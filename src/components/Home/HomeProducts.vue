<template>
  <v-container grid-list-sm>
  <!-- loader -->  
<v-layout row wrap>
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
     <v-btn  
      icon>
       <v-icon 
        class="primary--text">
        favorite_outline
      </v-icon>
     </v-btn>
<!-- donations button -->      
     <v-btn 
      v-tooltip:bottom="{ html: '100% of Affiliate Donated' }" 
      class="secondary--text" 
      slot="activator" 
      small 
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
         class="primary--text">
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
  export default {
    data () {
      return {
        donationsDialog: false,
        items: [
          { title: 'Share', icon: 'share', subheader: 'Share this with friends' },
          { title: 'Add to Favorites', icon: 'favorite_outline' }

        ]
      }
    },
    computed: {
      products () {
        return this.$store.getters.setProduct
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script>

<style scoped>

#productHeroImage {
  background-position: center; 
  background-repeat: no-repeat;
  background-size: contain;
}

#header-link {
    text-decoration: none;
}

#product-link {
  text-decoration: none;

}


#product-link:hover {
  text-decoration: underline;
}

#header-link:hover {
    text-decoration: underline;
}

#products-title-card {
  overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

</style>