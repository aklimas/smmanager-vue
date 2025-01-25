import { defineStore } from 'pinia';
import config from '@/config';

const settingStorageJson = localStorage.getItem('user');

// @ts-ignore
const settingStorage = JSON.parse(settingStorageJson);

console.log(settingStorage);

let customizer = settingStorage?.settings?.length > 0 ? settingStorage.settings?.find((e: {
    name: string;
}) => e.name === 'customizer') : null;

if (customizer !== null) {
    customizer.value = JSON.parse(customizer?.value);
}


export const useCustomizerStore = defineStore({
    id: 'customizer',
    state: () => ({
        Sidebar_drawer: customizer?.value.Sidebar_drawer ?? config.Sidebar_drawer,
        Customizer_drawer: false ?? config.Customizer_drawer,
        mini_sidebar: customizer?.value.mini_sidebar ?? config.mini_sidebar,
        setHorizontalLayout: customizer?.value.setHorizontalLayout ?? false , //config.setHorizontalLayout, // Horizontal layout
        setRTLLayout: customizer?.value.setRTLLayout ?? config.setRTLLayout, // RTL layout
        actTheme: customizer?.value.actTheme ?? config.actTheme,
        inputBg: customizer?.value.inputBg ?? config.inputBg,
        boxed: customizer?.value.boxed ?? config.boxed,
        setBorderCard: customizer?.value.setBorderCard ?? config.setBorderCard
    }),

    getters: {},
    actions: {
        SET_SIDEBAR_DRAWER() {
            this.Sidebar_drawer = !this.Sidebar_drawer;
        },
        SET_MINI_SIDEBAR(payload: any) {
            this.mini_sidebar = payload;
        },
        SET_CUSTOMIZER_DRAWER(payload: any) {
            this.Customizer_drawer = payload;
        },

        SET_LAYOUT(payload: any) {
            this.setHorizontalLayout = payload;
        },
        SET_THEME(payload: any) {
            this.actTheme = payload;
        },
        SET_CARD_BORDER(payload: any) {
            this.setBorderCard = payload;
        }
    }
});
