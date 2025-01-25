<script>
import { useAuthStore } from '@/stores/auth';
import { Field, Form } from 'vee-validate';
import * as Yup from 'yup';
import TextInput from '@/components/forms/form-validation/TextInput.vue';


export default {
    name: 'RegisterForm',
    components: { Field, TextInput },

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
                terms: [(v) => !!v || 'Zgoda jest wymagana'],
            },
            errors: null,
            isSubmitting:false
        };
    },
    methods: {
        onSubmit() {
            this.$nextTick(async () => {
                this.$refs.form.validate();
                if (this.$refs.form.isValid) {
                    this.isSubmitting = true;
                    const authStore = useAuthStore();
                    return await authStore.register(this.email, this.password).catch((error) => {
                        this.errors = error;
                        this.isSubmitting = false;
                    });
                }
            });
        },
    }
};

</script>

<template>
    <v-row class="d-flex mb-6">
        <v-col cols="6" sm="6"  class="pr-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img src="@/assets/images/svgs/google-icon.svg" height="20" class="mr-2" alt="google" />
                <span class="d-sm-flex d-none mr-1">Użyj konta</span>Google
            </v-btn>
        </v-col>
        <v-col cols="6" sm="6" class="pl-2">
            <v-btn variant="outlined" size="large" class="border text-subtitle-1" block>
                <img src="@/assets/images/svgs/facebook-icon.svg" width="25" height="30" class="mr-1" alt="facebook" />
                <span class="d-sm-flex d-none mr-1">Użyj konta</span>FB
            </v-btn>
        </v-col>
    </v-row>
    <div class="d-flex align-center text-center mb-6">
        <div class="text-h6 w-100 px-5 font-weight-regular auth-divider position-relative">
            <span class="bg-surface px-5 py-3 position-relative">lub zarejestruj się tradycyjnie</span>
        </div> 
    </div>
    <v-form ref="form">
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
            <v-checkbox class="pr-6" v-model="terms" :rules="rules.terms" label="Akceptuję regulamin" value="true"></v-checkbox>
        </div>
        <v-btn size="large" color="primary" block @click="onSubmit" :loading="isSubmitting" flat>Zarejestruj się
        </v-btn>
        <div v-if="errors" class="mt-2">
            <v-alert color="error">{{ errors }}</v-alert>
        </div>
    </v-form>
</template>
