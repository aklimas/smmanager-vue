<template>
    <div>
      <h3>Skonfiguruj konto</h3>
      <v-form ref="form">
        <!-- Dodaj pola formularza -->
        <v-btn @click="save">Zapisz</v-btn>
      </v-form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'ConfigureAccount',
    emits: ['save'],
    setup(props, { emit }) {
      const form = ref(null);
  
      const save = () => {
        form.value.validate();
        if (form.value.isValid) {
          // Zbierz dane formularza
          const data = {};
          emit('save', data);
        }
      };
  
      return { form, save };
    }
  });
  </script>