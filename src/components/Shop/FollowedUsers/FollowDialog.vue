<template>

    <v-btn small flat class="accent--text" slot="activator" v-if="userIsFollowing" @click="onAgree">
    <v-icon class="hidden-xs-only">person</v-icon><v-icon class="hidden-xs-only">check</v-icon>
    </v-btn>
    <v-btn small class="secondary"  slot="activator" v-else @click="onAgree">
    follow
    </v-btn>
    
</template>

<script>
  export default {
    props: ['shopId'],
    data () {
      return {
        followDialog: false
      }
    },
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