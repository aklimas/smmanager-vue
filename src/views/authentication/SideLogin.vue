<script setup lang="ts">
import Logo from '@/layouts/full/logo/LogoDark.vue';
/* Login form */
import LoginForm from '@/components/auth/LoginForm.vue';
import bgapp from '@/assets/images/backgrounds/image.png';

</script>

<template>
    <div class="pa-3">
        <v-row class="h-100vh mh-100 auth">
            <v-col cols="12" lg="7" xl="8"
                class="d-lg-flex align-center justify-center authentication position-relative"
                :style="'background: url(' + bgapp + ') center center no-repeat; background-size: cover;'">
                <div class="d-flex flex-column align-center justify-center w-100 h-100">
                    <div class="position-relative d-flex align-center justify-center w-100 h-100">
                        <Logo />
                    </div>
                </div>
            </v-col>
            <v-col cols="12" lg="5" xl="4" class="d-flex align-center justify-center bg-surface">
                <div class="mt-xl-0 mt-5 mw-100">
                    <h2 class="text-h3 font-weight-semibold mb-2">Witaj w SMManager</h2>
                    <div class="text-subtitle-1 mb-6">Twój panel zarządzania</div>
                    <LoginForm />
                    <h6 class="text-h6  text-medium-emphasis  d-flex align-center mt-6 font-weight-medium">
                        Niemasz konta?
                        <v-btn class="pl-0 text-primary text-body-1 opacity-1 pl-2 font-weight-medium" height="auto"
                            to="/auth/register" variant="plain">Zarejestuj się</v-btn>
                    </h6>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
