<template>
    <v-layout row wrap align-center justify-center>
        <pacman :loading="waitingImage" size=70 :color=primaryColor></pacman>
        <!-- Qua pensa di fare un componente??-->        
        <v-card
            class="mx-auto"
            max-width="400"
            v-if="resultReiceved"
        >
            <v-img
                class="white--text"
                height="200px"
                width="200px"
                src="https://image.flaticon.com/icons/svg/1039/1039778.svg"
            >
                
            </v-img>
            <v-card-title class="align-end fill-height">{{category}}</v-card-title>
            <v-card-text>
            <p> Do you agree?</p>
            </v-card-text>

            <v-card-actions>
            <v-btn icon> <v-icon>done</v-icon></v-btn>
            <v-btn icon> <v-icon>close</v-icon></v-btn>
            </v-card-actions>
        </v-card>

    </v-layout>
</template>
<script>
import { Prediction} from '@/services/mockApiPrediction'
import  color  from '@/plugins/vuetify'
import { PacmanLoader } from '@saeris/vue-spinners'
import { functions } from 'firebase';
export default {
    data: () => ({
        waitingImage : true,
        primaryColor : color.preset.theme.themes.light.primary,
        category: ''
    }),
    computed: {
        resultReiceved: function() {
            return !this.waitingImage
        }
    },
    props: {
        img : File
    },
    components: {
        'pacman' : PacmanLoader
    },
    mounted() {
            Prediction.predict(this.img).then(res => {
                //todo IMPROVE HERE
                console.log(res)
                this.waitingImage = false
                this.category = res
            })
    }    
}
</script>