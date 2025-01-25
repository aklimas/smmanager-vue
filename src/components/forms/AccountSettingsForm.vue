<template>
    <v-form @submit.prevent="submitForm">
      <v-row>
        <v-col cols="6">
          <v-textarea
            label="Jakie są wartości marki?"
            v-model="form.brandValues"
            hide-details="auto"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-sheet border="success sm" rounded class="pa-2 text-body-2">
            Wartości marki - definiują Twoją markę-wpływają na to jak jest postrzegana. Może to być np jakość, wygoda, elegancja, oryginalność, kreatywność. Zapisz ok. 3-5 słów- wartości Twojej marki.
          </v-sheet>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row>
        <v-col cols="6">
          <v-textarea
            label="Jaki produkt oferujesz lub usługę?"
            v-model="form.productOrService"
            hide-details="auto"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-sheet border="success sm" rounded class="pa-2 text-body-2">
            Jaki produkt oferujesz- Napisz najdokładniej jak potrafisz produkt/ produty ( max 3) na których chcesz się skupić podczas budowania swojej marki.
          </v-sheet>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row>
        <v-col cols="6">
          <v-textarea
            label="Jaki jest Cel budowania marki?"
            v-model="form.brandGoal"
            hide-details="auto"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-sheet border="success sm" rounded class="pa-2 text-body-2">
            Jaki jest cel budowania marki- Napisz jaki masz cel w związku z dodawanymi postami. Czy jest to cel sprzedażowy, budujący świadomość marki, zwiększający wiarygodność Twojej marki czy budowanie społeczności.
          </v-sheet>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row>
        <v-col cols="6">
          <v-textarea
            label="Jaki jest Twój styl, jeżeli chodzi o prowadzenie kont?"
            v-model="form.accountStyle"
            hide-details="auto"
          ></v-textarea>
        </v-col>
        <v-col cols="6">
          <v-sheet border="success sm" rounded class="pa-2 text-body-2">
            Jaki jest Twój styl jeśli chodzi o prowadzenie-tam miała być lista rozwijalna( humorystyczny, profesjonalny, refleksyjny, angażujący społeczność)
          </v-sheet>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Link do strony internetowej"
            v-model="form.websiteLink"
            hide-details="auto"
          ></v-text-field>
        </v-col>
        <v-col cols="6"></v-col>
      </v-row>

      <v-divider class="my-3"></v-divider>
      <h2>Czas na wybór kolorów, jakimi się posługujesz. </h2>
          <v-divider class="my-3"></v-divider>
      <v-row>
        <v-col cols="4">
          <v-color-picker
            v-model="newColor"
            hide-canvas
            show-swatches
            hex-picker
          ></v-color-picker>
        </v-col>
        <v-col cols="1" class="d-flex align-center">
          <v-btn icon @click="addColor">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="7">
          <template v-for="color in form.colors" :key="color">
            <v-chip
              :style="{ backgroundColor: color }"
              closable
              @click:close="removeColor(color)"
            >
              {{ color }}
            </v-chip>
          </template>
        </v-col>
      </v-row>
      <v-divider class="my-3"></v-divider>
      <v-btn type="submit" color="primary">Zapisz i przejdź dalej</v-btn>
    </v-form>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { socialMediaStore } from '@/stores/social-media/socialMedia';
  
  export default defineComponent({
    name: 'AccountSettingsForm',
    emits: ['submit'],
    setup(props, { emit }) {
      const store = socialMediaStore();
      const form = ref({
        brandValues: '',
        productOrService: '',
        brandGoal: '',
        materials: [],
        websiteLink: '',
        accountStyle: '',
        colors: []
      });
      const newColor = ref('#ff00ff');
      const loading = ref(true);
  
      const fetchData = async () => {
        try {
          loading.value = true;
          const data = await store.getAccountSettings();
          form.value = { ...form.value, ...data };
        } catch (error) {
          alert('Wystąpił błąd podczas pobierania danych.');
          console.error(error);
        } finally {
          loading.value = false;
        }
      };
  
      const addColor = () => {
        if (newColor.value && !form.value.colors.includes(newColor.value)) {
          form.value.colors.push(newColor.value);
        }
      };
  
      const removeColor = (color: string) => {
        const index = form.value.colors.indexOf(color);
        if (index > -1) {
          form.value.colors.splice(index, 1);
        }
      };
  
      const submitForm = async () => {
        try {
          loading.value = true;
          await store.updateAccountSettings(form.value);
          emit('submit', form.value);
        } catch (error) {
          alert('Wystąpił błąd podczas zapisywania ustawień.');
          console.error(error);
        } finally {
          loading.value = false;
        }
      };
  
      fetchData();
  
      return { form, newColor, loading, addColor, removeColor, submitForm };
    }
  });
  </script>