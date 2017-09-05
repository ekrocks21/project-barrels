<template>
<v-dialog v-model="addProductDialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
 <v-btn fab small accent slot="activator" >
 	<v-icon>add</v-icon>
 </v-btn>
 <v-card>
 <v-toolbar dark class="info">
    <v-btn icon @click.native="addProductDialog = false" dark>
      <v-icon>close</v-icon>
    </v-btn>
    <v-toolbar-title style="font-family:'Product Sans'">GOOD Influence</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click.native="addProductDialog = false">Save</v-btn>
          </v-toolbar-items>
 </v-toolbar>
  <v-container fluid style="background-color: #fafafa">
   <v-layout row wrap>
   	<v-flex xs12 sm8 offset-sm2>
   		<v-card-title>Add a Product</v-card-title>
   	</v-flex>
   </v-layout>
   <v-layout row wrap>
   	 <v-flex xs12 sm8 offset-sm2>
   	 	<v-card-text>
   	 	  <v-text-field
                name="productName"
                label="Product Name"
                id="productName"
                v-model="productName"
                >
            </v-text-field>
            <v-text-field
                name="productPrice"
                label="Price"
                id="productPrice"
                v-model="productPrice">
             </v-text-field>
            <v-layout row wrap>
            <v-flex xs12>
              <img :src="productImageUrl" height="150" class="mt-3 mb-3 ">
            </v-flex>
          </v-layout>
              <v-btn raised class="secondary--text" @click="onPickFile">Upload Image</v-btn>
                <input 
                type="file" 
                style="display: none" 
                ref="fileInput" 
                accept="image/*"
                @change="onFilePicked">
             <v-text-field
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="editedDescription">
             </v-text-field>
   	 	</v-card-text>
   	 </v-flex>
   </v-layout>
   <v-layout row wrap>
   	 <v-flex xs12 sm8 offset-sm2>
   	  <v-card-actions>
   	  	<v-btn flat class="primary--text" @click="addProductDialog = false">Close</v-btn>
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
        addProductDialog: false,
        productName: '',
        productDescription: '',
        productPrice: '',
        productImageUrl: '',
        image: null
      }
    },
    methods: {
      onCreateProduct () {
        if (!this.formIsValid) {
          return
        }
        const productData = {
          productName: this.productName,
          productDescription: this.productDescription,
          productPrice: this.productPrice,
          productimage: this.image
        }
        this.$store.dispatch('createProduct', productData)
        this.$router.push('/shops')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please upload a png or jpg file.')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      },
      onSaveChanges () {
        if (this.productName.trim() === '' || this.productPrice.trim() === '' || this.productDescription.trim() === '') {
          return
        }
        this.addProductDialog = false
        this.$store.dispatch('updateProductData', {
          id: this.shop.id,
          productName: this.addProductName,
          productDescription: this.addProductDescription,
          productPrice: this.addProductPrice
        })
      }
    }
  }
</script>



