<script>
import { mergeProps } from 'vue';

export default {
    name: 'DeleteAnswer',
    methods: { mergeProps },
    data: function() {
        return {
            dialog: false
        }
    }
}
</script>

<template>
    <v-dialog v-model="dialog" persistent max-width="800">
        <template v-slot:activator="{ props: dialog }">
            <v-tooltip text="Usuń">
                <template v-slot:activator="{ props: tooltip }">
                    <v-btn icon flat v-bind="mergeProps(dialog, tooltip)">
                        <TrashIcon stroke-width="1.5" size="20" class="text-error" />
                    </v-btn>
                </template>
            </v-tooltip>
        </template>
        <v-card class="pa-6">
            <v-card-title class="text-h5">
                Czy napewno chcesz usunać?
            </v-card-title>
            <v-card-text
            >Ta operacja jest nieodwracalna</v-card-text
            >
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false" variant="tonal" class="px-4 " >
                    Anuluj
                </v-btn>
                <v-btn color="secondary" text @click="dialog = false; $emit('delete')" variant="tonal" class="px-4 ">
                    Usuń
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">

</style>