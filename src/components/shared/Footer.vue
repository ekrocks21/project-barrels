<template>
  <v-footer id="footer">
    <span id="footer-links"><router-link to="/about">About</router-link></span> 
    <span id="footer-links"><router-link to="/createshop">Become a Giver</router-link></span> 
    <v-spacer></v-spacer>
      <span id="footer-links-last">&copy; 2017 GOOD Influence</span>
  </v-footer>
</template>

<style scoped>
  #footer {
  height: 120px;
  background-color: #ffffff !important;
  }
  #footer-links {
    padding: 30px;
    color: #bec6ca;
    font-family: 'Roboto Mono', monospace;
    text-transform: uppercase;
    font-weight: 400;
    text-decoration: none;
  }
  #footer-links-last {
    padding: 30px;
    text-align: right;
    color: #bec6ca;
    font-family: 'Roboto Mono', monospace;
  }

  a {
    color:#bec6ca !important;
    text-decoration: none;
  }

  a:hover {
    color: #212121 !important;
  }
</style>
