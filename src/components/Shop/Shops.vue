<template>
  <v-container>
    <v-layout row wrap v-for="shop in shops" :key="shop.id" class="mb-2 mt-5">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="shop.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ shop.shopName }}</h5>
                    <h5 class="white--text mb-0">{{ shop.description }}</h5>
                    <h5 class="white--text mb-0">{{ shop.location }}</h5>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/shops/' + shop.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      shops () {
        return this.$store.getters.loadedShops
      }
    }
  }
</script>