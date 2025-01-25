import { defineStore } from 'pinia';
// project imports
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const employeesStore = defineStore({
    id: 'Employees',
    state: () => ({
        employees: []
    }),
    getters: {},
    actions: {
        // Fetch followers from action
        async fetch() {
            try {
                const response = await axios.get(`${baseUrl}/api/employees/` + useAuthStore().user.id,
                    { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
                this.employees = response.data;
            } catch (error) {

                console.log(error);

                // @ts-ignore
                if(error && error.code === 401){
                    useAuthStore().logout();
                }
            }
        },
        async save(data: any) {
            const response = await axios.post(`${baseUrl}/api/employee`,
                data,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
            // @ts-ignore
            this.employees.push(response.data);
            return response.data;
        },
        async update(data: object, index: number, id: number) {
            const response = await axios.put(`${baseUrl}/api/employee/` + id,
                data,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });

            // @ts-ignore
            this.employees.splice(index, 1, response.data);
            return response.data;
        },
        async remove(id: number) {
            return await axios.delete(`${baseUrl}/api/user/` + id,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
        }

    }
});
