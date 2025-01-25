<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { useCustomizerStore } from '@/stores/customizer';
import sidebarItems from './sidebarItem';

import NavGroup from './NavGroup/index.vue';
import NavItem from './NavItem/index.vue';
import NavCollapse from './NavCollapse/NavCollapse.vue';
import Logo from '../logo/Logo.vue';
import { useAuthStore } from '@/stores/auth';

const customizer = useCustomizerStore();
const sidebarMenu = shallowRef(sidebarItems);
const authStore = useAuthStore();
const baseUrl = `${import.meta.env.VITE_API_URL}`;
</script>

<template>
    <v-navigation-drawer left v-model="customizer.Sidebar_drawer" elevation="0" rail-width="75" mobile-breakpoint="960"
                         app class="leftSidebar" :rail="customizer.mini_sidebar" expand-on-hover width="256">

        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <perfect-scrollbar class="scrollnavbar">
            <div class="profile">
                <div class="profile-pic profile-pic py-7 px-3">
                    <v-avatar size="45">
                        <img v-if="authStore.user?.avatar" :src="baseUrl + authStore.user?.avatar" width="45" :alt="authStore.user?.firstName + ' ' + authStore.user?.lastName" />
                        <img v-else src="@/assets/images/profile/user-1.jpg" width="45" :alt="authStore.user?.firstName + ' ' + authStore.user?.lastName"  />
                    </v-avatar>
                </div>
                <div class="profile-name d-flex align-center px-3">
                    <h5 class="text-white font-weight-medium">{{ authStore.user?.firstName }}
                        {{ authStore.user?.lastName }}</h5>
                    <div class="ml-auto profile-logout">
                        <v-btn variant="text" icon rounded="md" color="white" @click="authStore.logout()">
                            <PowerIcon size="22" />
                            <v-tooltip activator="parent" location="top">Wyloguj</v-tooltip>
                        </v-btn>
                    </div>
                </div>
            </div>
            <v-list class="py-6 px-4">
                <!---Menu Loop -->
                <template v-for="(item, i) in sidebarMenu">
                    <template v-if="useAuthStore().checkRoles(item?.roles) === true">
                        <!---Item Sub Header -->
                        <NavGroup :item="item" v-if="item.header" :key="item.title" />
                        <!---If Has Child -->
                        <NavCollapse class="leftPadding" :item="item" :level="0" v-else-if="item.children" />
                        <!---Single Item-->
                        <NavItem :item="item" v-else class="leftPadding" />
                        <!---End Single Item-->
                    </template>
                </template>
            </v-list>
        </perfect-scrollbar>
    </v-navigation-drawer>
</template>
