<template>
    <v-card>
        <v-card-title
            class="roboto-s secondary white--text"
            primary-title
        >
            Contattaci
        </v-card-title>

        
        <v-divider class="mr-2 ml-2 mb-2" />
        <v-card-text>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Per segnalazioni potete contattarci alla mail:</v-list-item-title>
                    <v-list-item-subtitle><a href=”mailto:scanbage@gmail.it”>scanbage@gmail.it</a></v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-list-item two-line>
                <v-list-item-content>
                    <v-list-item-title>Oppure potete utilizzare i nostri canali social:</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-row class="align-center justify-center">
                <div class="text-xs-center">
                    <v-btn
                        v-for="icon in socialIcons"
                        :key="icon.name"
                        class="mx-4"
                        color="primary"
                        icon
                    >
                        <v-icon size="24px">{{icon.name}}</v-icon>
                    </v-btn>
                </div>
            </v-row>
                
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name : "ContactUsCard",
    data : () => ({
        socialIcons : [
            {
                name : 'fab fa-facebook',
            },
            {
                name : 'fab fa-instagram',
            },
            {
                name : 'fab fa-linkedin',
            },
        ]
    })
}
</script>