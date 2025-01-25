<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { GiftIcon } from 'vue-tabler-icons';
import EditUserData from '@/views/apps/user-profile/EditUserData.vue';

const authStore = useAuthStore();
</script>
<template>
    <v-row>
        <v-col cols="12">
            <v-card variant="outlined" class="bg-surface">

                <v-card-item>
                    <div class="d-flex align-center justify-space-between">
                        <h3 class="text-h4">Podstawowe dane</h3>
                        <EditUserData :editedItem="authStore.user" ></EditUserData>
                    </div>
                    <div class="d-flex gap-3 my-5">
                        <UserCircleIcon size="21" />
                        <span class="text-h6">{{ authStore.user?.firstName }} {{  authStore.user?.lastName }}</span>
                    </div>
                    <div class="d-flex gap-3 mb-5">
                        <MailIcon size="21" />
                        <span class="text-h6">{{ authStore.user?.email }}</span>
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
