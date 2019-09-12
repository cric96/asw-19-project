<template>
    <v-layout row wrap align-center justify-center>
        <pacman :loading="waitingImage" size=70 :color=primaryColor></pacman>
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
import prediction from '@/services/predictionApi'
import  color  from '@/plugins/vuetify'
import { PacmanLoader } from '@saeris/vue-spinners'
import { functions } from 'firebase';
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('trashCategories');

const CATEGORY_FOUND = 0
export default {
    data: () => ({
        waitingImage : true,
        primaryColor : color.preset.theme.themes.light.primary,
        category : '',
        accept: false,
        resNotFound : false
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
        },
        ...mapActions([
            'categoryByName'
        ])
    },
    props: {
        img : File
    },
    components: {
        'pacman' : PacmanLoader
    },
    mounted() {
            prediction.aiPredict(this.img).then(res => {
                this.waitingImage = false 
                if(res.data.status != CATEGORY_FOUND) {
                   this.resNotFound = true
                } else {
                    this.categoryByName(res.data.category).then(cf => {
                        this.category = cf
                    })
                }
            }).catch(err => this.resNotFound = true)
    }    
}
</script>