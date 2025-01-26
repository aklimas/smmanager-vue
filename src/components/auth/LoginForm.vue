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
    mounted() {
    // Inicjalizacja Google SDK
    window.google.accounts.id.initialize({
      client_id: '461351201408-md78et92bsbta0i0554op41shmqo03j5.apps.googleusercontent.com', // Wstaw swój Client ID
      
      callback: this.handleCredentialResponse,
    });

    // Renderowanie przycisku Google
    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInButton'),
      {     theme: 'filled_black',       // Wygląd: 'outline', '', 'filled_black'
            size: 'medium',          // Rozmiar: 'small', 'medium', 'large'
            text: 'signin',    // Tekst: 'signin_with', '', 'continue_with', ''
            shape: 'rectangular',          // Kształt: 'rectangular', 'pill', 'circle', 'square'
            logo_alignment: 'center', // Logo: 'left', ''
               // Szerokość w pikselach (opcjonalne) }
  });

  window.fbAsyncInit = () => {
      FB.init({
        appId: '1016886966910956', // Wstaw swoje App ID z Facebook Developer Console
        cookie: true,          // Używaj ciasteczek, aby umożliwić sesje
        xfbml: true,           // Włącz obsługę XFBML
        version:  'v21.0'      // Wersja Graph API
      });
    };

  },
    methods: {
        loginWithFacebook() {
      // Wywołaj logowanie Facebooka
      FB.login((response) => {
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;

          // Wyślij token na backend
          fetch('http://twoj-backend-url.com/api/auth/facebook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: accessToken }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log('Autoryzacja zakończona:', data);
            });
        } else {
          console.error('Użytkownik anulował logowanie.');
        }
      }, { scope: 'email,public_profile' });
    },
      async handleCredentialResponse(response) {
        const token = response.credential;
        const authStore = useAuthStore();
        return await authStore.loginGoogle(token).catch((error) => {
            this.errors = error;
            this.isSubmitting = false;
        });
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
    onLoginError(error) {
      console.error('Błąd Google Login:', error);
    },
    }
};

</script>

<template>


    <v-row class="d-flex mb-3">
        <v-col cols="6" sm="6" class="pr-2">
          <div id="googleSignInButton"></div>
        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block  @click="loginWithFacebook">
                <img src="@/assets/images/svgs/facebook-icon.svg" width="25" height="25" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Użyj konta</span>FB
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative" @click="loginWithFacebook">
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
<style>
#googleSignInButton{
  background: none;
}
</style>