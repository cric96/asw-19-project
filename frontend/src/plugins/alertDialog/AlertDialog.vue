<template>
<v-dialog
    value="true"
    max-width="290"
    >
        <v-card>
            <v-card-title class="headline">Use Google's location service?</v-card-title>

            <v-card-text>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
            </v-card-text>

            <v-card-actions>
            <v-btn
                color="green"
                text
                @click="dialog = false" >
                {{negativeButtonText}}
            </v-btn>
            
            <v-spacer></v-spacer>
            <v-btn
                color="green"
                text
                @click="dialog = false"
            >
                {{neutralButtonText}}
            </v-btn>
                
            <v-btn
                color="green"
                text
                @click="dialog = false"
            >
                {{positiveButtonText}}
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { VCard, VCardActions, VCardText, VDialog, VIcon, VSpacer, VBtn } from 'vuetify/lib'

export default {
    props: {
        positiveButtonText: String,
        negativeButtonText: String,
        neutralButtonText: String
    },
    data: () => ({
        value: false
    }),
    components: {
        VCard,
        VCardActions,
        VCardText,
        VDialog,
        VIcon,
        VSpacer,
        VBtn
    }
}
</script>