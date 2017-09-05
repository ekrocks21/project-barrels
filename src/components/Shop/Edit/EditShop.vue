<template>
<v-dialog width="350px" persistent v-model="editDialog">
 <v-btn fab small accent slot="activator" v-tooltip:left="{ html: 'edit shop' }" >
 	<v-icon>edit</v-icon>
 </v-btn>
 <v-card>
  <v-container>
   <v-layout row wrap>
   	<v-flex xs12>
   		<v-card-title>Edit Shop</v-card-title>
   	</v-flex>
   </v-layout>
   <v-divider></v-divider>
   <v-layout row wrap>
   	 <v-flex xs12>
   	 	<v-card-text>
   	 	  <v-text-field
                name="shopName"
                label="Shop Name"
                id="shopName"
                v-model="editedShopName"
                >
            </v-text-field>
            <v-text-field
                name="tagLine"
                label="Tagline"
                id="tagLine"
                v-model="editedTagLine"
                >
             </v-text-field>
             <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="editedDescription">
             </v-text-field>
             <v-text-field
                name="location"
                label="Location"
                id="location"
                v-model="editedLocation">
             </v-text-field>
   	 	</v-card-text>
   	 </v-flex>
   </v-layout>
   <v-divider></v-divider>
   <v-layout>
   	 <v-flex>
   	  <v-card-actions>
   	  	<v-btn flat class="primary--text" @click="editDialog = false">Close</v-btn>
   	  	<v-btn flat class="secondary--text" @click="onSaveChanges">Save</v-btn>
   	  </v-card-actions>
   	 </v-flex>
   </v-layout>
  </v-container>
  </v-card>
</v-dialog>

</template>

<script>
  export default {
    props: ['shop'],
    data () {
      return {
        editDialog: false,
        editedShopName: this.shop.shopName,
        editedTagLine: this.shop.tagLine,
        editedDescription: this.shop.description,
        editedLocation: this.shop.location
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedShopName.trim() === '' || this.editedTagLine.trim() === '' || this.editedDescription.trim() === '' || this.editedLocation.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateShopData', {
          id: this.shop.id,
          shopName: this.editedShopName,
          tagLine: this.editedTagLine,
          description: this.editedDescription,
          location: this.editedLocation
        })
      }
    }
  }
</script>



