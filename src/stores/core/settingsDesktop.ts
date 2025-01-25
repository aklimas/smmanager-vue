import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

// @ts-ignore
export const settingsDesktopStore = defineStore({
    id: 'SettingsDesktop',
    state: () => ({
        settingsDesktop: {}
    }),

    actions: {
        // Fetch followers from action
        async get() {
            if (Object.keys(this.settingsDesktop).length === 0) {
                try {
                    const response = await axios.get(`${baseUrl}/api/settings`,
                        { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
                    this.settingsDesktop = response.data;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        getStatus(entity: string, status:string, type:string) {
            // @ts-ignore
            return this.settingsDesktop?.[entity]?.[status]?.[type];
        },
        listStatus(entity: string){
            let statuses = [];
            // @ts-ignore
            if(this.settingsDesktop[entity] !== undefined){
                // @ts-ignore
                for (const [key, value] of Object.entries(this.settingsDesktop[entity])) {
                    statuses.push({
                        key: key,
                        label: value.label
                    });
                }
            }
            return statuses;
        },
    }
});
