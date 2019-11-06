<template>
  <v-card class="mx-auto" minWidth="250px">
    <v-card-title class="roboto-s secondary white--text"
            primary-name>{{ title }}</v-card-title>

    <image-uploader
        hidden
        id="profileSelection"
        :maxWidth="128"
        :maxHeight="128"
        outputFormat="blob"
        accept="image/jpeg,image/x-png"
        @input="onPictureSelected"
    />
    <v-card-text class="my-4">
        <v-row class="align-center justify-center">
            <div class="text-xs-center">
                <v-img height=100 width=100 :src="imageSrc" v-if="imageLoaded"/>
                <v-btn color="primary" fab x-large v-else @click="onAddImage">
                    <v-icon x-large>photo</v-icon>
                </v-btn>
            </div>
        </v-row>
        <v-row class="align-center justify-center mt-4 pa-2">
            <div class="text-xs-center">
                <p v-if="!imageLoaded">
                    Seleziona una foto da caricare..
                </p>
                <p v-else>
                    Ti va bene questa foto?
                </p>
            </div>
        </v-row>
    </v-card-text>
    <v-card-actions>
        <v-btn icon color="primary" v-if="imageLoaded">
            <v-icon>done</v-icon>
        </v-btn>
        <v-spacer/>
        <v-btn icon color="error" @click="remove">
            <v-icon>close</v-icon>
        </v-btn>
    </v-card-actions>
    </v-card>

</template>

<script>

import { mapGetters } from 'vuex'
import usersApi from "@/services/usersApi";

export default {
    name: "UserPhotoInsertion",
    data: () => ({
        title: "Foto profilo",
        imageSrc: null
    }),
    computed: {
        imageLoaded : function() {
            return this.imageSrc != null
        },
        ...mapGetters({
            'user' : 'user/userProfile'
        })
    },
    methods: {
        onPictureSelected: function(output) {
            var objectURL = URL.createObjectURL(output);
            console.log(output)
            this.imageSrc = objectURL;
            console.log(this.user)
            usersApi.insertPicture(output, this.user.firebase_uid)
        },
        onAddImage: function() {
            document.getElementById("profileSelection").click();
        },
        remove: function() {
            this.imageSrc = null
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#fileInput {
  display: none;
}

</style>
