<template>
 <div v-if="$vuetify.breakpoint.smAndDown">                                                                
    <v-list-group append-icon="keyboard_arrow_down" flat>
      <template slot="activator">
        <v-list-item-content>
          <v-list-item-title class="overline" ><h2>Filtri</h2></v-list-item-title>                   
        </v-list-item-content>
      </template>
      <v-list-item-group >
          <v-list-item>
          <v-list-item-content>          
            <v-menu bottom :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" :ripple="false" class="formButtons text-left" text height="60">
                  <v-icon>compare_arrows</v-icon>
                  {{order}}        
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="changeOrder('ascendente')">
                  <v-list-item-title class="overline"> <h3>Ascendente</h3> </v-list-item-title>
                </v-list-item>
                 <v-list-item @click="changeOrder('discendente')">
                  <v-list-item-title class="overline"><h3>Discendente</h3></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>                
          </v-list-item-content>
           </v-list-item>
        <v-list-item> 
          <v-list-item-content>        
            <v-btn color="success" block class="myButton text-left"  text height="60">                                    
              Applica                                    
            </v-btn>           
          </v-list-item-content>
        </v-list-item> 
        </v-list-item-group>
      </v-list-group>
    </div>       
    <div v-else>
      <v-list-group append-icon="keyboard_arrow_down" flat>
      <template slot="activator">
        <v-list-item-content>
          <v-list-item-title class="overline" ><h2>Filtri</h2></v-list-item-title>                   
        </v-list-item-content>
      </template>
      <v-list-item>
          <v-list-item-content>          
            <v-menu bottom :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block class="text-left" text height="60">
                  <v-icon>compare_arrows</v-icon>
                  {{order}}        
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="changeOrder('ascendente')">
                  <v-list-item-title class="overline"> <h3>ascendente</h3> </v-list-item-title>
                </v-list-item>
                 <v-list-item @click="changeOrder('discendente')">
                  <v-list-item-title class="overline"><h3>discendente</h3></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>    
          </v-list-item-content>
          <v-spacer></v-spacer>
           <v-spacer></v-spacer>
          <v-list-item-content> 
            <v-list-item>
               <v-list-item-content>
            <v-btn color="success" block class="text-left" text height="60">                                    
              Applica                                    
            </v-btn>                  
          </v-list-item-content>
              </v-list-item>         
          </v-list-item-content>        
        </v-list-item>  
      </v-list-group>
    </div>
</template>
<script>
import ranksApi from '@/services/ranksApi'
export default {
    name: "LevelAndScoreRank",
    data: () => ({
        elements : [],
        order : 'ascendente'
    }),
    mounted() {
        ranksApi.getRank().then(rank => this.$data.elements = rank)
    },
    props: {

    },
    methods: {
      changeOrder(changeIn){
        this.order = changeIn
      }
    }
}
</script>
<style scoped>
 .v-list-item:focus:before {
  color : rgba(1,1,1,0)
}

.myButton {
  pointer-events: none !important;
}
.formButtons::before {
  transition : none;
   background-color :rgba(1,1,1,0)
}

</style>