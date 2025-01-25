<template>
      <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-text>
          <v-row justify="center" v-if="loading">
          <v-progress-circular
            indeterminate
            color="primary"
            size="64"
            class="my-5"
          ></v-progress-circular>
        </v-row>
        <template v-else>
          <h1> Na początek uzupełnij dane dotyczące stylu Twojego konta</h1>
          <v-divider class="my-3"></v-divider>
          <AccountSettingsForm  @submit="handleFormSubmit" />          
        </template>
        
      </v-card-text>
        </v-card>
          </v-col>
          </v-row>
      </v-container>
  </template>
  <script lang="ts">
import { defineComponent, ref } from 'vue';
import AccountSettingsForm from '@/components/forms/AccountSettingsForm.vue';

export default defineComponent({
  name: 'Settings',
  components: {AccountSettingsForm },
  data() {
    return {
      page: { title: 'Ustawienia' },
      breadcrumbs: [
        {
          text: 'Social Media',
          disabled: false,
          href: '#'
        },
        {
          text: 'Ustawienia',
          disabled: true,
          href: '#'
        }
      ],
      loading: ref(false)
    };
  },
  methods: {
    handleFormSubmit(form: any) {
      this.$router.push('/configure/step2');
    }
  }
});
</script>