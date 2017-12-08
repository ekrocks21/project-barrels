<template>
  <v-container>
     <v-layout row wrap class="mt-3 mb-3">
      <v-flex xs12 class="mt-2">
       <h4 class="primary--text headline text-xs-center"> Sign In or <span><router-link to="/signup">Sign Up</router-link></span></h4>
      </v-flex>
    </v-layout>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      :append-icon="e1 ? 'visibility_off' : 'visibility'"
                      :append-icon-cb="() => (e1 = !e1)"
                      id="password"
                      v-model="password"
                      :type="e1 ? 'password' : 'text'"
                      required>
                      </v-text-field> 
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn block class="secondary mb-3 mt-3" type="submit" :disabled="loading" :loading="loading">
                      Sign in
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                    <v-card-actions class="pa-0 ma-0">
                      <v-spacer></v-spacer>
                    <!--  <v-dialog>
                    <v-btn icon class="primary--text pa-0 ma-0" slot="activator"
                    v-tooltip:right="{ html: 'Forgot password?' }">
                      <v-icon>help_outline</v-icon>
                    </v-btn>
                    
                    <v-card>
                      <v-card-title>
                        <span class="headline">Reset Password</span>
                      </v-card-title>
                      <v-divider></v-divider>
                      <v-card-text>
                        <v-container>
                          <v-layout wrap>
                            <v-flex xs12>
                              <v-text-field label="Email" id="emailPasswordReset"></v-text-field>
                            </v-flex>
                           </v-layout>
                          </v-container>
                         </v-card-text> 
                         <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn class="primary--text" flat @click="pwReset = false">Close</v-btn>
                          <v-btn class="secondary--text" flat @click="resetPw">Reset</v-btn>
                        </v-card-actions>  
                    </v-card>
                    </v-dialog> -->
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        e1: true,
        email: '',
        password: ''
        // pwReset: false
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignin () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
