<template>
<v-dialog v-model="addProductDialog" fullscreen transition="dialog-bottom-transition" :overlay=false>
  <v-btn v-tooltip:right="{ html: 'add product' }" fab small accent slot="activator" >
    <v-icon>add</v-icon>
  </v-btn>
  <v-card>
    <v-toolbar dark class="primary">
      <v-btn icon @click.native="addProductDialog = false" dark>
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title style="font-family:'Product Sans'">GOOD Influence</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  <v-container>
     <v-layout row>
      <v-flex xs12 sm10 offset-sm1>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 mt-5 mb-3>
        <h4 class="headline primary--text" style="font-family: 'Product Sans'" >Add a Product</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateProduct">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="productName"
                label="Product Name"
                id="productName"
                v-model="productName"
                ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="productDescription"
                label="Description"
                id="productDescription"
                textarea
                rows="3"
                v-model="productDescription"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="productPrice"
                label="Price"
                prefix="$"
                type="number"
                id="productPrice"
                v-model="productPrice"
                ></v-text-field>
            </v-flex>
          </v-layout>  
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="productUrl"
                label="Product Url"
                id="productUrl"
                v-model="productUrl"
                ></v-text-field>
            </v-flex>
          </v-layout> 
          <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-select
              v-bind:items="productCategory"
              v-model="productCategory"
              label="Choose"
              single-line
              item-text="productCategory"
              :hint="`${productCategorySelect.productCategory}`"
              persistent-hint
            ></v-select>
          </v-flex>
        </v-layout>        
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="productImageUrl" height="150" class="mt-3 mb-0 ">
               <v-btn raised small class="primary--text" @click="onPickFile">Upload Image</v-btn>
                <input 
                type="file" 
                style="display: none" 
                ref="fileInput" 
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>      
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                class="secondary mb-5"
                @click.native="addProductDialog = false"
                :disabled="!formIsValid"
                type="submit">Create Product</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
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
        productUrl: '',
        productImageUrl: '',
        productImage: null,
        productCategorySelect: { productCategory: 'Category' },
        productCategory: [
          { productCategory: 'Women' },
          { productCategory: 'Men' },
          { productCategory: 'Kids' },
          { productCategory: 'Pets' }
        ]
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
          shopId: this.shop.id,
          productName: this.productName,
          productDescription: this.productDescription,
          productPrice: this.productPrice,
          productUrl: this.productUrl,
          productCategory: this.productCategory,
          productImage: this.productImage
        }
        this.$store.dispatch('createProduct', productData)
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
          this.productImageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.productImage = files[0]
      }
    }
  }
</script>
