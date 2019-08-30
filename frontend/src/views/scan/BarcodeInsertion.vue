<template>
    <v-layout row wrap align-center justify-center>
        <barcode-animation :loading="waitingImage" size=70 :color=primaryColor></barcode-animation>
        <!-- Qua pensa di fare un componente??-->
        <v-card
            class="mx-auto"
            max-width="400"
            v-if="resultReceived && !resNotFound"
        >
            <v-img
                class="white--text"
                height="200px"
                width="200px"
                :src=category.url
            >
                
            </v-img>
            <v-card-title class="align-end fill-height">{{category.name}}</v-card-title>
            <v-card-text>
            <p>Confermi?</p>
            </v-card-text>

            <v-card-actions>
            <v-btn icon @click="onDoneClicked"><v-icon>done</v-icon></v-btn>
            <v-btn icon to="/dashboard"> <v-icon>close</v-icon></v-btn>
            </v-card-actions>
        </v-card>
        <v-card
            class="mx-auto"
            max-width="400"
            v-if="resultReceived && resNotFound"
        >
            <v-layout row wrap align-center justify-center>
                <v-icon size=70>sentiment_dissatisfied</v-icon>  
            </v-layout>
            <v-card-title class="align-end fill-height">Rifiuto non riconosciuto..</v-card-title>
            <v-layout row wrap align-center justify-center>
                <v-card-actions>
                    <v-btn icon to="/dashboard"> <v-icon>done</v-icon></v-btn>
                </v-card-actions>
            </v-layout> 
        </v-card>
    </v-layout>
</template>
<script>
import { BarcodeResearch } from '@/services/mockApiBarcode'
import  color  from '@/plugins/vuetify'
import Loader from '@/components/BarcodeLoader'
import { functions } from 'firebase';
export default {
    data: () => ({
        waitingImage : true,
        primaryColor : color.preset.theme.themes.light.primary,
        category : '',
        accept: false,
        resNotFound : false,
        imageURL: ''
    }),
    computed: {
        resultReceived: function() {
            return !this.waitingImage
        }
    },
    methods: {
        onDoneClicked() {
            this.$emit("score-received", this.category.score)
            this.$router.push("/dashboard")
        }
    },
    props: {
        img : File
    },
    components: {
        'barcode-animation' : Loader
    },
    mounted() {
            console.log(this.img)
            this.imageURL = URL.createObjectURL(this.img)
            BarcodeResearch.search(this.img).then(res => {
                this.waitingImage = false 
                if(!res) {
                   this.resNotFound = true
                } else {      
                    this.category = res
                }
            })
    }    
}
</script>
