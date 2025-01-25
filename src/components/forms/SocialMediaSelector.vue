<template>
  <v-container>
    <v-row>
      <v-col v-for="media in socialMediaOptions" :key="media.id" cols="12" sm="6" md="4">
        <v-card :class="{ 'selected-card': selectedMedia.includes(media.id) }" @click="toggleMediaSelection(media.id)">
          <v-row no-gutters align="center">
            <v-col cols="4" >
              <v-img :src="media.picture" height="50px" contain class="ma-5"></v-img>
            </v-col>
            <v-col cols="8" >
              <v-card-title>{{ media.name }}</v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-4">
      <v-btn color="primary" @click="saveSelectedMedia">Zapisz</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { socialMediaStore } from '@/stores/social-media/socialMedia';
import fbIcon from '@/assets/images/svgs/fb.svg'
import inIcon from '@/assets/images/svgs/in.svg'
import lnIcon from '@/assets/images/svgs/ln.svg'


export default defineComponent({
  name: 'SocialMediaSelector',
  emits: ['selectedMedia'],
  data() {
    return {
    socialMediaOptions: [
        { id: 'facebook', name: 'Facebook', picture: fbIcon },
        { id: 'instagram', name: 'Instagram', picture: inIcon },
        { id: 'linkedin', name: 'Linkedin', picture: lnIcon }
      ],
      selectedMedia: [],
  }
},
  methods: {
    toggleMediaSelection(mediaId) {
      const index = this.selectedMedia.indexOf(mediaId);
      if (index === -1) {
        this.selectedMedia.push(mediaId);
      } else {
        this.selectedMedia.splice(index, 1);
      }
    },
    async saveSelectedMedia() {
      if (this.selectedMedia.length > 0) {
        await socialMediaStore().saveSelectedMedia(this.selectedMedia);
        this.$emit('selectedMedia', this.selectedMedia);
      } else {
        alert('Proszę wybrać strony.');
      }
    }
  }
});
</script>


<style scoped lang="scss">
.selected-card {
  box-shadow: 0 0 8px rgba(66, 165, 245, 1) !important;
  background: #fff;/* Niebieski cień */
}
</style>