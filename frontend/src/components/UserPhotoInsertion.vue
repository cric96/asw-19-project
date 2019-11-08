<template>
    <v-dialog v-model="value" persistent transition="dialog-bottom-transition" max-width="300px">
    <image-uploader
            hidden
            id="profileSelection"
            :maxWidth="128"
            :maxHeight="128"
            outputFormat="blob"
            accept="image/jpeg,image/x-png"
            @input="onPictureSelected"
    />
    <v-card class="mx-auto" minWidth="250px" :loading="loading">
            <alert v-model="error" ref="alert" class="mb-n1"/>
            <v-card-title class="roboto-s secondary white--text" primary-name>
                {{ title }}
            </v-card-title>
            <v-card-text class="my-4">
                <v-row class="align-center justify-center">
                    <div class="text-xs-center">
                        <v-avatar size=70 v-if="imageLoaded" class="elevation-6">
                            <v-img :src="imageSrc" />
                        </v-avatar>
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
                <v-spacer/>
                <v-btn class="mr-2" icon color="primary" v-if="imageLoaded" @click="onConfirm">
                    <v-icon>done</v-icon>
                </v-btn>
                <v-btn icon color="error" @click="close">
                    <v-icon>close</v-icon>
                </v-btn>
                <v-spacer/>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import usersApi from "@/services/usersApi";
import AlertMessageComponent from './AlertMessageComponent'
export default {
    name: "UserPhotoInsertion",
    components: {
        'alert' : AlertMessageComponent
    },
    data: () => ({
        title: "Foto profilo",
        imageSrc: null,
        imageData : null,
        loading : false,
        value : false,
        error : false,
    }),
    computed: {
        ...mapGetters ({
            'user' : 'user/userProfile'
        }),
        imageLoaded : function() {
            return this.imageSrc != null
        },
    },
    methods: {
        ...mapActions({
            'invalidatePicture' : 'user/invalidatePicture'
        }),
        open: function() {
            this.value = true
            this.imageSrc = null
            this.loading = false
            this.error = false
        },
        close: function() {
            this.value = false
        },
        onPictureSelected: function(output) {
            var objectURL = URL.createObjectURL(output);
            this.imageSrc = objectURL;
            this.imageData = output
        },
        onAddImage: function() {
            document.getElementById("profileSelection").click();
        },
        onConfirm: function() {
            this.loading=true
            usersApi.insertPicture(this.imageData, this.user.firebase_uid)
                .then(() => {
                    this.invalidatePicture()
                    this.value = false
                })
                .catch(err => {
                    this.error = true
                    this.loading = false
                    this.imageSrc =  null,
                    this.$refs.alert.showError("Immagine non caricata...")
                })
        }
    }
};
</script>

<style>
#fileInput {
  display: none;
}

</style>
