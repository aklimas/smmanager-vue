import { defineStore } from 'pinia';

import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';


const baseUrl = `${import.meta.env.VITE_API_URL}`;



export const useUsersStore = defineStore({
    id: 'Users',
    state: () => ({
        users: {}
    }),
    actions: {
        async getUserById(id: number) {
            return  await axios.get(`${baseUrl}/api/user/${id}`,
                {headers: {Authorization: `Bearer ${useAuthStore().user.token}`}});
        },
    }
});
