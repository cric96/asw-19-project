<template>
  <v-app light>
    <v-card>
      <v-app-bar app clipped-left>
        <v-app-bar-nav-icon @click="drawer = !drawer"/>
        <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" app clipped>
      <template v-slot:prepend>
        <user-header/>
      </template>
      <v-divider/>
      <nav-building-selector/>
    </v-navigation-drawer>

    <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/views/NavBar'
import NavBuildingSelector from '@/components/NavBuildingSelector'
import UserHeader from '@/components/UserHeader'

export default {
  name: 'App',
  data: () => ({
    drawer: null
  }),
  components: {
    'nav-building-selector': NavBuildingSelector,
    'user-header': UserHeader
  }
}
</script>