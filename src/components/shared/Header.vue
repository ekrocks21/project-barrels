<template>
 <v-layout class="mt-5">
    <v-navigation-drawer
      primary
      persistent
      v-model="drawer" 
      clipped
      disable-route-watcher
      hide-overlay
    >
      <v-list dense>
        <v-list-tile
          v-for="navItems in navItems"
          :key="navItems.icon"
          :to="navItems.link"
          v-bind:ripple="{ class: 'secondary--text' }"
          >
          <v-list-tile-action>
            <v-icon id="nav-drawer-icon" v-html="navItems.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title id="nav-drawer-title" v-text="navItems.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar 
    fixed 
    scroll-off-screen
    style='background-color: #ffffff'>
      <v-toolbar-side-icon v-bind:ripple="{ class: 'secondary--text' }" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title id='logo'><router-link to='/'
      style="font-family: 'Product Sans';
      color: #212121 !important; text-decoration: none">
      GOOD Influence
      </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn 
        v-for="item in menuItems"
        :key="item.icon"
        :to="item.link"
        fab 
        style="color: #212121" 
        small 
        class="mr-3"
        v-bind:ripple="{ class: 'secondary--text' }">
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
         <v-btn 
        v-if="userHasShop"
        :to="'/shops/' + shop.id"
        fab 
        style="color: #212121" 
        small 
        class="mr-3"
        v-bind:ripple="{ class: 'secondary--text' }">
          <v-icon>person</v-icon>
        </v-btn>           
        <v-btn 
        v-if="userHasProfile"
        :to="'/profile/' + user.id"
        fab 
        style="color: #212121" 
        small 
        class="mr-3"
        v-bind:ripple="{ class: 'secondary--text' }">
          <v-icon>person</v-icon>
        </v-btn>     
    </v-toolbar>
   </v-layout> 
</template>

<script>
  export default {
    data () {
      return {
        props: ['shop'],
        drawer: null,
        navItems: [
          { icon: 'home', title: 'Home', link: '/' },
          { icon: 'store', title: 'Featured Shops', link: '/shops' },
          { icon: 'explore', title: 'Categories', link: '/categories' },
          { title: 'Home & Living', link: '/household' },
          { title: 'Health & Beauty', link: '/health' },
          { title: 'Arts & Crafts', link: '/arts' },
          { title: 'Kids & Baby', link: '/kids' },
          { title: 'Electronics', link: '/electronics' },
          { title: 'Sports & Outdoors', link: '/outdoors' },
          { icon: 'favorite_border', title: 'Favorites', link: '/give' },
          { icon: 'info_outline', title: 'About', link: '/about' }
        ]
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'person', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = []
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userHasProfile () {
        if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
          return this.$store.getters.user.id
        }
      },
      shops () {
        return this.$store.getters.loadedShops
      },
      user () {
        return this.$store.getters.user
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style scoped lang="stylus">


</style>
