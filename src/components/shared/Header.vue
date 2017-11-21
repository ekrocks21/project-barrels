<template>
 <v-layout class="mt-5">
    <v-navigation-drawer
      app
      primary
      persistent
      v-model="drawer" 
      clipped
      :mini-variant="mini"
      disable-route-watcher
      enable-resize-watcher 
    >
      <v-list dense>
       <v-list class="pa-0">
          <v-list-tile 
            avatar 
            v-bind:ripple="{ class: 'secondary--text' }">
            <router-link 
              to='/' 
              style="text-decoration: none"> 
              <v-list-tile-avatar>
                <img src="/static/G-logo.svg" />
              </v-list-tile-avatar>
            </router-link>
          </v-list-tile>
      </v-list> 

        <v-list-tile
          v-for="navItems in navItems"
          :key="navItems.icon"
          :to="navItems.link"
          v-bind:ripple="{ class: 'secondary--text' }">
            <v-list-tile-action>
              <v-icon 
                style="color: #212121" 
                id="nav-drawer-icon" 
                v-html="navItems.icon">
              </v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title 
                id="nav-drawer-title" 
                v-text="navItems.title">
              </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
            <v-list-tile-action>
              <v-icon style="color: #212121">
                exit_to_app
              </v-icon>
            </v-list-tile-action>
          <v-list-tile-content>
            Logout
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-else
          to="/signin">
          <v-list-tile-action>
            <v-icon style="color: #212121" >person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content style="color: #212121" >Sign In</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-navigation-drawer
      app
      primary
      persistent
      temporary
      v-model="drawerMobile" 
      hide-overlay
      disable-route-watcher
      enable-resize-watcher>
      <v-list dense>
       <v-list class="pa-0">
        <router-link 
          to="/" 
          style="text-decoration: none">
          <v-list-tile 
            avatar 
            class="mt-2">
            <v-list-tile-avatar>
              <img src="/static/G-logo.svg" />
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title 
                style="font-weight: 600; 
                font-size: 16px; 
                font-family:'Product Sans'">
                Do Good, Easily.
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list> 
       
      <v-divider class="mt-1 mb-1"></v-divider>
        <v-list-tile
          v-for="navItems in navItems"
          :key="navItems.icon"
          :to="navItems.link"
          v-bind:ripple="{ class: 'secondary--text' }"
          
          >
          <v-list-tile-action>
            <v-icon style="color: #212121" id="nav-drawer-icon" v-html="navItems.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title id="nav-drawer-title" v-text="navItems.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon style="color: #212121" >exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-else
          to="/signin">
          <v-list-tile-action>
            <v-icon style="color: #212121" >person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content style="color: #212121" >Sign In</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar 
    fixed 
    style='background-color: #ffffff'>
    <v-btn icon @click.stop="drawerMobile = !drawerMobile"><v-icon>more_vert</v-icon></v-btn>
      <v-toolbar-title id='logo'><router-link to='/'
      style="font-family: 'Product Sans';
      color: #212121 !important; text-decoration: none">
      GOOD Influence
      </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn 
        v-if="userHasShop"
        :to="'/shops/' + userHasShop"
        fab 
        style="color: #212121" 
        small 
        class="mr-3"
        v-bind:ripple="{ class: 'secondary--text' }">
          <v-icon>store</v-icon>
        </v-btn> 
        <v-btn 
        v-else
        :to="'/createshop'"
        fab 
        style="color: #212121" 
        small 
        class="mr-3"
        v-bind:ripple="{ class: 'secondary--text' }">
          <v-icon>store</v-icon>
        </v-btn>   
        <v-btn 
        v-if="userHasProfile"
        :to="'/profile/' + userHasProfile"
        fab 
        style="color: #212121" 
        small 
        class="mr-3"
        v-bind:ripple="{ class: 'secondary--text' }">
          <v-icon>person</v-icon>
        </v-btn>    
                <v-btn 
        v-else
        :to="'/signin/'"
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
  import firebase from 'firebase'
  export default {
    props: ['userId'],
    data () {
      return {
        photo: '',
        userId: '',
        name: '',
        email: '',
        user: {},
        mini: true,
        drawer: true,
        drawerMobile: false,
        right: null,
        navItems: [
          { icon: 'whatshot', title: 'Featured Products', link: '/products' },
          { icon: 'store', title: 'Featured Shops', link: '/shops' },
          { icon: 'explore', title: 'Categories', link: '/categories' },
          { icon: 'hotel', title: 'Home & Living', link: '/household' },
          { icon: 'healing', title: 'Health & Beauty', link: '/health' },
          { icon: 'palette', title: 'Arts & Crafts', link: '/arts' },
          { icon: 'child_friendly', title: 'Kids & Baby', link: '/kids' },
          { icon: 'important_devices', title: 'Electronics', link: '/electronics' },
          { icon: 'fitness_center', title: 'Sports & Outdoors', link: '/outdoors' },
          { icon: 'favorite_border', title: 'Favorites', link: '/give' },
          { icon: 'info_outline', title: 'About', link: '/about' }
        ]
      }
    },
    created () {
      this.user = firebase.auth().currentUser
      if (this.user) {
        this.name = this.user.displayName
        this.email = this.user.email
        this.photo = this.user.photoURL
        this.userId = this.user.uid
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
          console.log(this.$store)
          return this.$store.getters.user.id
        }
      },
      userProfile () {
        return this.$store.getters.userProfile[0]
      },
      user () {
        return this.$store.getters.user
      },
      userHasShop () {
        if (this.$store.getters.userShop !== null && this.$store.getters.userShop !== undefined) {
          console.log(this.$store)
          return this.$store.getters.userShop[0].shopId
        }
      },
      userShop () {
        return this.$store.getters.userShop[0]
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/signin')
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
