<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { ref } from 'vue';
import { useTheme } from 'vuetify';
import { useCustomizerStore } from '@/stores/customizer';
import {
    CheckIcon,
    LayoutColumnsIcon,
    LayoutDistributeHorizontalIcon,
    LayoutDistributeVerticalIcon,
    LayoutNavbarIcon,
    LayoutSidebarLeftCollapseIcon
} from 'vue-tabler-icons';
import { useUsersStore } from '@/stores/authUser';
import { useAuthStore } from '@/stores/auth';


export default {
    name: 'Customizer',
    components: { UiParentCard, BaseBreadcrumb },
    data: function() {
        return {
            theme: useTheme(),
            customizer: useCustomizerStore(),
            authStore: useAuthStore(),
            themeColors: [
                {
                    name: 'BLUE_THEME',
                    bg: 'themeBlue'
                },
                {
                    name: 'AQUA_THEME',
                    bg: 'themeAqua'
                },
                {
                    name: 'PURPLE_THEME',
                    bg: 'themePurple'
                },
                {
                    name: 'GREEN_THEME',
                    bg: 'themeGreen'
                },
                {
                    name: 'CYAN_THEME',
                    bg: 'themeCyan'
                },
                {
                    name: 'ORANGE_THEME',
                    bg: 'themeOrange'
                }
            ],
            DarkthemeColors: [
                { name: 'DARK_BLUE_THEME', bg: 'themeDarkBlue' },
                { name: 'DARK_AQUA_THEME', bg: 'themeDarkAqua' },
                { name: 'DARK_PURPLE_THEME', bg: 'themeDarkPurple' },
                { name: 'DARK_GREEN_THEME', bg: 'themeDarkGreen' },
                { name: 'DARK_CYAN_THEME', bg: 'themeDarkCyan' },
                { name: 'DARK_ORANGE_THEME', bg: 'themeDarkOrange' }
            ]
        };
    },
    methods: {
        async save() {


            console.log(this.customizer);

            const data = await useAuthStore().saveSetting(this.authStore.user?.id, {
                name: 'customizer',
                value: {
                    actTheme: this.customizer.actTheme,
                    boxed: this.customizer.boxed,
                    setHorizontalLayout: this.customizer.setHorizontalLayout,
                    mini_sidebar: this.customizer.mini_sidebar
                }
            }).then(() => {
                this.$moshaToast('Ustawienia zostały zapisane', {
                    hideProgressBar: false,
                    showIcon: true,
                    position: 'bottom-right',
                    type: 'success',
                    transition: 'bounce',
                    swipeClose: true
                });
            }).catch((error) => {

                console.log(error);

                this.$moshaToast(error, {
                    hideProgressBar: false,
                    showIcon: true,
                    position: 'bottom-right',
                    type: 'danger',
                    transition: 'bounce',
                    swipeClose: true
                });
            });
        }
    }
};
</script>


<!------------------------------------->
<!-- Customizer -->
<!------------------------------------->
<template>


    <div class="pa-6 mb-4">
        <h5 class="text-h5 float-start">Ustawienia</h5>
        <v-btn density="compact" color="primary" class="float-end" @click="save">Zapisz</v-btn>
    </div>
    <v-divider></v-divider>
    <perfect-scrollbar style="height: calc(100vh - 90px)">
        <div class="pa-6">
            <!--            <h6 class="text-h6 mb-2">Sidebar Layout</h6>
                        <v-btn-toggle v-model="customizer.setHorizontalLayout" color="primary" class="my-2 btn-group-custom gap-3" rounded="0" group>
                            <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
                                <LayoutColumnsIcon stroke-width="1.5" size="21" class="mr-2" /> Vertical
                            </v-btn>
                            <v-btn :value="true" variant="text" elevation="9" class="rounded-md ">
                                <LayoutNavbarIcon stroke-width="1.5" size="21" class="mr-2" /> Horizontal
                            </v-btn>
                        </v-btn-toggle>-->

            <!--
                        &lt;!&ndash;&#45;&#45;&#45;&#45;Theme Direction&#45;&#45;&#45;&#45;&ndash;&gt;
                        <h6 class="text-h6 mt-8 mb-5">Theme Direction</h6>
                        <v-btn-toggle v-model="customizer.setRTLLayout" color="primary" class="my-2 btn-group-custom gap-3" rounded="0" group>
                            <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
                                <TextDirectionLtrIcon stroke-width="1.5" size="21" class="mr-2" /> LTR
                            </v-btn>
                            <v-btn :value="true" variant="text" elevation="9" class="rounded-md">
                                <TextDirectionRtlIcon stroke-width="1.5" size="21" class="mr-2" /> RTL
                            </v-btn>
                        </v-btn-toggle>
            -->


            <h6 class="text-h6 mt-8 mb-5">Szablon - jasne kolory</h6>
            <v-item-group mandatory v-model="customizer.actTheme" class="ml-n2 v-row">
                <v-col cols="4" v-for="theme in themeColors" :key="theme.name" class="pa-2">
                    <v-item v-slot="{ isSelected, toggle }" :value="theme.name">
                        <v-sheet
                            rounded="md"
                            class="border cursor-pointer d-block text-center px-5 py-4 hover-btns"
                            elevation="9"
                            @click="toggle"
                        >
                            <v-avatar :class="theme.bg" size="25">
                                <CheckIcon color="white" size="18" v-if="isSelected" />
                            </v-avatar>
                        </v-sheet>
                    </v-item>
                </v-col>
            </v-item-group>
            <h6 class="text-h6 mt-11 mb-5">Szablon - Ciemne kolory</h6>
            <v-item-group mandatory v-model="customizer.actTheme" class="ml-n2 v-row">
                <v-col cols="4" v-for="theme in DarkthemeColors" :key="theme.name" class="pa-2">
                    <v-item v-slot="{ isSelected, toggle }" :value="theme.name">
                        <v-sheet
                            rounded="md"
                            class="border cursor-pointer d-block text-center px-5 py-4 hover-btns"
                            elevation="9"
                            @click="toggle"
                        >
                            <v-avatar :class="theme.bg" size="25">
                                <CheckIcon color="white" size="18" v-if="isSelected" />
                            </v-avatar>
                        </v-sheet>
                    </v-item>
                </v-col>
            </v-item-group>
            <h6 class="text-h6 mt-11 mb-2">Szerokość</h6>
            <v-btn-toggle v-model="customizer.boxed" color="primary" class="my-2 btn-group-custom gap-3" rounded="0"
                          group>
                <v-btn :value="true" variant="text" elevation="9" class="rounded-md">
                    <LayoutDistributeVerticalIcon stroke-width="1.5" size="21" class="mr-2" />
                    Zwężona
                </v-btn>
                <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
                    <LayoutDistributeHorizontalIcon stroke-width="1.5" size="21" class="mr-2" />
                    Pełna
                </v-btn>
            </v-btn-toggle>
            <!---Horizontal demo hide this option --->
            <v-sheet v-if="customizer.setHorizontalLayout != true">
                <h6 class="text-h6 mt-11 mb-2">Menu</h6>
                <v-btn-toggle v-model="customizer.mini_sidebar" color="primary" class="my-2 btn-group-custom gap-3"
                              rounded="0" group>
                    <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
                        <LayoutSidebarIcon stroke-width="1.5" size="21" class="mr-2" />
                        Rozwinięte
                    </v-btn>
                    <v-btn :value="true" variant="text" elevation="9" class="rounded-md ">
                        <LayoutSidebarLeftCollapseIcon stroke-width="1.5" size="21" class="mr-2" />
                        Zwinięte
                    </v-btn>
                </v-btn-toggle>
            </v-sheet>
            <!--            <h6 class="text-h6 mt-11 mb-2">Card with</h6>
                        <v-btn-toggle v-model="customizer.setBorderCard" color="primary" class="my-2 btn-group-custom gap-3" rounded="0" group>
                            <v-btn :value="false" variant="text" elevation="9" class="rounded-md">
                                <LayoutSidebarLeftCollapseIcon stroke-width="1.5" size="21" class="mr-2" />
                                Shadow
                            </v-btn>
                            <v-btn :value="true" variant="text" elevation="9" class="rounded-md">
                                <LayoutSidebarIcon stroke-width="1.5" size="21" class="mr-2" />
                                Border
                            </v-btn>
                        </v-btn-toggle>-->
        </div>
    </perfect-scrollbar>

</template>
<style lang="scss"></style>
