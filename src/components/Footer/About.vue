<template>
  <v-app>
  <AboutHero></AboutHero>
  <AboutTeam class="hidden-xs-only"></AboutTeam>
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

