import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const packagesStore = defineStore({
    id: 'Packages',
    state: () => ({
        packages: [],
        cards: [],
        packagesPublish: [],
        buyPackageId: 0,
        features: [
            'Płatność dopiero po 14 dniach',
            'Dodawanie postów',
        ],
        freeDays: 0 // Dodane pole "Ilość darmowych dni"
    }),
    getters: {},
    actions: {

        async getPackageById(id: number) {
            return await axios.get(`${baseUrl}/api/all-packages/${id}`,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
        },

        // Fetch followers from action
        async fetch() {
            try {
                const response = await axios.get(`${baseUrl}/api/packages`,
                    { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
                this.packages = response.data;
            } catch (error) {

                console.log(error);

                // @ts-ignore
                if (error && error.code === 401) {
                    useAuthStore().logout();
                }
            }
        },
        async fetchListCard() {
            
            //try {
                const response = await axios.get(`${baseUrl}/api/payment/methods`,
                    { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });


                    console.log(response);

                return response.data;



            // } catch (error) {

            //     console.log(error);

            //     // @ts-ignore
            //     if (error && error.code === 401) {
            //         useAuthStore().logout();
            //     }
            // }
        },
        async publish() {
            const response = await axios.get(`${baseUrl}/api/packages`,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
            this.packagesPublish = response.data;
        },
        async save(data: any) {
            const response = await axios.post(`${baseUrl}/api/package`,
                data,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
            // @ts-ignore
            this.packages.push(response.data);
            return response.data;
        },
        async buy(data: any) {
            const response = await axios.post(`${baseUrl}/api/buy`,
            data,
            { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
            this.buyPackageId = response.data;
            return response;
        },

        async addPayMethod(data: any) {

            console.log(data);

            const response = await axios.post(`${baseUrl}/api/payment/method`,
            data,
            { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
            return response.data;
        },
        async update(data: object, index: number, id: number) {
            const response = await axios.put(`${baseUrl}/api/package/` + id,
                data,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });

            // @ts-ignore
            this.packages.splice(index, 1, response.data);
            return response.data;
        },
        async remove(id: number) {
            return await axios.delete(`${baseUrl}/api/packages/` + id,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
        },
        async removeCard(id: number) {
            return await axios.delete(`${baseUrl}/api/payment/method/` + id,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
        },
        async setAsDefaultCard(id: number) {
            return await axios.put(`${baseUrl}/api/payment/method/default/` + id,
                {},
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
        },

    }
});
