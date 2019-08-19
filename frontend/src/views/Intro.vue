<template>
  <v-container>
    <v-layout align-center justify-center>
    <!--TODO. use src set for dimension-->
    <v-flex xs12>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        ></v-img>
      </v-flex>

    </v-layout>
    <v-layout row wrap align-center justify-center   width: 50%>
      <v-flex>
        <v-btn text color="teal" dark  :key="signup" :to="'/sign-up'">
              <v-icon left>face</v-icon> Registrati
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap align-center justify-center   width: 50%>
      <v-flex>
        <v-btn text color="teal" dark :key="login" :to="'/login'">
              <v-icon left>no_encryption</v-icon> Accedi
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>