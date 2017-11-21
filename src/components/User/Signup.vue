<template>
  <v-container>
   <v-layout row wrap class="mt-3 mb-3">
      <v-flex xs12 class="mt-2">
       <h4 class="primary--text headline text-xs-center"> Sign Up or <span id="footer-links"><router-link to="/signin">Sign In</router-link></span></h4>
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
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    name="fullName"
                    label="Full Name"
                    id="fullName"
                    v-model="fullName"
                    required
            ></v-text-field>
          </v-flex>
        </v-layout>
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
                      id="password"
                      :append-icon="e1 ? 'visibility_off' : 'visibility'"
                      :append-icon-cb="() => (e1 = !e1)"
                      v-model="password"
                      :type="e1 ? 'password' : 'text'"
                      counter
                      required
                      v-tooltip:right="{ html: '6-digits please!' }" primary></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn block class="secondary" type="submit" :disabled="loading" :loading="loading">
                      Sign up
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
              <v-card-text>
              <p class="text-xs-center primary--text mt-3 mb-0"> By signing up, you agree to GOOD Influence's <router-link to="/terms">Terms of Service</router-link>.</p>
              </v-card-text>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
     <v-card-text style="height: 100px; position: relative">
      <v-dialog v-model="dialog" lazy absolute>
            <v-btn
              absolute
              dark
              fab
              
              top
              right
              style="background-color: #ffffff"
              slot="activator"
            >
              <v-icon class="primary--text">info_outline</v-icon>
            </v-btn>
            <v-card>
              <v-divider></v-divider>
                <v-card-text 
                class="primary--text mt-3">
                Each purchase via 
                  <span 
                    style="font-family:'Product Sans'; 
                    color: #212121; 
                    font-weight:600; 
                    font-size: 16px">
                    GOOD Influence
                  </span> 
                earns a donation.
                </v-card-text>
                  <v-card-text class="primary--text">It's simple - you shop, we earn a commission from Amazon, and then we donate it, <span style="font-weight:600; color: #212121; font-size: 16px; font-family:'Product Sans'">100%.</span>
                    </v-card-text>
                <v-card-actions>

                  <v-spacer></v-spacer>
                  <v-btn class="secondary--text" flat="flat" @click.native="dialog = false">Do Good, Easily</v-btn>
                </v-card-actions>
              </v-card>
           </v-dialog> 
          </v-card-text>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        e1: true,
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dialog: false,
        test: true
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
      onSignup () {
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password, fullName: this.fullName, profileName: this.fullName})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
