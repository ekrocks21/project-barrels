<template>
  <v-app>
    <appHeader></appHeader>
    <main>
      <router-view></router-view>
    </main>
    <appFooter></appFooter>
  </v-app>
</template>

<script>
  import Header from './components/shared/Header.vue'
  import Footer from './components/shared/Footer.vue'
  export default {
    components: {
      appHeader: Header,
      appFooter: Footer
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
