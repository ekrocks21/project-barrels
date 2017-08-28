<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="secondary--text mt-5"
          :width="5"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12 class="mt-5">
        <v-card>
          <v-card-title>
            <h6 style="color:#212121">{{ shop.shopName }}</h6>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-shop :shop="shop"></edit-shop>
            </template>
          </v-card-title>
          <v-card-media
            :src="shop.imageUrl"
            height="200px"
          ></v-card-media>
          <v-card-text>
            <div style="font-size:16px">{{ shop.tagLine }}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
     <v-flex>
      <v-card>
        <v-card-actions v-if="userIsCreator = false">
          <v-dialog v-model="dialog" lazy absolute>
            <v-btn flat small class="primary--text" slot="activator"><v-icon>more_horiz</v-icon></v-btn>
              <v-card>
               <v-card-title>
                <div class="headline">About {{ shop.shopName }}</div>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text> {{ shop.description }} </v-card-text>
                <v-card-text><v-icon left>location_on</v-icon> {{ shop.location }} </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="info--text" flat="flat" @click.native="dialog = false">Shop</v-btn>
                </v-card-actions>
              </v-card>
           </v-dialog>
           <v-spacer></v-spacer>
            <v-btn flat class="secondary--text"><v-icon left class="secondary--text">share</v-icon>Share</v-btn>
            <v-btn flat class="secondary--text"><v-icon left class="secondary--text">add</v-icon>Follow</v-btn>
          </v-card-actions>
          <v-card-actions v-if="userIsCreator"> 
            <v-spacer></v-spacer>
            <v-btn flat class="primary--text">Deactivate</v-btn>
          </v-card-actions>
      </v-card>
     </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      shop () {
        return this.$store.getters.loadedShop(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.shop.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>