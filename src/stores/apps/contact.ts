import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';

export const useContactStore = defineStore({
    id: 'Contact',
    state: () => ({
        contacts: []
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetchContacts() {

            console.log(useAuthStore().user);

            try {
                const response = await axios.get('https://127.0.0.1:8000/api/users',
                    {headers: {Authorization: `Bearer ${useAuthStore().user.token}`}});




                this.contacts = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }
});
