<template>
    <v-layout>
        <v-col cols="12">
          <v-card class="mx-auto text-center transparent" max-width="500" flat tile>
            <v-img v-if="image && !icon" max-height="200px" contain :src="image"/>
            <v-icon v-if="icon && !image" size=200px>{{ icon }}</v-icon>
            <v-card-title class="justify-center display-1"><slot name="title"></slot></v-card-title>
            <v-card-text class="text-center body-1">
              <slot name="message"></slot>
            </v-card-text>
            <v-card-actions class="justify-center">
                <slot name="actions"></slot>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-layout>
</template>

<style scoped>
.transparent {
    background: transparent !important;
    background-color: transparent !important;
}
</style>

<script>
export default {
    props: {
        image: {
            type: String,
            default: () => null
        },
        icon: {
            type: String,
            default: () => null
        }
    }
}
</script>