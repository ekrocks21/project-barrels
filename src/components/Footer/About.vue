<template>
  <v-app>
  <AboutHero></AboutHero>
  <AboutTeam></AboutTeam>
  </v-app>
</template>

<script>
  import AboutHero from '../About/AboutHero.vue'
  import AboutTeam from '../About/AboutTeam.vue'
  export default {
    components: {
      AboutHero: AboutHero,
      AboutTeam: AboutTeam
    }
  }
</script>

