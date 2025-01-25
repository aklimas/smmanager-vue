import { defineStore } from 'pinia';
import axios from '@/utils/axios';
import { useAuthStore } from '@/stores/auth';

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const socialMediaStore = defineStore({
    id: 'socialMediaStore',
    state: () => ({
        pages: []
    }),
    getters: {},
    actions: {
        async fetch() {
            try {
                const response = await axios.get(`${baseUrl}/api/sm/pages`,
                    {headers: {Authorization: `Bearer ${useAuthStore().user.token}`}});
                this.pages = response.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
        async getAccountSettings() {
            try {
                const response = await axios.get(`${baseUrl}/api/account`, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
                return response.data;
            } catch (error) {
                alert('Wystąpił błąd podczas pobierania danych.');
                console.log(error);
                return {};
            }
        },
        async saveSelectedPage(pageId: string) {
            try {
                await axios.post(`${baseUrl}/api/sm/page/save`, { pageId }, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
                alert('Strona została zapisana.');
            } catch (error) {
                alert('Wystąpił błąd podczas zapisywania strony.');
                console.log(error);
            }
        },
        async updateAccountSettings(settings: any) {
            try {
                await axios.post(`${baseUrl}/api/account/settings`, settings, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
            } catch (error) {
                alert('Wystąpił błąd podczas zapisywania ustawień.');
                console.log(error);
            }
        },
        async saveSelectedMedia(selectedMedia: any[]) {
            try {


                let  dataToPost = {
                    selectedMedia: selectedMedia
                };

            await axios.post(`${baseUrl}/api/account/select-media`, dataToPost, {
                headers: { 
                Authorization: `Bearer ${useAuthStore().user.token}`,
                'Content-Type': 'application/json'
                }
            });
            } catch (error) {
            alert('Wystąpił błąd podczas zapisywania ustawień.');
            console.log(error);
            }
        },
        async saveFacebook(settings: any) {
            try {
                await axios.post(`${baseUrl}/api/account/facebook`, settings, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
            } catch (error) {
                alert('Wystąpił błąd podczas zapisywania ustawień.');
                console.log(error);
            }
        },
        async saveInstagram(settings: any) {
            try {
                await axios.post(`${baseUrl}/api/account/instagram`, settings, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
            } catch (error) {
                alert('Wystąpił błąd podczas zapisywania ustawień.');
                console.log(error);
            }
        },
        async saveLinkedin(settings: any) {
            try {
                await axios.post(`${baseUrl}/api/account/linkedin`, settings, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
            } catch (error) {
                alert('Wystąpił błąd podczas zapisywania ustawień.');
                console.log(error);
            }
        },
        async fetchPosts() {
            try {
                const response = await axios.get(`${baseUrl}/api/posts`, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
                this.posts = response.data;
                return response;
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania postów:', error);
                throw error;
            }
        },
        async createPost(postData: any) {
            try {
                await axios.post(`${baseUrl}/api/post/add`, postData, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
                alert('Post został zapisany.');
            } catch (error) {
                alert('Wystąpił błąd podczas zapisywania posta.');
                console.log(error);
            }
        },
        async updatePost(postData: any) {
            try {
                const response = await axios.put(`${baseUrl}/api/post/edit/${postData.id}`, postData, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
                return response;
            } catch (error) {
                console.error('Wystąpił błąd podczas aktualizacji posta:', error);
                throw error;
            }
        },
        async deletePost(postId: string) {
            try {
                const response = await axios.delete(`${baseUrl}/api/post/${postId}`, {
                    headers: { Authorization: `Bearer ${useAuthStore().user.token}` }
                });
                return response;
            } catch (error) {
                console.error('Wystąpił błąd podczas usuwania posta:', error);
                throw error;
            }
        }
    }
});
