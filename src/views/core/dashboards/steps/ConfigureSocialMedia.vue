<template>
  <v-container>
    <v-row justify="center" v-if="loading">
      <v-progress-circular indeterminate color="primary" size="64" class="my-5"></v-progress-circular>
    </v-row>
    <template v-else>
      <h1>Skonfiguruj wybrane konta</h1>
      <v-divider class="my-3"></v-divider>
      <div v-for="media in selectedMedia" :key="media">
        <h3>{{ media }}</h3>
        <v-text-field label="Access Token" v-model="accessTokens[media]" />
        <v-btn v-if="media === 'facebook'" color="primary" @click="authorizeFacebook">Autoryzuj Facebook</v-btn>
      </div>
      <v-btn color="primary" @click="saveAccessTokens">Zapisz</v-btn>
    </template>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { socialMediaStore } from '@/stores/social-media/socialMedia';

export default defineComponent({
  name: 'ConfigureSocialMedia',
  data() {
    return {
      page: { title: 'Skonfiguruj konta' },
      breadcrumbs: [
        { text: 'Social Media', disabled: false, href: '#' },
        { text: 'Skonfiguruj konta', disabled: true, href: '#' }
      ],
      loading: true,
      selectedMedia: [],
      accessTokens: [],
      facebookAccessToken: ''
    };
  },
  async mounted() {
    const selectedMedia = this.$route.query.selectedMedia;
    if (selectedMedia) {
      this.selectedMedia = selectedMedia.split(','); // Konwertuj ciąg znaków oddzielony przecinkami na tablicę
      this.selectedMedia.forEach(media => {
        this.accessTokens[media] = '';
      });
    }

    // Sprawdź, czy URL zawiera kod autoryzacji
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const selectedMediaParam = urlParams.get('selectedMedia');

    if (code && state && selectedMediaParam) {
      this.selectedMedia = selectedMediaParam.split(',');
      await this.exchangeCodeForToken(code);
    }

    this.loading = false;
  },
  methods: {

    async saveFacebook() {
        
      
    },

    async saveAccessTokens() {
      // Implementacja zapisywania access tokenów
      console.log(this.accessTokens);
      alert('Access tokens zostały zapisane.');
      this.$router.push('/configure/step4');
    },
    authorizeFacebook() {
      const appId = '1016886966910956';
      const state = Math.random().toString(36).substring(2); // Generowanie losowego stanu dla bezpieczeństwa
      const selectedMedia = encodeURIComponent(this.selectedMedia.join(',')); // Konwertuj tablicę na ciąg znaków oddzielony przecinkami
      const redirectUri = `http://adamklimas.com:5173/configure/step3?selectedMedia=${selectedMedia}`; // Dodanie selectedMedia do redirectUri
      const scope = 'public_profile,email,pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_metadata,instagram_basic,instagram_content_publish';

      const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?client_id=${appId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}&response_type=code`;

      window.location.href = authUrl; // Przekierowanie użytkownika do URL autoryzacji
    },
    async exchangeCodeForToken(code: string) {
      try {

        await socialMediaStore().saveFacebook({access_token :code});

      } catch (error) {
        console.error('Błąd podczas wymiany kodu na token:', error);
      }
    }
  }
});
</script>

<style scoped lang="scss">
/*--------------------------------------------------------------
# Pricing Section
--------------------------------------------------------------*/
.pricing .pricing-item {
  background-color: rgba(var(--accent-color-rgb), 0.04);
  padding: 40px 40px;
  height: 100%;
  border-radius: 15px;
}
</style>