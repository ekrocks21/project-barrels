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
            <h4 style="color:#212121; font-size:22px">{{ shop.shopName }}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-shop :shop="shop"></edit-shop>
            </template>
            <template v-if="userIsCreator">
              <create-product :shop="shop"></create-product>
            </template>
          </v-card-title>
          <v-card-media
            :src="shop.imageUrl"
            height="200px"
          ></v-card-media>
          <v-card-text>
            <div style="font-size:16px">{{ shop.tagLine }}</div>
          </v-card-text>
        <v-card-actions v-if="userIsCreator !== true">
          <v-dialog v-model="dialog" lazy absolute>
            <v-btn flat small class="primary--text" slot="activator"><v-icon>more_horiz</v-icon></v-btn>
              <v-card>
               <v-card-title>
                <div class="headline">About {{ shop.shopName }}</div>
                </v-card-title>
                
                <v-card-text> {{ shop.description }} </v-card-text>
                <v-card-text><v-icon left>location_on</v-icon> {{ shop.location }} </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="info--text" flat="flat" @click.native="dialog = false">Shop</v-btn>
                </v-card-actions>
              </v-card>
           </v-dialog>
           <v-spacer class="hidden-xs-only"></v-spacer>
           <v-menu 
            origin="center center"
            transition="scale-transition"
            bottom>
            <v-btn small flat class="secondary--text " slot="activator"><v-icon left class="secondary--text hidden-xs-only">share</v-icon>Share</v-btn>
             <v-list>
              <v-list-tile v-for="share in shares" :key="share.title">
                <v-list-tile-title>{{ share.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
           </v-menu> 
            <follow-dialog
                :shopId="shop.id">
              </follow-dialog>
          </v-card-actions>
          <v-card-actions v-if="userIsCreator"> 
            <v-text-field
              prepend-icon="search"
              label="Search to add products"
              single-line
              hide-details
              v-model="search"
      ></v-text-field>
            <v-spacer class="hidden-xs-only"></v-spacer>
            <v-dialog v-model="dialog" lazy absolute>
              <v-btn flat class="primary--text hidden-xs-only" slot="activator">Deactivate</v-btn>
              <v-card>
               <v-card-title>
                <div class="headline">Deactivate Shop</div>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text> By clicking confirm your account will be deleted and your shop data may be lost.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="accent--text" flat="flat" @click.native="dialog = false"><v-icon class="accent--text" left>delete_forever</v-icon>confirm</v-btn>
                  <v-btn class="secondary--text" flat="flat" @click.native="dialog = false">cancel</v-btn>
                </v-card-actions>
              </v-card>
           </v-dialog>
          </v-card-actions>
      </v-card>
     </v-flex>
    </v-layout>
        <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="secondary--text mt-5"
          :width="5"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>
    <shop-products v-else
                :shopId="this.id">
    </shop-products>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        dialog: false,
        shares: [
          {
            title: 'Email'
          },
          {
            title: 'Facebook'
          },
          {
            title: 'Twitter'
          }
        ]
      }
    },
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