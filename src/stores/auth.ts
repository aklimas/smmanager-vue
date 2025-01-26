import { defineStore } from 'pinia';
import { router } from '@/router';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import axios from '@/utils/axios';
import { useCustomizerStore } from '@/stores/customizer';
import config from '@/config';
import { settingsDesktopStore } from '@/stores/core/settingsDesktop';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email: string, password: string) {
            const user = await fetchWrapper.post(`${baseUrl}/auth`, { email, password })
            if (user.code !== 401) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                await settingsDesktopStore().get();
                if(this.user.accounts > 0) {
                    router.push(this.returnUrl || '/dashboards/minimal');
                }else{
                    router.push(this.returnUrl || '/social-media/welcome');
                }

                
            } else {
                return Promise.reject(user.message);
            }


        },

        async loginGoogle(token: string) {
            const user = await fetchWrapper.post(`${baseUrl}/api/auth/google`, { token })
            if (user.code !== 401) {
                this.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                await settingsDesktopStore().get();
                if(this.user.accounts > 0) {
                    router.push(this.returnUrl || '/dashboards/minimal');
                }else{
                    router.push(this.returnUrl || '/social-media/welcome');
                }

                
            } else {
                return Promise.reject(user.message);
            }


        },

        async register(email: string, password: string) {
            const user = await axios.post(`${baseUrl}/api/register`, { email, password });

            console.log(user);

            if(user.status === 201){
                router.push('/email/confirm');
            }
            //this.user = user;
            //localStorage.setItem('user', JSON.stringify(user));

            //
        },
        async registerConfirm(token: string) {
            try {
                const response = await axios.post(`${baseUrl}/api/register/confirm`, { token });
                this.user = response.data;
                localStorage.setItem('user', JSON.stringify(response.data));
                //return response;
                router.push('/dashboards/modern');
            } catch (error) {
                router.push('/auth/login');
            }
        },

        async remindPassword(email: string) {
            return await axios.post(`${baseUrl}/api/remind-password`, { email });
        },
        async checkToken(token: string) {
            return await axios.post(`${baseUrl}/api/check-token`, { token });
        },
        async resetPassword(password: string, token: string) {
            return await axios.post(`${baseUrl}/api/reset-password`, { password, token });
        },
        async newPassword(password: string, id: number) {
            return await axios.post(`${baseUrl}/api/new-password/` + id, { password },
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
        },

        async saveSetting(idUser: number, data: object) {
            return await axios.post(`${baseUrl}/api/settings/` + idUser, data,
                { headers: { Authorization: `Bearer ${useAuthStore().user.token}` } });
        },

        logout() {
            router.push('/auth/login');
            console.log('Wylogowanie');
            localStorage.removeItem('user');
            this.user = null;
        },

        checkRoles(roles: any) {

            
            // If roles is an array, add ROLE_SUPER_ADMIN and ROLE_ADMIN to it
            if (Array.isArray(roles)) {
                roles.push('ROLE_SUPER_ADMIN', 'ROLE_ADMIN');
            } else {
                // If roles is not an array, convert it to an array and add the additional roles
               // roles = [roles];
            }

            //console.log(roles)

            if (roles) {
                const allRoles = useAuthStore().user?.data?.roles || useAuthStore().user?.roles || [];
                //console.log(allRoles);
                return roles.some((role: any) => allRoles.includes(role));
            } else {
                return true;
            }
        }
    }
});
