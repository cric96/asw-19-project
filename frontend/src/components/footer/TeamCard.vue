<template>
    <v-card>
        <v-card-title
            class="headline secondary white--text"
            primary-name
        >
            Team
        </v-card-title>

        <v-card-text>
            <v-list three-line>
                <template v-for="(worker, index) in team">
                    <v-list-item
                        :key="worker.name"
                    >
                        <v-list-item-avatar>
                            <v-img :src="worker.avatar"></v-img>
                        </v-list-item-avatar>
                        
                        <v-list-item-content>
                            <v-list-item-title v-html="worker.name"></v-list-item-title>
                            <v-list-item-subtitle v-html="worker.description"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-divider
                        inset
                        :key="index"
                    ></v-divider>
                </template>
            </v-list>         
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name : "TeamCard",
    data : () => ({
        team: [
            {
                avatar: 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/20106311_10213777047448420_5886770139145200417_n.jpg?_nc_cat=111&_nc_oc=AQljlZGLdP7_Ogd6r7kX-gQAQImvAm6oslFRqB8ha39E8LJ71cx549d7s_z3EUch0dk&_nc_ht=scontent-mxp1-1.xx&oh=9645add79895720fbda1fa52e3e3b225&oe=5E1EF87D',
                name: 'Simone Letizi',
                description: "Ama dare il meglio di sè, non si tira mai indietro. Non dice mai di no ad una birra.",
            },
            
            {
                avatar: 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/13087503_10205916845825091_9203608690153422787_n.jpg?_nc_cat=109&_nc_oc=AQnXGonAUnf3X8Ah5BvqDKIblFcrIgx6ouuu9qB9FEvFvxRJFQbZ5OIigme00TEji3E&_nc_ht=scontent-mxp1-1.xx&oh=6a96be9b7a0915e81f7a15976e80b485&oe=5E17B621',
                name: 'Marta Luffarelli',
                description: "Tenace, ama la natura e gli animali. Capace di ascoltare a tutti. ",
            },
            {
                avatar: 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/10534743_767242256629735_3442239859492906482_n.jpg?_nc_cat=100&_nc_oc=AQnTsJRJdCj4geE37PsDiljefVc9TCHEXetZsIYX4SLpbcBJKrvAgU8SYpTj2m8-xd4&_nc_ht=scontent-mxp1-1.xx&oh=5f2e3392a01e045c9ed3eeda8ffa6e2a&oe=5E5B88B6',
                name: 'Andrea Petreti',
                description: "Sempre pronto ad aiutare a tutti. Fifa è il suo secondo lavoro.",
            },
            {
                avatar: 'https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-1/p240x240/11062260_10205563256434373_8751593381476698597_n.jpg?_nc_cat=109&_nc_oc=AQkDMvBELfLcsLakwaj-F2aafsDhDyVRuOAphLl-p7ZW5qivZgz815IDoDxtIlla-NM&_nc_ht=scontent-mxp1-1.xx&oh=86a0cbd25e8a65d6317ed31494bd4ff0&oe=5E20CB74',
                name: 'Gianluca Aguzzi',
                description: "Cricchiolin, on the river.",
            }
      ],
    })
}
</script>