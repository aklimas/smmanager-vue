<template>
  <v-card elevation="10" class="">
    ff
    Sam bydzie panyl do zarzondzanio
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'IssetAccount',
  data() {
    return {
      settingStorageJson: localStorage.getItem('user')
    };
  },
  methods: {
    // Dodaj metody, jeśli są potrzebne
  }
});
</script>

<style scoped>

</style>
