<template>
    <v-footer
      color="secondary darken-1" 
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
              :class="reactiveBtn"
              v-on="on"
            >
              {{ link }}
            </v-btn>
          </template>
          <component :is="getComponentFromName(link)"/>
        </v-dialog>
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
    computed : {
      reactiveBtn : function(){
        return this.$vuetify.breakpoint.xs ? "ma-2 onMobile" : "ma-2"
      }
    },
    data: () => ({
      links: [
        'Team',
        'Philosophy',
        'Contacts',
      ]
    }),
    methods : {
      getComponentFromName(name) {
        switch(name) {
          case "Ideologia":
            return 'ideology-card'
          case "Contatti":
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

<style scoped>
.onMobile {
  width: 80%;
}
</style>