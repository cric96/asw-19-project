<template>
    <v-footer
    color="primary lighten-1" 
    padless
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-dialog
        max-width="500"
        v-for="link in links"
        :key="link"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="white"
            text
            rounded
            class="my-2"
            v-on="on"
          >
            {{ link }}
          </v-btn>
        </template>
      
        <component :is="getComponentFromName(link)"/>
      </v-dialog>
      <v-col
        class="primary lighten-2 py-4 text-center white--text"
        
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>Scanbage</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>

import IdeologyCard from '@/components/footer/IdeologyCard'
import ContactUsCard from '@/components/footer/ContactUsCard'
import TeamCard from '@/components/footer/TeamCard'
export default {
    name : "Footer",
    components: {
      'ideology-card' : IdeologyCard,
      'contact-us-card' : ContactUsCard,
      'team-card' : TeamCard
    },
    data: () => ({
      links: [
        'Team',
        'Ideologia',
        'Contattaci',
      ]
    }),
    methods : {
      getComponentFromName(name) {
        switch(name) {
          case "Ideologia":
            return 'ideology-card'
          case "Contattaci":
            return 'contact-us-card'
          case 'Team':
            return 'team-card'
          default:
            return 'ideology-card'
        }
      }
    }
}
</script>