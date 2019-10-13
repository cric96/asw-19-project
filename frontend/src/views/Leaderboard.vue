<template>
    <v-container fluid>
        <v-card >
            <v-tabs
                center-active
                centered
            >
                <v-tab>Per Livello</v-tab>
                <v-tab>Per Punteggio</v-tab>
                <v-tab>Per Rifiuto</v-tab>
               
                <v-tab-item
                    v-for="n in 3"
                    :key="n"
                >
                    <v-container fluid>
                        <v-layout row justify-center>
                            <v-flex xs12 md2 v-if="$vuetify.breakpoint.smAndDown">
                                <v-btn block class="text-left" text height="60">
                                    <v-flex offset-xs2 v-if="$vuetify.breakpoint.smAndDown">
                                        <v-icon>fa-trash</v-icon>                              
                                        Filtri
                                    </v-flex>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-btn block class="text-left" text height="60">
                                    <v-flex offset-xs2 v-if="$vuetify.breakpoint.smAndDown">
                                        <v-icon>fa-trash</v-icon>                              
                                        Categoria
                                    </v-flex>
                                    <template v-else>
                                        <v-icon>fa-trash</v-icon>                              
                                        Categoria
                                    </template>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-btn block class="text-left" text height="60">
                                    <v-flex offset-xs2 v-if="$vuetify.breakpoint.smAndDown">
                                    <v-icon>compare_arrows</v-icon>
                                            Ordinamento
                                    </v-flex>
                                    <template v-else>
                                    <v-icon>compare_arrows</v-icon>
                                            Ordinamento
                                    </template>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-btn block class="text-left" text height="60">
                                    <v-flex  offset-xs2 v-if="$vuetify.breakpoint.smAndDown">
                                    <v-icon>location_city</v-icon>
                                            Città
                                    </v-flex>
                                    <template v-else>
                                    <v-icon>location_city</v-icon>
                                            Città
                                    </template>
                                </v-btn>
                            </v-flex>
                            <v-flex xs12 md2>
                                <v-btn block class="text-left" text height="60">
                                    <v-flex offset-xs2 v-if="$vuetify.breakpoint.smAndDown">
                                    <v-icon>face</v-icon>
                                            Soggetto
                                    </v-flex>
                                    <template v-else>
                                    <v-icon>face</v-icon>
                                            Soggetto
                                    </template>
                                </v-btn>
                            </v-flex>
                            <v-flex xs4 md1 v-if="$vuetify.breakpoint.smAndDown">
                                <v-btn block class="text-left" text height="60">
                                    <v-flex offset-xs2 v-if="$vuetify.breakpoint.smAndDown">
                                         Annulla
                                    </v-flex>
                                    <template v-else>                           
                                        Annulla
                                    </template>
                                </v-btn>
                            </v-flex>
                            <v-flex xs4 md1>
                                <v-btn block class="text-left" text height="60">
                                    <v-flex offset-xs2 v-if="$vuetify.breakpoint.smAndDown">
                                        Reset
                                    </v-flex>
                                    <template v-else>
                                        Reset
                                    </template>
                                </v-btn>
                            </v-flex>
                            <v-flex xs4 md1>
                                <v-btn block class="text-left" text height="60">
                                    <v-flex offset-xs2 v-if="$vuetify.breakpoint.smAndDown">
                                        Applica
                                    </v-flex>
                                    <template v-else>
                                       Applica
                                    </template>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                        
<!--
                        <v-row no-gutters>
                            
                            <v-col>
                                <v-btn block class="text-left" text height="60">
                                    <template v-if="$vuetify.breakpoint.smAndDown">
                                        <v-flex>
                                            <v-icon>fa-trash</v-icon>                              
                                            Categoria
                                        </v-flex>
                                    </template>
                                    <template v-else>
                                        <v-icon>fa-trash</v-icon>                              
                                        Categoria
                                    </template>
                                </v-btn>
                            </v-col>
                            <v-col> 
                                <v-btn block class="text-left" text height="60">
                                    <template v-if="$vuetify.breakpoint.smAndDown">
                                        <v-flex>
                                            <v-icon>compare_arrows</v-icon>
                                            Ordinamento
                                        </v-flex>
                                    </template>
                                    <template v-else>
                                        <v-icon>compare_arrows</v-icon>
                                        Ordinamento
                                    </template>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn block class="text-left" text height="60">
                                    <template v-if="$vuetify.breakpoint.smAndDown">
                                        <v-flex>
                                            <v-icon>location_city</v-icon>
                                            Città
                                        </v-flex>
                                    </template>
                                    <template v-else>
                                        <v-icon>location_city</v-icon>
                                            Città
                                    </template>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn block class="text-left" text height="60">
                                    
                                    <template v-if="$vuetify.breakpoint.smAndDown">
                                        <v-flex>
                                            <v-icon>face</v-icon>
                                            Soggetto
                                        </v-flex>
                                    </template>
                                    <template v-else>
                                        <v-icon>face</v-icon>
                                        Soggetto
                                    </template>
                                </v-btn>
                            </v-col>

                        </v-row>  
                        -->   
               <!-- 
                <v-overflow-btn
                    class="my-2"
                    :items="['ciao', 'stronzo']"
                    label="Overflow Btn"
                ></v-overflow-btn>
                 <v-menu top :close-on-click="closeOnClick">
      <template v-slot:activator="{ on }">-->

                    </v-container>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </v-container>
</template>
<script>
import ranksApi from '@/services/ranksApi'
export default {
    data: () => ({
        elements : []
    }),
    mounted() {
        ranksApi.getRank().then(rank => this.$data.elements = rank)
    }
}
</script>