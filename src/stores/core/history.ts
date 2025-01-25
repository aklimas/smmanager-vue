import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const historyStore = defineStore({
    id: 'History',
    state: () => ({
        history: []
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetch() {
            try {
                const response = await axios.get(`${baseUrl}/api/histories`,
                    {headers: {Authorization: `Bearer ${useAuthStore().user.token}`}});
                this.history = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
