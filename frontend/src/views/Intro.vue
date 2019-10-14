<template>
  <v-container fluid class="container_background" >
    <!--<v-layout align-center justify-center >
      <v-flex lg3 md4 sm7 xs10>
        <v-img :src="require('@/assets/logo.png')" class="mx-auto" height="300" width="300" style="background-color:rgba(255,255,255,0.8);border-radius: 50%"></v-img>
        <v-row>
            <v-col align="center" class="pr-sm-1">
                <v-btn color="teal" block dark :to="'/sign-up'">
                  <v-icon left>face</v-icon>Register
                </v-btn>
            </v-col>
            <v-col align="center" class="pl-sm-1">
                <v-btn color="teal" block dark :to="'/login'">
                  <v-icon left>no_encryption</v-icon>Sign in
                </v-btn>                                                                                       
            </v-col>
          </v-row>
          <v-row>
            <social-login></social-login>
          </v-row>
      </v-flex>
    </v-layout>-->
    <v-layout row wrap>
      <v-flex xs12 sm8 md6 >
        <v-layout wrap justify-center align-center >     
          <v-img :src="require('@/assets/logo.png')"  height="250" width="250" contain style="background-color:rgba(255,255,255,0.2);" ></v-img> 
        </v-layout>       
      </v-flex>
      <v-flex xs12 sm8 md6>
        <router-view/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import SocialLogin from "@/components/authentication/SocialLogin";
import Login from "@/views/user/Login";


export default {
  components: {
    "social-login": SocialLogin,
    "login": Login
  },
  mounted: function () {
    this.$router.replace("/login")
  }
};
</script>

<style>
.btn {
  width: 100%;
}
</style>


