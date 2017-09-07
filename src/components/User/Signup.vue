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
                    name="displayName"
                    label="Full Name"
                    id="displayName"
                    v-model="displayName"
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
                    <v-btn class="secondary" type="submit" :disabled="loading" :loading="loading">
                      Sign up
                       <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
              <v-card-text>
              <p class="text-xs-center primary--text mt-3 mb-0"> By signing up, you agree to GOOD Influence's Terms of Service and Privacy Policy.</p>
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
              class="info"
              slot="activator"
            >
              <v-icon>info_outline</v-icon>
            </v-btn>
            <v-card>
        <v-card-title>
          <div class="headline">Have a favorite cause?</div>
        </v-card-title>
        <v-card-text>Create an account, promote items you enjoy, and raise money for your favorite cause.</v-card-text>
         <v-card-text>It's that simple!</v-card-text> 
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="info--text darken-1" flat="flat" @click.native="dialog = false"><v-icon left class="info--text">favorite_outline</v-icon>Get Started</v-btn>
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
        displayName: '',
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
        this.$store.dispatch('signUserUp', {email: this.email, password: this.password, displayName: this.displayName})
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
