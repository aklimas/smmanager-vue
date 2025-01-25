<script setup lang="ts">
import type { ArrowUpLeftIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/auth';


const settingStorageJson = localStorage.getItem('user');



</script>
<template>
  <v-card elevation="10" class="position-relative overflow-hidden">
    <img src="@/assets/images/profile/businessmen.png" class="bg-img-1" />
    <v-card-title class="headline">Witaj w naszym portalu do zarządzania social mediami! 🎉</v-card-title>
    <v-card-text style=" margin-right: 400px;">
      <h2 class="title text-h5 overlay-title ">
        Cieszymy się, że do nas dołączyłeś! Aby jak najlepiej wykorzystać możliwości naszego narzędzia i osiągnąć świetne wyniki w social mediach, potrzebujemy kilku informacji od Ciebie.
      </h2>
      <p></p>
      <br>
        <strong>Uwaga!</strong> Bez uzupełnienia wymaganych danych efektywność działań może być ograniczona, dlatego zachęcamy Cię do poświęcenia kilku minut na wypełnienie poniższego formularza. 
        
        
        <br/><br><h2>Dzięki temu:</h2>
      <ul>
        <li class="ml-4">Dopasujemy strategię publikacji do Twoich potrzeb,</li>
        <li class="ml-4">Zapewnimy najlepsze wyniki Twoich postów,</li>
        <li class="ml-4">Ułatwimy Ci start w efektywnej kampanii marketingowej.</li>
      </ul>
      <br>
    
      <h2>Co musisz zrobić?</h2>
      <ol>
        <li class="ml-4">Wypełnij wszystkie wymagane pola w formularzu.</li>
        <li class="ml-4">Podaj dane, które pozwolą nam lepiej zrozumieć Twój cel i charakter działalności.</li>
        <li class="ml-4">Po zapisaniu informacji odblokujesz dostęp do zaawansowanych funkcji naszego portalu.</li>
      </ol>
      <p>Nie martw się – to zajmie tylko kilka minut! 🕒</p>
    </v-card-text>
<v-card-actions>
  <v-btn  color="success" variant="tonal" to="/social-media/account-setting">Przejdź do formularza &raquo;</v-btn>
</v-card-actions>
    

  </v-card>
</template>

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
