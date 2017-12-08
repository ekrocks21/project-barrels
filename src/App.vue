<template>
  <v-app id="app">
    <appHeader></appHeader>
    <main>
      <transition>
      <router-view></router-view>
      </transition>
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
    },
    computed: {
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      user () {
        return this.$store.getters.user.id
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
