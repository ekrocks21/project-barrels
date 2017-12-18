<template>
<v-app>
  <v-container fluid>
	<v-layout class="mt-5">
    <v-flex xs12 sm12>
      <v-card flat tile class=" mb-5">
        <v-card-media style="background-color:#fafafa" height="400px" width="100%">
    
            <h1 
            style="text-align: center; 
            color: #212121; 
            margin-top:10%; 
            font-family: 'Product Sans'"
            >$3,000.
            </h1>

            <h4 style="
            color: #212121; 
            text-align: center;
            font-weight: 300;
            font-size: 23px;
            line-height: 28px;
            margin: 0 auto;"
            class="mt-5">
            Good Influence is making real impact -- learn how.
                         </h4>      
        </v-card-media>
        <v-card-actions style="background-color: #fafafa">
              <v-btn onClick="document.getElementById('howtodogood').scrollIntoView();" class="secondary--text" style="margin: 0 auto" v-tooltip:bottom="{ html: 'how we give back' }" fab><v-icon>keyboard_arrow_down</v-icon></v-btn>  
        </v-card-actions>
        
      </v-card>
    </v-flex>
  </v-layout>


  
  </v-container> 
  </v-app>
</template>
<script>
</script>

<style>
</style>