<template>

    <v-btn class="primary"  slot="activator" v-if="userIsFollowing" @click="onAgree">
    <v-icon left dark>remove</v-icon>
      unfollow
    </v-btn>
    <v-btn class="secondary"  slot="activator" v-else @click="onAgree">
    <v-icon left dark> add </v-icon>
      Follow
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