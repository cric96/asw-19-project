<template class="generalFont">
  <v-container>
    <div v-if="$vuetify.breakpoint.lgAndDown">                                                                
    <v-list-group append-icon="keyboard_arrow_down" flat>
      <template slot="activator">
        <v-list-item-content>
          <v-list-item-title class="overline" ><h2>Filtri</h2></v-list-item-title>                   
        </v-list-item-content>
      </template>
      <v-list-item-group >
      <v-list-item >
          <v-list-item-content>
            <v-menu bottom :offset-y="true" :close-on-content-click="false" v-model="closeMenuOnCategorySelection">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on"  block :ripple="false" class="formButtons text-left" text height="60">
                  <v-icon>delete</v-icon>
                  {{category}}     
                </v-btn>
              </template>
              <v-card>
                 <v-card-text>
                   <v-autocomplete
                    v-model="category"
                    :items="trashCategories"
                    :menu-props="{closeOnClick: true, closeOnContentClick: true}"
                    hide-details hide-selected          
                    label="Clicca e digita per cambiare.."
                  ></v-autocomplete>
                 </v-card-text>
              </v-card>
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
           <v-menu bottom :offset-y="true" :close-on-content-click="false" v-model="closeMenuOnCitySelection">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block  :ripple="false" class="formButtons text-left" text height="60">
                  <v-icon>location_city</v-icon>
                  {{city ===  undefined ? "Città" : city.name}}  
                </v-btn>
              </template>
              <v-card>
                 <v-card-text>
                   <v-autocomplete v-model="city"
                      :items="cities.data"
                      :loading="cities.loading"
                      :search-input.sync="citySearchText"
                      label="Cerca la città anche tramite CAP" 
                      hide-details hide-selected
                      no-filter clearable
                      hide-no-data>
                      
                      <template v-slot:selection="data">
                        <span>{{data.item.name}}, {{data.item.cap}}</span>
                      </template>
                      <template v-slot:item="{ item }">
                        {{item.name}}, {{item.cap}}
                      </template>
                  </v-autocomplete>
                 </v-card-text>
              </v-card>
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
            <v-btn color="success" block class="lastButtons text-left" text height="60" @click="computeRank">                                    
              Applica                                    
            </v-btn>           
          </v-list-item-content>
          <v-list-item-content>
            <v-btn color="error" block class="lastButtons text-left" text height="60" @click="resetFilters">
              Reset
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
            <v-menu bottom :offset-y="true" :close-on-content-click="false" v-model="closeMenuOnCategorySelection">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block class="text-left" text height="60">
                  <v-icon>delete</v-icon>
                  {{category}}     
                </v-btn>
              </template>
              <v-card>
                 <v-card-text>
                   <v-autocomplete
                    v-model="category"
                    :items="trashCategories"
                    :menu-props="{closeOnClick: true, closeOnContentClick: true}"
                    hide-details hide-selected          
                    label="Clicca e digita per cambiare.."
                  ></v-autocomplete>
                 </v-card-text>
              </v-card>
            </v-menu>          
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
           <v-menu bottom :offset-y="true" :close-on-content-click="false" v-model="closeMenuOnCitySelection">
              <template v-slot:activator="{ on }">
                <v-btn v-on="on" block class="text-left" text height="60">
                  <v-icon>location_city</v-icon>
                  {{city ===  undefined ? "Città" : city.name}}  
                </v-btn>
              </template>
              <v-card>
                 <v-card-text>
                   <v-autocomplete v-model="city"
                      :items="cities.data"
                      :loading="cities.loading"
                      :search-input.sync="citySearchText"
                      label="Cerca la città anche tramite CAP" 
                      hide-details hide-selected
                      no-filter clearable
                      hide-no-data>
                      
                      <template v-slot:selection="data">
                        <span>{{data.item.name}}, {{data.item.cap}}</span>
                      </template>
                      <template v-slot:item="{ item }">
                        {{item.name}}, {{item.cap}}
                      </template>
                  </v-autocomplete>
                 </v-card-text>
              </v-card>
            </v-menu>       
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
            <v-btn color="success" block class="text-left" text height="60" @click="computeRank">                                    
              Applica                                    
            </v-btn>                  
          </v-list-item-content>
              <v-list-item-content>
            <v-btn color="error" block class="text-left" text height="60" @click="resetFilters">
              Reset
            </v-btn>                         
          </v-list-item-content>
              </v-list-item>         
          </v-list-item-content>        
        </v-list-item>  
      </v-list-group>
    </div>
    <leaderboard-table
      :rankHeaders="getRankHeader"
      :rankRows="elements"
    ></leaderboard-table>
  </v-container>
</template>

<script>
import ranksApi from '@/services/ranksApi'
import trashCategories from '@/services/trashCategoriesApi'
import citiesApi from '@/services/citiesApi'
import LeaderboardTable from './LeaderboardTable'
export default {
    name: "TrashRank",
    data: () => ({
        elements : [],
        trashCategories : [],
        order : "discendente",
        subject : "utente",
        subjectIcon : "face",
        category : "",
        closeMenuOnCategorySelection: false,
        citySearchText: '',
        cities: {
            loading: false,
            data: []
        },
        city: undefined, 
        closeMenuOnCitySelection: false,
        headerSubject : "utente",
        headerCategory : ""

    }),
    components : {
      "leaderboard-table" : LeaderboardTable
    },
    mounted() {
      trashCategories.getCategories()
      .then(categories => categories.map(category => category.name))
      .then(categoriesName => this.$data.trashCategories = categoriesName)
      .then(() => {
        this.$data.category = this.$data.trashCategories[0]
        this.$data.headerCategory = this.$data.trashCategories[0]
      })
      .then(() => this.computeRank())

    },
    computed: {
      getRankHeader : function() {
        switch (this.headerSubject) {
          case "utente" :
            return [
              {text : 'Utente', value : 'user.nickname'}, 
              {text : this.headerCategory, value : 'value'}
            ]
          case "città" :
            return [
              {text : 'Città', value : 'city.name'}, 
              {text : this.headerCategory, value : 'value'}
            ]
          case "edificio" :
            return [
              {text : 'Edificio', value : 'building.name'}, 
              {text : this.headerCategory, value : 'value'}
            ]
        }
      }
    },
    methods: {
      changeOrder(changeIn){
        this.order = changeIn
      },
      fetchCities(query) {
            this.cities.loading = true
            citiesApi.getAllFilter(query).then(data => {
                this.cities.data = data
            })
            .finally(() => this.cities.loading = false)
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
      },
      resetFilters() {
        this.order = "ascendente"
        this.subject = "utente"
        this.subjectIcon = "face"
        this.category = this.trashCategories[0]
        this.city = undefined
      },
      computeRank() {
        var cap = this.city == undefined ? null : this.city.cap
        var categoryApplied = this.category
        switch(this.subject) {
          case "utente" :
            return ranksApi.getTrashRankByUser(this.order === "ascendente", this.category, cap)
            .then(rank => this.elements = rank)
            .then(() => {
              this.headerSubject = "utente"
              this.headerCategory = categoryApplied
            })
          case "città" :
            return ranksApi.getTrashRankByCity(this.order === "ascendente", this.category)
            .then(rank => this.elements = rank)
            .then(() => {
              this.headerSubject = "città"
              this.headerCategory = categoryApplied
            })
          case "edificio" :
            return ranksApi.getTrashRankByBuilding(this.order === "ascendente", this.category, cap)
            .then(rank => this.elements = rank)
            .then(() => {
              this.headerSubject = "edificio"
              this.headerCategory = categoryApplied
            })
        }
      }
    },
    watch: {
      category: function (){
        this.closeMenuOnCategorySelection = false
      },
      city: function() {
        this.closeMenuOnCitySelection = false
      },
      citySearchText(query) {
            query !== "" && query && !this.city && this.fetchCities(query)
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
.formButtons::before {
  transition: none;
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
