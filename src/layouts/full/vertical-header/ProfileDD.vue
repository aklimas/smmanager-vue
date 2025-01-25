<script setup lang="ts">
import { MailIcon } from 'vue-tabler-icons';
import { profileDD } from '@/_mockApis/headerData';

import { useAuthStore } from '@/stores/auth';
import ProfilePhoto from '@/components/apps/user-profile/ProfilePhoto.vue';
import EditPassword from '@/views/apps/user-profile/EditPassword.vue';

const authStore = useAuthStore();
const baseUrl = `${import.meta.env.VITE_API_URL}`;
</script>

<template>
    <v-menu :close-on-content-click="false" class="profile_popup">
        <template v-slot:activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img v-if="authStore.user?.avatar" :src="baseUrl + authStore.user?.avatar" width="35" :alt="authStore.user?.firstName + ' ' + authStore.user?.lastName" />
                    <img v-else src="@/assets/images/profile/user-1.jpg" width="35" :alt="authStore.user?.firstName + ' ' + authStore.user?.lastName"  />
                </v-avatar>
            </v-btn>
        </template>
        <v-sheet rounded="md" width="360" elevation="10">
            <div class="px-8 pt-6">
                <h6 class="text-h5 font-weight-medium">Profil użytkownika</h6>
                <div class="d-flex align-center mt-4 pb-6">
                    <v-avatar size="80">
                        <img v-if="authStore.user?.avatar" :src="baseUrl + authStore.user?.avatar" width="80" :alt="authStore.user?.firstName + ' ' + authStore.user?.lastName" />
                        <img v-else src="@/assets/images/profile/user-1.jpg" width="80" :alt="authStore.user?.firstName + ' ' + authStore.user?.lastName"  />
                    </v-avatar>
                    <div class="ml-3">
                        <h6 class="text-h6 mb-n1">{{ authStore.user?.firstName }} {{ authStore.user?.lastName }}</h6>
                        <div class="d-flex align-center mt-1">
                            <MailIcon size="18" stroke-width="1.5" />
                            <span class="text-subtitle-1 font-weight-regular textSecondary ml-2">{{ authStore.user?.email
                                }}</span>
                        </div>
                    </div>
                </div>
                <v-divider></v-divider>
            </div>
            <perfect-scrollbar style="height: calc(100vh - 240px); max-height: 240px">
                <v-list class="py-0 theme-list" lines="two">
                    <v-list-item v-for="item in profileDD" :key="item.title" class="py-4 px-8 custom-text-primary"
                                 :to="item.href">
                        <template v-slot:prepend>
                            <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md">
                                <v-img :src="item.avatar" width="24" height="24" :alt="item.avatar" />
                            </v-avatar>
                        </template>
                        <div>
                            <h6 class="text-subtitle-1 font-weight-semibold mb-2 custom-title">{{ item.title }}</h6>
                        </div>
                        <p class="text-subtitle-1 font-weight-regular textSecondary">{{ item.subtitle }}</p>
                    </v-list-item>
                    <EditPassword :id="authStore?.user.id"></EditPassword>
                </v-list>
            </perfect-scrollbar>
            <div class="pt-4 pb-6 px-8 text-center">
                <v-btn color="primary" variant="outlined" block @click="authStore.logout()">Wyloguj</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
