<template>
<!-- Create product Dialog in Header -->
<v-dialog 
 v-model="createProductDialog" 
 fullscreen 
 transition="dialog-bottom-transition" 
 :overlay=false>
  <v-btn 
   v-tooltip:bottom="{ html: 'start giving' }" 
   fab 
   small 
   class="secondary" 
   slot="activator">
    <v-icon 
     style="color:#ffffff">
     add
    </v-icon>
  </v-btn>

<!-- Card that appears after clicking create product dialog -->
  <v-card class="secondary">
<!-- toolbar within the create product dialog card -->    
    <v-toolbar 
     flat 
     class="secondary">
      <v-toolbar-title id ="create-product-dialog-toolbar-title">
        GOOD Influence
      </v-toolbar-title>
      <v-spacer></v-spacer>
<!-- close the create product dialog -->      
      <v-btn 
       flat 
       @click.native="createProductDialog = false" 
       dark>
        close
      </v-btn>
    </v-toolbar>

<!-- beneath the toolbar in create product dialog -->    
  <v-container>
     <v-layout row class="mt-5">
      <v-flex xs12 sm8 offset-sm2>
        <v-card>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 mt-5 mb-3>
        <h5 style="color: #212121">Add a product &amp; start giving</h5>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateProduct">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 >
              <v-text-field
                name="productName"
                label="Search for a product..."
                id="productName"
                prepend-icon="search"
                v-model="productName"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="productUrl"
                label="Paste a link..."
                id="productUrl"
                prepend-icon="link"
                v-model="productUrl"
                ></v-text-field>
            </v-flex>
          </v-layout>      
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 mt-5>
              <v-btn
              block
                class="secondary mb-5"
                @click.native="createProductDialog = false"
                type="submit">Create Product</v-btn>
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
        createProductDialog: false,
        productName: '',
        productDescription: 'Doing Good, Easily',
        productPrice: '$200',
        productUrl: '',
        productImage: 'https://firebasestorage.googleapis.com/v0/b/barrels-646b4.appspot.com/o/users%2Fdefaultcoverimage.svg?alt=media&token=667bd3da-f429-40bb-b60e-016e1fd11dd1'
      }
    },
    computed: {
      formIsValid () {
        return this.productName !== '' && this.productDescription !== '' && this.productPrice !== '' &&
         this.productUrl !== '' && this.productImageUrl !== ''
      }
    },
    methods: {
      onCreateProduct () {
        if (!this.formIsValid) {
          return
        }
        const productData = {
          giver: this.giver,
          productName: this.productName,
          productDescription: this.productDescription,
          productPrice: this.productPrice,
          productUrl: this.productUrl,
          productImage: this.productImage
        }
        this.$store.dispatch('createProduct', productData)
      }
        /*
      onPickFile () {
        this.$refs.fileInput.click()
      }
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please upload a png or jpg file.')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.productImageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.productImage = files[0]
      } */
    }
  }
</script>

<style scoped>

#create-product-dialog-toolbar-title {
  color: #ffffff; 
  font-family:'Product Sans';

}


</style>