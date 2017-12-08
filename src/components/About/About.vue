<template>
  <v-app>
  <AboutHero></AboutHero>
  <v-divider></v-divider>
  <AboutGiving></AboutGiving>
  <AboutGiving2></AboutGiving2>
  <v-divider></v-divider>
  <AboutTeam></AboutTeam>
  </v-app>
</template>

<script>
  import AboutHero from '../About/AboutHero.vue'
  import AboutGiving from '../About/AboutGiving.vue'
  import AboutGiving2 from '../About/AboutGiving2.vue'
  import AboutTeam from '../About/AboutTeam.vue'
  export default {
    components: {
      AboutHero: AboutHero,
      AboutGiving: AboutGiving,
      AboutGiving2: AboutGiving2,
      AboutTeam: AboutTeam
    }
  }
</script>

