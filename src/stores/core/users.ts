import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const usersStore = defineStore({
    id: 'Users',
    state: () => ({
        users: []
    }),
    getters: {},
    actions: {
        async getUserById(id: number) {
            return  await axios.get(`${baseUrl}/api/user/${id}`,
                {headers: {Authorization: `Bearer ${useAuthStore().user.token}`}});
        },
        // Fetch followers from action
        async fetch() {
            try {
                const response = await axios.get(`${baseUrl}/api/users`,
                    { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
                this.users = response.data;
            } catch (error) {

                console.log(error);

                // @ts-ignore
                if(error && error.code === 401){
                    useAuthStore().logout();
                }
            }
        },
        async save(data: any) {
            const response = await axios.post(`${baseUrl}/api/user`,
                data,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
            // @ts-ignore
            this.users.push(response.data);
            return response.data;
        },
        async update(data: object, index: number, id: number) {
            const response = await axios.put(`${baseUrl}/api/user/` + id,
                data,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });

            // @ts-ignore
            if(index !== 0){
                // @ts-ignore
                this.users.splice(index, 1, response.data ?? null);
            }
            return response.data;
        },
        async remove(id: number) {
            return await axios.delete(`${baseUrl}/api/user/` + id,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
        }

    }
});
