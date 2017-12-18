<template>
<v-dialog v-model="updateGiverDialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
  <v-btn v-tooltip:left="{ html: 'update profile' }" fab small dark slot="activator" >
    <v-icon>mode_edit</v-icon>
  </v-btn>
  <v-card class="secondary">
    <v-toolbar dense flat class="secondary">

      <v-toolbar-title style="color: #ffffff; font-family:'Product Sans'">GOOD Influence</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat @click.native="updateGiverDialog = false" dark>
        close
      </v-btn>
    </v-toolbar>
  <v-container>
     <v-layout row class="mt-0 mb-0">
      <v-flex xs12 sm8 offset-sm2>
        <v-card class="mb-0">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 mt-5 mb-0>
        <h5 style="color: #212121">Edit your profile</h5>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onSaveChanges">
            
         <!-- Update Profile Image   
          <v-layout row ml-4 mr-4>
            <v-flex xs12 sm6 offset-sm3>
                
              <img 
              v-if="onFilePicked" 
              @click="onPickFile" 
              id="uploadProfileImage" 
              :src="userProfile.profileImage" 
              class="mt-3 mb-0 ">
               
                <input 
                type="file" 
                style="display: none" 
                ref="fileInput" 
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>   

          -->   
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 >
              <v-text-field
                name="fullName"
                label="Name"
                id="fullName"
                v-model="updatedUserFullName"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 >
              <v-text-field
                name="username"
                label="Username"
                id="userName"
                v-model="updatedUserName"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 >
              <v-text-field
                name="userWebsite"
                label="Website"
                id="userWebsite"
                v-model="updatedUserWebsite"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 >
              <v-text-field
                name="userBio"
                label="Bio"
                id="userBio"
                v-model="updatedUserBio"
                ></v-text-field>
            </v-flex>
          </v-layout>     
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mt-5>
              <v-btn
              block
                class="secondary mb-5"
                @click="onSaveChanges"
                @click.native="updateGiverDialog = false"
                >Save Changes</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
    </v-card>
    </v-flex>
    </v-layout>
  </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['giver'],
  data () {
    return {
      updateGiverDialog: false,
      updatedUserFullName: this.giver.userFullName,
      updatedUserName: this.giver.userName,
      updatedUserWebsite: this.giver.userWebsite,
      updatedUserBio: this.giver.userBio
    }
  },
  methods: {
    onSaveChanges () {
      if (this.updatedUserFullName.trim() === '' || this.updatedUserName.trim() === '' || this.updatedUserWebsite.trim() === '' || this.updatedUserBio.trim() === '') {
        return
      }
      this.updateGiverDialog = false
      this.$store.dispatch('updateGiverData', {
        id: this.giver.id,
        userFullName: this.updatedUserFullName,
        userName: this.updatedUserName,
        userWebsite: this.updatedUserWebsite,
        userBio: this.updatedUserBio
      })
    }
  }
}
</script>

<!-- <style scoped>

#uploadProfileImage {
  height: 75px;
  width: 75px;
  border-radius: 50%;
  cursor: pointer;
}

#uploadedProfileImage {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  cursor: pointer;
}

</style> -->