<template>
    <v-card v-if="building">
      <v-img height="200" :src="mapImage" class="align-end"></v-img>
      <v-card-title class="display-1 gradient-text">{{ building.name }}</v-card-title>
      <v-card-text class="subtitle-1">
        <div class="subtitle-1">
          {{building.city | formatCityInfo}}
        </div>
        <div class="subtitle-2">
           {{ building | formatAddressInfo(includeCity=false) }}
        </div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
  
      <v-card-text>
        <div class="overline">Proprietario</div>
        <user-chip :user="building.owner" expandable></user-chip>
      </v-card-text>
      <v-card-text>
        <div class="overline">Membri</div>
        <div class="body-2">{{building.members.length}}</div>
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn color="info accent-4" text @click="showDetails=true">Dettaglio</v-btn>       
        <v-btn v-if="canEdit" color="error accent-4" text @click="onClickDelete">Elimina</v-btn>
        <div class="flex-grow-1"></div>
        <v-btn icon small @click="markAsActive" alt-labels="Imposta come abitazione attiva">
          <v-icon :color="(this.activeBuilding._id == this.building._id) ? 'green darken-1' : 'grey lighten-1'">
            fas fa-check
          </v-icon>
        </v-btn>
      </v-card-actions>
      <dialog-details v-model="showDetails" :building="building"></dialog-details>
    </v-card>
</template>

<script>
import User from '@/model/user'
import UserChip from '@/components/UserChip'
import BuildingDetails from '@/components/building/BuildingDetailsDialog'
import hereApi from '@/services/hereApi'

import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'building-card',
    data: () => ({
      showDetails: false
    }),
    props: {
      building: {
        type: Object,
        required: true
      }
    },
    components: {
        'user-chip': UserChip,
        'dialog-details': BuildingDetails
    },
    methods: {
        ...mapActions('building', [
            'deactivateBuilding',
            'changeActiveBuilding'
        ]),
        // TODO: add dialog for confirm the delete of building
        onClickDelete() {
          /*this.$alertDialog('ciao', {
            positiveButtonText: 'ciaoooo'
          })*/
          this.deactivateBuilding(this.building._id).then(() => {
            this.$store.dispatch('msg/addMessage', 'Abitazione eliminata')
          }).catch(err => {
            // TODO: show error
          })
        },
        markAsActive: function() {
          this.changeActiveBuilding(this.building._id)
        }
    },
  computed: {
    ...mapGetters('building', [
      'activeBuilding'
    ]),
    ...mapGetters('auth', [
      'userProfile'
    ]),
    canEdit: function() {
      return this.building.owner.firebase_uid == this.userProfile.firebase_uid
    },
    buildingMembers: function() {
      let ownerId = this.building.owner.firebase_uid
      return this.building.members.filter(member => member.firebase_uid.toString() !== ownerId.toString())
    },
    mapImage: function() {
      return hereApi.mapImageURL(this.building.city.state, this.building.city.name, this.building.address, this.building.apartmentNumber, 400)
    }
  }
}
</script>