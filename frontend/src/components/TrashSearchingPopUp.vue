<template>
    <div>
        <v-dialog v-model="value" persistent transition="dialog-bottom-transition" max-width="300px">
            <v-card
                v-if=waitingImage 
                loading="secondary"
                loader-height=7
            >
              <v-card-title class="justify-center">
                  Ricerca in corso..
              </v-card-title>
            </v-card>    
            <v-card
                class="mx-auto"
                max-width="300" 
                v-if="resultReceived && !resNotFound"
            >
                <v-flex>
                    <v-img
                        class="white--text mx-auto"
                        height="200px"
                        width="300px"
                        :src=category.url
                    />
                </v-flex>
                <v-card-title class="align-end fill-height">{{category.name}}</v-card-title>
                <v-card-text>
                <p>Confermi?</p>
                </v-card-text>

                <v-card-actions>
                <v-btn icon @click="onAccept"><v-icon>done</v-icon></v-btn>
                <v-btn icon @click="close"> <v-icon>close</v-icon></v-btn>
                </v-card-actions>
            </v-card>
            <v-card
                class="mx-auto"
                max-width="300" 
                v-if="resultReceived && resNotFound"
            >
                <v-card-title class="justify-center">
                    <v-icon size=70>sentiment_dissatisfied</v-icon> 
                </v-card-title>
                 
               
                <v-card-title class="justify-center">Rifiuto non riconosciuto..</v-card-title>
                <v-card-actions class="justify-center">
                    <v-btn icon @click="close"> <v-icon>done</v-icon></v-btn>
                </v-card-actions> 
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import prediction from '@/services/predictionApi'
import  color  from '@/plugins/vuetify'
import { ScaleLoader } from '@saeris/vue-spinners'
import { functions } from 'firebase';
import { createNamespacedHelpers } from 'vuex'

const { mapActions } = createNamespacedHelpers('trashCategories');
const CATEGORY_FOUND = 0

export default {
    data: () => ({
        value: false,
        waitingImage : true,
        primaryColor : color.preset.theme.themes.light.primary,
        category : '',
        resNotFound : false
    }),
    computed: {
        resultReceived: function() {
            return !this.waitingImage
        }        
    },
    methods: {
        ...mapActions([
            'categoryByName'
        ]),
        onAccept() {
            this.value = false
            this.$store.dispatch('msg/addMessage', 'Hai guadagnato ' + this.category.score + ' punti')
            this.close()
        },
        open() {
            this.value = true
        },
        close() {
            this.value = false
            this.category = ''
            this.waitingImage = true
            this.resNotFound = false
        },
        barcodePrediction(img) {
            this.manageResult(prediction.barcodePredict(img))
        },
        aiPrediction(img) {
            this.manageResult(prediction.aiPredict(img))                
        },
        manageResult(promise) {
            promise.then(res => {
                if(res.data.status != 0) {
                    this.resNotFound = true
                } else {
                    this.categoryByName(res.data.category).then(cf => {
                        this.category = cf
                    })
                }
            })
            .catch(err => this.resNotFound = true)
            .finally(() => this.waitingImage = false)
        }
    },
    components: {
        'scale-loader' : ScaleLoader
    }

}
</script>