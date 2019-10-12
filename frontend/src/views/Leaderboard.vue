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

                         <div> 
      <v-toolbar flat> <!--TODO make collapse working-->
       
        <v-toolbar-title>
            Filtri 
            <v-icon>arrow_forward_ios</v-icon>
        </v-toolbar-title>
  
            <v-toolbar-items>
                <v-btn text>
                    <v-icon>fa-trash</v-icon>
                    Categoria
                </v-btn>
                <v-btn text>
                    <v-icon>compare_arrows</v-icon>
                    Ordinamento
                </v-btn>
                <v-btn text>
                    <v-icon>location_city</v-icon>
                    Città
                </v-btn>
                <v-btn text>
                    <v-icon>face</v-icon>
                    Soggetto
                </v-btn>
                <v-overflow-btn
                    class="my-2"
                    :items="['ciao', 'stronzo']"
                    label="Overflow Btn"
        ></v-overflow-btn>
         
        </v-toolbar-items>

        
  
    
      </v-toolbar>
    </div>
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