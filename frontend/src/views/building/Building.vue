<template>
    <v-container fluid>
        <building-dialog-form>
            <template v-slot:activator="{on}">
                <v-btn fab bottom right fixed direction="top" v-on="on">
                    <v-icon>add</v-icon>
                </v-btn>
            </template>
        </building-dialog-form>

    </v-container>
</template>

<script>
import BuildingDialogFrom from '@/components/building/BuildingDialogForm'

export default {
    name: 'Building',
    components: {
        'building-dialog-form': BuildingDialogFrom
    }
}
</script>