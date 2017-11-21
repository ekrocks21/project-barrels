<template>

    <v-btn 
      v-tooltip:right="{ html: 'unfollow shop' }" 
      small 
      flat 
      class="accent--text" 
      slot="activator" 
      v-if="userIsFollowing" @click="onAgree">
        <v-icon 
        class="primary--text">
        person
        </v-icon>
        <v-icon 
        class="primary--text">
        check
        </v-icon>
    </v-btn>
    
    <v-btn 
    flat
    v-tooltip:right="{ html: 'follow shop' }"
    small 
    slot="activator" 
    v-else @click="onAgree"
    class="secondary--text">
    <v-icon class="primary--text"> add</v-icon>
    <v-icon class="primary--text">person</v-icon>
    </v-btn>
    
</template>

<script>
  export default {
    props: ['shopId'],
    computed: {
      shop () {
        return this.$store.getters.loadedShop(this.shopId)
      },
      userIsFollowing () {
        return this.$store.getters.user.followedUsers.findIndex(shopId => {
          return shopId === this.shopId
        }) >= 0
      }
    },
    methods: {
      onAgree () {
        if (this.userIsFollowing) {
          this.$store.dispatch('unfollowUserFromShop', this.shopId)
        } else {
          this.$store.dispatch('followUserForShop', this.shopId)
        }
      }
    }
  }
</script>