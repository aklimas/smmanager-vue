<template>
  <v-card elevation="10" class="">
    <pre>{{ JSON.stringify(JSON.parse(settingStorageJson), null, 2) }}</pre>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  name: 'CongratulationCard',
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
.overlay-title {
  position: relative;
  z-index: 1;
}
.bg-img-1 {
    position: absolute;
    right: -18px;
    width: 247px;
    top: -50px;
}
.headline {
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 1rem;
}
</style>
