<template>
 <v-layout class="mt-5">
<!-- mini sidebar Nav -->   
  <v-navigation-drawer
   app
   primary
   persistent
   v-model="drawer" 
   clipped
   :mini-variant="mini"
   disable-route-watcher
   enable-resize-watcher>

    <v-list dense>
 <!-- Mini G logo tile -->
      <v-list-tile 
       class="pt-2"
       avatar>
        <router-link 
         to='/' 
         style="text-decoration: none"> 
          <v-list-tile-avatar>
           <img src="/static/G-logo.svg" />
          </v-list-tile-avatar>
        </router-link>
      </v-list-tile>
  
<!-- the remaining tiles below G Logo in side nav -->
      <v-list-tile
       v-for="navItems in navItems"
       :key="navItems.icon"
       :to="navItems.link">

        <v-list-tile-action>
         <v-icon 
          class="primary--text"
          id="nav-drawer-icon" 
          v-html="navItems.icon">
         </v-icon>
       </v-list-tile-action>
      </v-list-tile>
    </v-list>
   </v-navigation-drawer>

<!-- nav drawer activated by the three dot -->
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
            <img src="/static/G-logo.svg"/>
           </v-list-tile-avatar>
           <v-list-tile-content>
            <v-list-tile-title id="nav-title">
                Do Good, Easily.
            </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list> 
  
      <v-divider class="mt-1 mb-1"></v-divider>
       <router-link 
        to="/giving" 
        style="text-decoration: none">
         <v-list-tile>
          <v-list-tile-action>
           <v-icon 
            class="secondary--text" 
            id="nav-drawer-icon">
            loyalty
           </v-icon>
          </v-list-tile-action>

           <v-list-tile-content>
           <v-list-tile-title 
            class="secondary--text" 
            id="giving-amount">
             $3000
           </v-list-tile-title>
          </v-list-tile-content>

       </v-list-tile>
      </router-link>
        <v-list-tile
          v-for="navItems in navItems"
          :key="navItems.icon"
          :to="navItems.link">
          <v-list-tile-action>
            <v-icon class="primary--text" id="nav-drawer-icon" v-html="navItems.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title id="nav-drawer-title" v-text="navItems.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon class="primary--text" >exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          v-else
          to="/signin">
          <v-list-tile-action>
            <v-icon class="primary--text" >person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content style="color: #212121" >Sign In</v-list-tile-content>
        </v-list-tile>
      </v-list>

    </v-navigation-drawer>

    <v-toolbar 
    fixed 
    style='background-color: #ffffff;'>
    <v-btn icon @click.stop="drawerMobile = !drawerMobile"><v-icon class="primary--text">more_vert</v-icon></v-btn>
      <v-toolbar-title id='logo'><router-link to='/'
      style="font-family: 'Product Sans';
      color: #212121 !important;
      text-decoration: none;
      font-weight: 600"
      class="ml-0">
      GOOD 
      </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn 
        :to="'/giving'"
        flat 
        id="giving-amount"
        class="mr-3 hidden-sm-and-down secondary--text"
        v-tooltip:bottom="{ html: 'donations raised so far ' }">
          <v-icon class="secondary--text" left>loyalty</v-icon>$3,000
        </v-btn> 
        <template v-if="userHasProfile">
            <create-product :giver="giver"></create-product>
        </template> 
        <v-btn 
        v-if="userHasProfile"
        :to="'/giver/' + userHasProfile"
        fab 
        accent
        style="color: #212121" 
        small 
        class="mr-3">
          <v-icon>person</v-icon>
        </v-btn>    
        <v-btn 
        v-else
        :to="'/signin/'"
        fab 
        style="color: #212121" 
        small 
        class="mr-3">
          <v-icon>person</v-icon>
        </v-btn> 
    </v-toolbar>
   </v-layout> 
</template>

<script>
  export default {
    data () {
      return {
        mini: true,
        drawer: true,
        drawerMobile: false,
        navItems: [
          { icon: 'whatshot', title: 'Featured Products', link: '/products' },
          { icon: 'store', title: 'Featured Givers', link: '/featuredgivers' },
          { icon: 'explore', title: 'Categories', link: '/categories' }
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
      giver () {
        if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
          return this.$store.getters.user.id
        }
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userHasProfile () {
        if (this.$store.getters.user !== null && this.$store.getters.user !== undefined) {
          return this.$store.getters.user.id
        }
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

#giving-amount {
  font-family:'Product Sans';
  font-size: 16px;
  font-weight: 600;
}

#nav-title {
 font-weight: 600; 
 font-size: 16px; 
 font-family:'Product Sans';
}

</style>
