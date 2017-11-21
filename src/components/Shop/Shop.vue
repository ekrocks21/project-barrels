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
        <v-card >
          <v-card-actions class="pa-3">
            <h4 
            class="primary--text" 
            style="margin: 0; font-size:22px; font-family: 'Product Sans'"
            id="shop-title">
            {{ shop.shopName }}
            </h4>

               <v-dialog 
               v-model="donationsDialog" 
               lazy 
               absolute>
                  <v-btn 
                    v-tooltip:right="{ html: 'donations earned' }" 
                    class="secondary--text" 
                    slot="activator" 
                    flat>
                      <v-icon 
                      left 
                      class="secondary--text">
                      loyalty
                      </v-icon> 
                    $3000
                  </v-btn>

                  <v-card>
                    <v-card-title>
                      <v-btn 
                        @click.native="donationsDialog = false"
                        flat 
                        small 
                        style="text-transform: none; 
                        font-size: 18px; 
                        font-weight: 400">
                          <v-icon 
                            left>
                            info_outline
                          </v-icon>
                        About Donations
                      </v-btn>
                    </v-card-title>

                    <v-divider></v-divider>

                      <v-card-text 
                        class="primary--text">
                        Each purchase via 
                          <span 
                          style="font-family:'Product Sans'; 
                          color: #212121; 
                          font-weight:600; 
                          font-size: 16px">
                          GOOD Influence
                          </span> 
                        earns a donation.
                      </v-card-text>
                  
                      <v-card-text 
                        class="primary--text">
                        It's simple - you shop, we earn a commission from Amazon, and then we donate it, 
                          <span 
                            style="font-weight:600;
                            color: #212121; 
                            font-size: 16px; 
                            font-family:'Product Sans'">
                            100%.
                          </span>
                        </v-card-text>
                
                        <v-card-actions>
                          <v-spacer></v-spacer>
                            <v-btn 
                              class="secondary--text" 
                              flat="flat" 
                              @click.native="donationsDialog = false">
                              Do Good, Easily
                            </v-btn>
                        </v-card-actions>
                  </v-card>
                </v-dialog>

                <template v-if="userIsCreator">
                  <v-spacer></v-spacer>
                    <edit-shop :shop="shop"></edit-shop>
                </template>
                <template v-if="userIsCreator">
                  <create-product :shop="shop"></create-product>
                 </template>
            </v-card-actions>

              <v-card-media
                :src="shop.imageUrl"
                height="200px">
              </v-card-media>

                <v-card-text>
                  <div 
                    style="margin: 0; 
                    font-size:16px;">
                    {{ shop.tagLine }}
                  </div>
               </v-card-text>

        <v-card-actions v-if="userIsCreator !== true">
          <v-dialog 
            v-model="dialog" 
            lazy 
            absolute>
            <v-btn 
              flat 
              small 
              class="secondary--text" 
              slot="activator" 
              v-tooltip:right="{ html: 'learn more' }">
                <v-icon 
                  class="primary--text">
                  more_horiz
                  </v-icon>
            </v-btn>

            <v-card>
              <v-card-title>
                <div 
                  style="text-transform: uppercase; 
                  font-size: 16px; 
                  font-weight: 500">  
                  {{ shop.shopName }}
                </div>
              </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-icon 
                    style="color: #212121" 
                    left>
                    location_on
                  </v-icon> 
                  {{ shop.location }} 
                </v-card-text>

                <v-card-text> {{ shop.description }} </v-card-text>
                
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn 
                    class="secondary--text" 
                    flat="flat" 
                    @click.native="dialog = false">
                    Shop
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-dialog>

           <v-spacer 
            class="hidden-xs-only">
           </v-spacer>
           
            <v-menu 
              origin="center center"
              transition="scale-transition"
              bottom>
                <v-btn 
                  small 
                  flat 
                  class="secondary--text " 
                  slot="activator">
                    <v-icon 
                      left 
                      class="secondary--text hidden-xs-only">
                      share
                    </v-icon>
                  Share
                </v-btn>
             <v-list>
              <v-list-tile 
                v-for="share in shares" 
                :key="share.title">
                  <v-list-tile-title>{{ share.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
           </v-menu> 

            <follow-dialog
                :shopId="shop.id"
                v-if="userIsAuthenticated">
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
        donationsDialog: false,
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

<style scoped>

#shop-title {
  text-transform: capitalize;
}

</style>