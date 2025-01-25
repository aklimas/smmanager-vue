<script setup lang="ts">
import { ref } from 'vue';
const select = ref(['Vuetify', 'Programming']);
const items = ref(['Programming', 'Design', 'Vue', 'Vuetify']);
</script>
<template>
    <!-- ----------------------------------------------------------------------------- -->
    <!-- Multiple Options -->
    <!-- ----------------------------------------------------------------------------- -->
    <div>
        <v-row>
            <v-col cols="12">
                <v-combobox
                    v-model="select"
                    :items="items"
                    hide-details
                    label="Select a favorite activity or create a new one"
                    multiple
                ></v-combobox>
            </v-col>
            <v-col cols="12">
                <v-combobox v-model="select" :items="items" hide-details label="I use chips" multiple chips></v-combobox>
            </v-col>
            <v-col cols="12"> </v-col>
            <v-col cols="12">
                <v-combobox v-model="select" hide-details label="I'm readonly" chips multiple readonly></v-combobox>
            </v-col>
        </v-row>
    </div>
</template>
