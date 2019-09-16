<template>
    <v-card
      :loading="loading" class="" >
      <v-img height="250" :src="mapImage"></v-img>
  
      <v-card-title class="display-1">{{ building.name }}</v-card-title>
      <v-card-text class="subtitle-1">
        <div class="subtitle-1">
          {{completeCityInfo}}
        </div>
        <div class="subtitle-2">
           {{ completeAddress }}
        </div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-text>
        <div class="title text--primary">Membri</div>
        <user-chip :user="ownerObject" expandable></user-chip>
        <v-chip-group v-if="buildingMembers.length > 0">
            <template v-for="member in buildingMembers">
                <user-chip :key="member.email" :user="member" expandable></user-chip>
            </template>
        </v-chip-group>
      </v-card-text>
  
      <!-- TODO: v-if delete button owner-userlogged -->
      <v-card-actions>       
        <v-btn
          color="error accent-4"
          text
        >
          Elimina
        </v-btn>
        <div class="flex-grow-1"></div>
        <v-btn v-if="!building.selected" icon small @click="markAsActive">
          <v-icon color="green">fas fa-check</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import User from '../model/user'
import UserChip from '@/components/UserChip'
import hereApi from '@/services/here.api'

export default {
    name: 'building-card',
    props: {
      building: {
        type: Object,
        required: true
      }
    },
    components: {
        'user-chip': UserChip
    },
    data: () => ({
        loading: false,
        selection: 1
    }),

    methods: {
        markAsActive: function() {

        }
    },
  computed: {
    completeAddress: function() {
      return `${this.building.address}, ${this.building.apartmentNumber}`
    },
    completeCityInfo: function() {
      return `${this.building.city.name}, ${this.building.city.cap}, ${this.building.city.state}`
    },
    ownerObject: function() {
        return Object.assign(new User(), this.building.owner)
    },
    buildingMembers: function() {
      return this.building.members.filter(member => member._id.toString() !== this.building.owner._id.toString())
    },
    mapImage: function() {
      return hereApi.mapImageURL(this.building.city.state, this.building.city.name, this.building.address, this.building.apartmentNumber, 400)
    }
  }
}
</script>