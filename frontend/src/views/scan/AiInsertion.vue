<template>
    <v-layout row wrap align-center justify-center>
        <pacman :loading="waitingImage" size=70 :color=primaryColor></pacman>
    </v-layout>
</template>
<script>
import { Prediction} from '@/services/mockApiPrediction'
import  color  from '@/plugins/vuetify'
import { PacmanLoader } from '@saeris/vue-spinners'
export default {
    data: () => ({
        waitingImage : true,
        primaryColor : color.preset.theme.themes.light.primary
    }),
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
            })
            
    }    
}
</script>