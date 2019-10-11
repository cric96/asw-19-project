<template>
    <div>
        <!-- v-dialog openining is control by value-->
        <v-dialog v-model="value" persistent transition="dialog-bottom-transition" max-width="300px">
            <v-card
                v-if=waitingPrediction 
                loading= "secondary"
                loader-height= 7
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
                        :src="category.image"
                    />
                </v-flex>
                <v-card-title class="align-end fill-height">{{category.name}}</v-card-title>
                
                <v-card-text>
                <p>Va in <em class="font-italic font-weight-bold"> {{ binName }} </em> </p>
                <p v-if="aiMode">Confermi?</p>
                </v-card-text>

                <v-card-actions class="justify-center">
                <v-btn icon @click="onAccept" :loading="waitingTrashInsertion"><v-icon>done</v-icon></v-btn>
                <v-btn v-if="aiMode" icon @click="close"> <v-icon>close</v-icon></v-btn>
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
import { createNamespacedHelpers } from 'vuex'
import trashesApi from '@/services/trashesApi'
const { mapActions } = createNamespacedHelpers('trashCategories')
const { mapGetters } = createNamespacedHelpers('building')

export default {
    data: () => ({
        value: false, //true the dialog is opened, false the dialog is closed
        waitingPrediction : true, //after rest api call to prediction server, client show loading until the trash category is returned
        category : '', //the category found
        binName: '', //the bin where the trash must be thrown
        resNotFound : false, //if the prediction don't found category, show error
        aiMode : false, //ai mode has more information (you can refuse a category predicted)
        waitingTrashInsertion : false //after rest api call to backend server, client show loading until the trash is insert
    }),
    computed: {
        resultReceived: function() { 
            return !this.waitingPrediction
        },
        ...mapGetters([
            'binFromTrashCategoryName'
        ])        
    },
    methods: {
        ...mapActions([
            'categoryByName'
        ]),
        onAccept() { //after click on accept, the client sent the trash category to the server to add the new trash
            this.waitingTrashInsertion = true
            let buildingId = this.$store.state.building.activeBuilding
            trashesApi.insertTrash(buildingId, { "name" : this.category.name })
                .then(() => {
                    this.$store.dispatch('msg/addMessage', 'Hai guadagnato ' + this.category.score + ' punti')
                    this.$store.commit('auth/updateScore', this.category.score)
                })
            .finally(() => {
                this.waitingTrashInsertion = false
                this.close()
            })
        },
        open() {
            this.value = true
        },
        close() {
            //close reset the value to a initial state
            this.value = false
            this.category = ''
            this.waitingPrediction = true
            this.resNotFound = false
        },
        barcodePrediction(img) {
            this.manageResult(prediction.barcodePredict(img))
            this.aiMode = false
        },
        aiPrediction(img) {
            this.manageResult(prediction.aiPredict(img))  
            this.aiMode = true             
        },
        manageResult(promise) {
            promise.then(predictionResult => {
                console.log(predictionResult)
                if(predictionResult.data.status != prediction.OK_STATUS) { //if the category is not found
                    this.resNotFound = true
                } else {
                    var trashCategory = predictionResult.data.category
                    this.binName = this.binFromTrashCategoryName(trashCategory).binCategory.name
                    //from category name, fetch the trash category (with score and image)
                    this.categoryByName(trashCategory).then(cf => this.category = cf)
                }
            })
            .catch(err => {
                console.log(err)
                this.resNotFound = true
            }) //if there are some error, show error code on client
            .finally(() => this.waitingPrediction = false) //the prediction is over, show result 
        }
    }
}
</script>