<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Complete User Profile info</span>
      </v-card-title>
      <v-card-text>
        <v-container v-if="show">
          <v-row  v-for="(value, propertyName) in simpleUser" :key="propertyName">
            <v-col cols="12" sm="6" md="4">
              <v-text-field :v-model="finalUser.propertyName" :label="''+ propertyName" :value="''+value!=null?value:''" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="continueSaving">Continue</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import User from "../../model/user";
import { functions } from 'firebase';
export default {
  props: {
    user: {
      type: User,
      required: true
    },
    visible: Boolean
  },
  data: function (){
    return {
      finalUser: {}
    }
  },
  mounted: function () {
    if(this.user!= null){
      this.finalUser = this.user
    }
    console.log(this.finalUser)
    console.log(this.user)
    console.log(this.show)

  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(visible) {
        if(!visible){
          this.$emit('close');
        }
      }
    },
    simpleUser: function() {
      return {
        name: (this.user!=null)?this.user.name:'',
        surname: (this.user!=null)?this.user.surname:'',
        email: (this.user!=null)?this.user.email:'',
        nickname: (this.user!=null)?this.user.nickname:''
      };
    }
  },
  methods:{
    continueSaving: function(){
      console.log(this.finalUser)
      //console.log(usersapi.create_user(user));
      this.show=false;
      //this.$router.replace("/dashboard");

    }
  }
};
</script>

