<template>
    <v-card v-if="building" :loading="pendingOperation">
      <v-img height="200" :src="mapImage" class="align-end"></v-img>
      <v-card-title class="display-1 gradient-text">{{ building.name }}</v-card-title>
      <v-card-text class="subtitle-1">
        <div class="subtitle-1">
          {{building.city | formatCityInfo}}
        </div>
        <div class="subtitle-2">
           {{ building | formatAddressInfo(includeCity=false) }}
        </div>

        <v-divider class="mt-4"></v-divider>
        <v-row class="overline">
          <v-col cols="6">Proprietario</v-col>
          <v-col cols="6">Membri</v-col>
        </v-row>
        <v-row class="mt-n3">
          <v-col cols="6" class="body-2"><user-chip :user="building.owner" expandable></user-chip></v-col>
          <v-col cols="6" class="body-2">{{ building.members.length }}</v-col>
        </v-row>  
      </v-card-text>
  
      <v-divider class="mx-4"></v-divider>
      <v-card-actions>
        <v-btn color="info accent-4" text @click="showManager=true">{{ canEdit ? "Gestisci" : "Info"}}</v-btn>       
        <v-btn v-if="canEdit" color="error accent-4" text @click="showDeleteConfirm = true">Elimina</v-btn>
        <div class="flex-grow-1"></div>
        <v-btn icon small @click="markAsActive" alt-labels="Imposta come abitazione attiva">
          <v-icon small :color="(this.activeBuilding._id == this.building._id) ? 'green darken-1' : 'grey lighten-1'">
            fas fa-check
          </v-icon>
        </v-btn>
      </v-card-actions>
      <dialog-details v-if="building" v-model="showManager" :building="building" :editable="canEdit"></dialog-details>
      <v-dialog v-model="showDeleteConfirm" persistent max-width="300">
        <v-card>
          <v-card-title class="headline primary white--text">Sei sicuro?</v-card-title>
          <v-card-text class="mt-6">L'abitazione verrà eliminata, perderai definitivamente l'accesso ad essa.</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info accent-4" text @click="showDeleteConfirm = false">Annulla</v-btn>
            <v-btn color="error accent-4" text @click="onClickDelete">Conferma</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
</template>

<script>
import User from '@/model/user'
import BuildingDetails from '@/components/building/BuildingDetailsDialog'
import UserChip from '@/components/user/UserChip'
import hereApi from '@/services/hereApi'
import Notification from "@/model/notification"
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'building-card',
    data: () => ({
      showManager: false,
      pendingOperation: false,
      showDeleteConfirm: false
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
          this.pendingOperation = true
          this.deactivateBuilding(this.building._id).then(() => {
            this.$store.dispatch('msg/addMessage', new Notification('Abitazione eliminata'))
          }).catch(err => {
            // TODO: show error
          }).finally(() => {
            this.pendingOperation = false
            this.showDeleteConfirm = false
          })
        },
        markAsActive: function() {
          this.changeActiveBuilding(this.building._id)
          this.$store.dispatch('msg/addMessage', new Notification(`${this.building.name} impostata come abitazione attiva.`))
        }
    },
  computed: {
    ...mapGetters('building', [
      'activeBuilding'
    ]),
    ...mapGetters('user', [
      'userProfile'
    ]),
    canEdit: function() {
      return this.building.owner.firebase_uid == this.userProfile.firebase_uid
    },
    mapImage: function() {
      return hereApi.mapImageURL(this.building.city.state, this.building.city.name, this.building.address, this.building.apartmentNumber, 400)
    }
  }
}
</script>