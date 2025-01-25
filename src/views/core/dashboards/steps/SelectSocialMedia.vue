<template>
  <v-container>

    <v-row justify="center" v-if="loading">
      <v-progress-circular indeterminate color="primary" size="64" class="my-5"></v-progress-circular>
    </v-row>
    <template v-else>
      <v-row justify="center">
        <v-col cols="12" md="8">
      <v-card>
        <v-card-text>
      <h1>Wybierz, które z kont chcesz skonfigurować na start?</h1>
      <h3>Możesz wybrać jedno. Resztę skonfigurujemy później</h3>
      <v-divider class="my-3"></v-divider>
      <SocialMediaSelector
        @selectedMedia="handleSelectedMedia"
      />
    </v-card-text>
    </v-card>
    </v-col>
    </v-row>
    </template>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AccountSettingsForm from '@/components/forms/AccountSettingsForm.vue';
import { socialMediaStore } from '@/stores/social-media/socialMedia';
import SocialMediaSelector from '@/components/forms/SocialMediaSelector.vue';

export default defineComponent({
  name: 'SelectSocialMedia',
  components: { AccountSettingsForm, SocialMediaSelector },
  data() {
    return {
      page: { title: 'Ustawienia' },
      breadcrumbs: [
        { text: 'Social Media', disabled: false, href: '#' },
        { text: 'Ustawienia', disabled: true, href: '#' }
      ],
      store: socialMediaStore(),
      loading: true,
      selectedMedia: '',
    };
  },
  async mounted() {
    this.loading = false;
  },
  methods: {
    handleSelectedMedia(selectedMedia: string[]) {
      this.selectedMedia = selectedMedia.join(','); // Konwertuj tablicę na ciąg znaków oddzielony przecinkami
      this.$router.push({ name: 'ConfigureStep3', query: { selectedMedia: this.selectedMedia } });
    }
  }
});
</script>
