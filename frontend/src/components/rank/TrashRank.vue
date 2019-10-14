<template class="generalFont">
    <v-template v-if="$vuetify.breakpoint.lgAndDown">                                                                
    <v-list-group append-icon="keyboard_arrow_down" v-model="expanded" flat>
      <template slot="activator">
        <v-list-item-content>
          <v-list-item-title class="overline" ><h2>Filtri</h2></v-list-item-title>                   
        </v-list-item-content>
      </template>
      <v-list-item-group >
      <v-list-item >
          <v-list-item-content>
            <v-menu bottom :offset-y="true" :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block :ripple="false" class="formButtons text-left" text height="60">
                  <v-icon>delete</v-icon>
                  {{category}}     
                </v-btn>
              </template>
              <v-card class="overline" >
                <v-autocomplete
                :items="trashCategories"
                flat
                menu-props="auto"            
                label="Digita.."
                solo
              ></v-autocomplete>
              </v-card>
                
              <!--<v-list>
                <v-list-item v-for="category in trashCategories" :key="category.name" @click="changeCategory(category.name)">
                  <v-list-item-title class="overline"> <h3>{{category.name}}</h3> </v-list-item-title>
                </v-list-item>
              </v-list>
              -->
            </v-menu>          
          </v-list-item-content>
          </v-list-item>
          <v-list-item>
          <v-list-item-content>    
            <v-menu bottom :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block :ripple="false" class="formButtons text-left" text height="60">
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
           </v-list-item>
        <v-list-item v-if="!isSubjectCity()">
          <v-list-item-content>
            <v-menu bottom :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block :ripple="false" class="formButtons text-left" text height="60">
                  <v-icon>location_city</v-icon>
                  Città       
                </v-btn>
              </template>
              
            </v-menu>           
          </v-list-item-content>
          </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-menu bottom :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block :ripple="false" class="formButtons text-left" text height="60">
                  <v-icon>{{subjectIcon}}</v-icon>
                  {{subject}}        
                </v-btn>
              </template>
              <v-list>
                 <v-list-item @click="changeSubject('utente','face')">
                  <v-list-item-title class="overline"> <h3>utente</h3> </v-list-item-title>
                </v-list-item>
                 <v-list-item @click="changeSubject('città','location_city')">
                  <v-list-item-title class="overline"><h3>città</h3></v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeSubject('edificio', 'home')">
                  <v-list-item-title class="overline"><h3>edificio</h3></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>                                         
          </v-list-item-content>
          </v-list-item>
        <v-list-item :ripple="false" class="formButtons">
          <v-list-item-content>        
            <v-btn color="success" block class="lastButtons text-left" text height="60">                                    
              Applica                                    
            </v-btn>           
          </v-list-item-content>
          <v-list-item-content>
            <v-btn color="warning" block class="lastButtons text-left" text height="60">
              Reset
            </v-btn>                         
          </v-list-item-content> 
          <v-list-item-content>
            <v-btn color="error" block class="lastButtons text-left" text height="60">
              Annulla
            </v-btn>                       
          </v-list-item-content>
        </v-list-item> 
        </v-list-item-group>
      </v-list-group>
    </v-template>       
    <v-template v-else>
      <v-list-group append-icon="keyboard_arrow_down" v-model="expanded" flat>
      <template slot="activator">
        <v-list-item-content>
          <v-list-item-title class="overline" ><h2>Filtri</h2></v-list-item-title>                   
        </v-list-item-content>
      </template>
      <v-list-item>
          <v-list-item-content>
            <v-btn block class="text-left" text height="60">
              <v-icon>delete</v-icon>                              
              Categoria
            </v-btn>
          </v-list-item-content>
          <v-list-item-content>   
            <v-menu bottom :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" class="text-left" text height="60">
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
          <v-list-item-content v-if="!isSubjectCity()">    
            <v-btn block class="text-left" text height="60">                                   
              <v-icon>location_city</v-icon>
              Città                                   
            </v-btn>
          </v-list-item-content>
          <v-list-item-content>
            <v-menu bottom :offset-y="true">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block class="text-left" text height="60">
                  <v-icon>{{subjectIcon}}</v-icon>
                  {{subject}}        
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="changeSubject('utente','face')">
                  <v-list-item-title class="overline"> <h3>utente</h3> </v-list-item-title>
                </v-list-item>
                 <v-list-item @click="changeSubject('città','location_city')">
                  <v-list-item-title class="overline"><h3>città</h3></v-list-item-title>
                </v-list-item>
                <v-list-item @click="changeSubject('edificio', 'home')">
                  <v-list-item-title class="overline"><h3>edificio</h3></v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>                               
          </v-list-item-content>
          <v-list-item-content> 
            <v-list-item>
               <v-list-item-content>
            <v-btn color="success" block class="text-left" text height="60">                                    
              Applica                                    
            </v-btn>                  
          </v-list-item-content>
              <v-list-item-content>
            <v-btn color="warning" block class="text-left" text height="60">
              Reset
            </v-btn>                         
          </v-list-item-content>
               <v-list-item-content>
            <v-btn color="error" block class="text-left" text height="60">
              Annulla
            </v-btn>                       
          </v-list-item-content>
              </v-list-item>         
          </v-list-item-content>        
        </v-list-item>  
      </v-list-group>
    </v-template>
    </template>
    <script>
import ranksApi from '@/services/ranksApi'
import trashCategories from '@/services/trashCategoriesApi'
export default {
    name: "TrashRank",
    data: () => ({
        elements : [],
        trashCategories : [],
        order : "ascendente",
        subject : "utente",
        subjectIcon : "face",
        category : ""

    }),
    mounted() {
        ranksApi.getRank().then(rank => this.$data.elements = rank)
      trashCategories.getCategories()
      .then(categories => categories.map(category => category.name))
      .then(categoriesName => this.$data.trashCategories = categoriesName)
      .then(() => this.$data.category = this.$data.trashCategories[0])

    },
    props: {

    },
    methods: {
      changeOrder(changeIn){
        this.order = changeIn
      },
      changeSubject(changeIn, changeInIcon) {
        this.subject = changeIn
        this.subjectIcon = changeInIcon
      },
      isSubjectCity() {
        return this.subject === 'città'
      },
      changeCategory(changeIn) {
        this.category = changeIn
      }
    }
}
</script>
<style scoped>
 .v-list-item:focus:before {
  color : rgba(1,1,1,0)
}

.myButton {
  /*pointer-events: none !important*/
  background-color: rgba(1,1,1,0 )
}
.formButtons:focus:before, .formButtons:hover:before, .formButtons:active  {
   background-color :rgba(1,1,1,0)
}
.lastButtons {
    pointer-events: auto
}
.generalFont {
  font-family: "Roboto Regular" !important;
  font-size: 12 !important;
  letter-spacing: 1.5 !important;
  text-transform: uppercase !important;
}
</style>
