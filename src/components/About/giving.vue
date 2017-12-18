<template>
  <v-app>
  <GivingHero></GivingHero>
  <v-divider></v-divider>
  <AboutGiving></AboutGiving>
  <AboutGiving2></AboutGiving2>
  </v-app>
</template>

<script>
  import GivingHero from '../About/givingHero.vue'
  import AboutGiving from '../About/AboutGiving.vue'
  import AboutGiving2 from '../About/AboutGiving2.vue'
  import AboutTeam from '../About/AboutTeam.vue'
  export default {
    components: {
      GivingHero: GivingHero,
      AboutGiving: AboutGiving,
      AboutGiving2: AboutGiving2,
      AboutTeam: AboutTeam
    }
  }
</script>