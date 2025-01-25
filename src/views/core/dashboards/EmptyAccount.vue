<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        
        <v-card>
          <!-- Nagłówek powitalny -->
          <v-card-title class="text-h1 text-center">
            Witamy w SmManager! 🎉
          </v-card-title>
          <v-card-text class="text-h5 text-center my-2 wrap-text m-5">
            Cieszymy się, że do nas dołączyłeś! Aby jak najlepiej wykorzystać możliwości naszego narzędzia i osiągnąć świetne wyniki w social mediach, potrzebujemy kilku informacji od Ciebie.
          </v-card-text>
          <v-divider class="my-4"></v-divider>

          <!-- Opis kroków -->
          <v-card-text>
            <div class="mb-4">
              <h3 class="text-h5">🔍 Krok 1: Uzupełnij dane konta</h3>
              <p>
                Podaj dane, które pozwolą nam lepiej zrozumieć Twój cel i charakter działalności.
                <strong>Dopasujemy strategię publikacji do Twoich potrzeb.</strong>
              </p>
            </div>
            <div class="mb-4">
              <h3 class="text-h5">🌐 Krok 2: Wybierz platformy społecznościowe</h3>
              <p>
                Wybierz, które platformy social media chcesz skonfigurować, takie jak Facebook, Instagram czy Linkedin.
                <strong>Możesz dodać je po kolei, w zależności od swoich potrzeb.</strong>
              </p>
            </div>
            <div class="mb-4">
              <h3 class="text-h5">⚙️ Krok 3: Skonfiguruj wybrane konta</h3>
              <p>
                Po zaznaczeniu platform skonfiguruj je, logując się lub podając odpowiednie dane.
                <strong>Bezpieczne połączenie pozwoli na łatwe zarządzanie treściami.</strong>
              </p>
            </div>
            <div class="mb-4">
              <h3 class="text-h5">💳 Krok 4: Podłącz kartę płatniczą</h3>
              <p>
                Podłącz swoją kartę płatniczą, aby aktywować konto i rozpocząć korzystanie z platformy. Na początek dajemy Ci 14 dni na testowanie aplikacji.
                <strong>Twoje dane są w pełni zabezpieczone zgodnie z najwyższymi standardami.</strong>
              </p>
            </div>
          </v-card-text>

          <v-divider class="my-4"></v-divider>

          <!-- Informacja o postępach -->
          <v-card-text class="text-center">
            <p>
              🛠️ Jeśli masz pytania, nasz <strong>zespół wsparcia</strong> jest dostępny dla Ciebie. 🎉
            </p>
          </v-card-text>

          <!-- Przycisk rozpoczęcia -->
          <v-card-actions>
            <v-btn color="primary" block @click="startConfiguration">
              Zacznij konfigurację teraz
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    startConfiguration() {
      // Przekierowanie do pierwszego kroku konfiguracji
      this.$router.push('/configure/step1'); // Dostosuj ścieżkę do swojej aplikacji
    },
  },
};
</script>

<style scoped>
.wrap-text {
  white-space: normal;
  word-wrap: break-word;
}
</style>
