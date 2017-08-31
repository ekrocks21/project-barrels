<template>
  <v-container>
   <v-layout row wrap class="mt-5 hidden-xs-only">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item 
          v-for="carousel in carousel" 
          v-bind:src="carousel.src" 
          :key="carousel.id"
          :to="carousel.url"
          @click="onLoadCarousel (carousel.id )"
          style="cursor: pointer">
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        carousel: [
          {
            src: './static/homeimage.png', id: 'about'
          },
          {
            src: './static/featuredinfluencer.jpg', id: 'about'
          }
        ]
      }
    },
    methods: {
      onLoadCarousel (id) {
        this.$router.push('/' + id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
