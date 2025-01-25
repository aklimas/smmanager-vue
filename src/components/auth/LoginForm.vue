<script>
import { useAuthStore } from '@/stores/auth';
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import TextInput from '@/components/forms/form-validation/TextInput.vue';
import { googleSdkLoaded } from 'vue3-google-login'

export default {
    name: 'LoginForm',
    components: { Field, TextInput},

    data: function() {
        return {
            //Form
            email: '',
            password: '',
            terms: false,

            //Valid
            rules: {
                email: [(v) => !!v || 'E-mail jest wymagany', (v) => /.+@.+\..+/.test(v) || 'E-mail musi być prawidłowy'],
                password: [
                    (v) => !!v || 'Hasło jest wymagane',
                    (v) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).*$/.test(v) || 'Twoje hasło powinno składać się co najmniej z jednej wielkiej litery, jednej małej litery, jednej cyfry i jednego znaku specjalnego.'
                ],
            },
            errors: null,
            isSubmitting:false
        };
    },
    methods: {

        async loginWithGoogle() {
      try {
        // Wywołaj OAuth Google
        const authResponse = await this.getOAuthToken("google");
        if (authResponse) {
          await this.sendTokenToBackend("google", authResponse.token);
        }
      } catch (error) {
        console.error("Błąd logowania przez Google:", error);
      }
    },
    async loginWithFacebook() {
      try {
        // Wywołaj OAuth Facebook
        const authResponse = await this.getOAuthToken("facebook");
        if (authResponse) {
          await this.sendTokenToBackend("facebook", authResponse.token);
        }
      } catch (error) {
        console.error("Błąd logowania przez Facebook:", error);
      }
    },
    async getOAuthToken(provider) {
      return new Promise((resolve, reject) => {
        const clientId =
          provider === "google"
            ? "461351201408-md78et92bsbta0i0554op41shmqo03j5.apps.googleusercontent.com" // Podmień na swoje ID klienta
            : "1016886966910956"; // Podmień na swoje ID aplikacji

        const redirectUri = "http://localhost:5173"; // Twój adres powrotny
        const authUrl =
          provider === "google"
            ? `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email profile`
            : `https://www.facebook.com/v12.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=email`;

        // Otwórz popup OAuth
        const popup = window.open(authUrl, "_blank", "width=500,height=600");
        const interval = setInterval(() => {
          try {
            const popupUrl = popup.location.href;
            if (popupUrl.includes("access_token")) {
              const token = new URL(popupUrl).hash
                .substring(1)
                .split("&")
                .find((param) => param.startsWith("access_token"))
                .split("=")[1];
              popup.close();
              clearInterval(interval);
              resolve({ token });
            }
          } catch (error) {
            // Kontynuuj dopóki popup jest otwarty
          }
        }, 500);
      });
    },
    async sendTokenToBackend(provider, token) {
      try {
        const response = await axios.post("http://localhost:8000/api/oauth", {
          provider,
          token,
        });
        console.log("Dane użytkownika:", response.data);
        alert("Zalogowano pomyślnie!");
      } catch (error) {
        console.error("Błąd weryfikacji tokena na backendzie:", error);
        alert("Logowanie nie powiodło się.");
      }
    },

        onSubmit() {
            this.$nextTick(async () => {
                this.$refs.form.validate();
                if (this.$refs.form.isValid) {
                    this.isSubmitting = true;
                    const authStore = useAuthStore();
                    return await authStore.login(this.email, this.password).catch((error) => {
                        this.errors = error;
                        this.isSubmitting = false;
                    });
                }
            });
        },
        handleKeyDown(event) {
            if (event.key === 'Enter') {
                this.onSubmit();
            }
        },
        async onLoginSuccess(response) {
      const token = response.credential; // Token JWT Google
      try {
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          const data = await res.json();
          // Obsłuż logowanie (np. zapisz token)
          console.log('Zalogowano:', data);
        }
      } catch (error) {
        console.error('Błąd podczas logowania:', error);
      }
    },
    onLoginError(error) {
      console.error('Błąd Google Login:', error);
    },
    }
};

</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="6" sm="6" class="pr-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block @click="loginWithGoogle">
                <img src="@/assets/images/svgs/google-icon.svg" height="16" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Użyj konta</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block  @click="loginWithFacebook">
                <img src="@/assets/images/svgs/facebook-icon.svg" width="25" height="25" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Użyj konta</span>FB
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">lub zaloguj się tradycyjnie</span>
        </div>
    </div>

    <v-form ref="form" @keydown="handleKeyDown">
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Email</v-label>
        <v-text-field
            v-model="email"
            :rules="rules.email"
            class="mb-8"
            hide-details="auto"
        ></v-text-field>
        <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Hasło</v-label>
        <v-text-field
            v-model="password"
            :rules="rules.password"
            hide-details="auto"
            type="password"
        ></v-text-field>
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
            <div class="ml-sm-auto">
                <RouterLink to="/auth/forgot-password"
                            class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                >Zapomniałeś hasła?
                </RouterLink>
            </div>
        </div>
        <v-btn size="large" color="primary" block @click="onSubmit" :loading="isSubmitting" flat>Zaloguj
        </v-btn>
        <div v-if="errors" class="mt-2">
            <v-alert color="error">{{ errors }}</v-alert>
        </div>
    </v-form>
</template>
