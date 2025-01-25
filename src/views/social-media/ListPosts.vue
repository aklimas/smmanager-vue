<script>
import { computed, onMounted, ref } from 'vue';
import { socialMediaStore } from '@/stores/social-media/socialMedia';
import { useUsersStore } from '@/stores/authUser';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { employeesStore } from '@/stores/core/employees';
import { useAuthStore } from '@/stores/auth';
import DeleteAnswer from '@/components/ui-components/dialogs/DeleteAnswer.vue';
import { settingsDesktopStore } from '@/stores/core/settingsDesktop';
import { errorMessage, successMessage } from '@/stores/notifications';

export default {
    name: 'Employees',
    components: { DeleteAnswer, UiParentCard, BaseBreadcrumb },
    data: function() {
        return {
            breadcrumbs: [
                {
                    text: 'Panel',
                    disabled: false,
                    href: '#'
                },
                {
                    text: 'Lista Postów',
                    disabled: true,
                    href: '#'
                }
            ],
            page: { title: 'Lista postów' },

            //FORM
            rules: {
                email: [(v) => !!v || 'E-mail jest wymagany', (v) => /.+@.+\..+/.test(v) || 'E-mail musi być prawidłowy'],
                firstName: [
                    (v) => !!v || 'Pole jest wymagane',
                    (v) => (v && v.length <= 180) || 'Imię może mieć maksymalnie 180 znaków'
                ],
                lastName: [
                    (v) => !!v || 'Pole jest wymagane',
                    (v) => (v && v.length <= 180) || 'Nazwisko może mieć maksymalnie 180 znaków'
                ]
            },
            isSubmitting: false,

            errors: null,
            valid: true,
            loading: true,
            dialog: false,
            search: '',
            selected: null,
            editedIndex: -1,


            editedItem: {
                id: '',
                title: '',
                firstName: '',
                lastName: '',
                roles: [],
            },
            defaultItem: {
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                status: 'enabled',
                roles: [],
            },

            headers: [
                { title: 'Id', align: 'start', key: 'id' },
                { title: 'Tytuł', align: 'start', key: 'topic' },
                { title: 'Status', align: 'start', key: 'status' },
                { title: 'Akcje', align: 'end', key: 'actions' }
            ],

            store: socialMediaStore()

            

        };
    },
    async created() {
        await settingsDesktopStore().get();
        await this.store.fetchPosts();
    },
    async mounted() {
        await this.store.fetchPosts();
        this.loading = false;
    },
    computed: {
        getPosts: function() {
            return this.store.posts;
        },
        formTitle: function() {
            return this.editedIndex === -1 ? 'Nowy pracownik' : 'Edytuj pracownika';
        }
    },

    methods: {
        useAuthStore,
        settingsDesktopStore,
        getStatus(status, type) {
            return this.settingsDesktopStore().settingsDesktop.employeesStatuses[status][type];
        },
        close() {
            this.dialog = false;
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            }, 300);
            ``;
        },

        onSubmit() {
            this.$nextTick(async () => {
                this.$refs.form.validate();
                if (this.$refs.form.isValid) {
                    this.isSubmitting = true;

                    let dataToPost = {
                        firstName: this.editedItem.firstName,
                        lastName: this.editedItem.lastName,
                        owner: useAuthStore().user.id,
                        email: this.editedItem.email,
                        roles: this.editedItem.roles
                    };

                    if (this.editedIndex > -1) {
                        dataToPost.status = this.editedItem.status;
                        await this.store.update(dataToPost, this.editedIndex, this.editedItem.id)
                            .then(() => {
                                successMessage('Pracownik został zaaktualizowany');
                                this.close();
                            }).catch((error) => {
                                errorMessage(error);
                            });

                    } else {
                        dataToPost.status = this.editedItem.status;
                        await this.store.save(dataToPost).then(() => {
                            successMessage('Pracownik został dodany');
                            this.close();
                        }).catch((error) => {
                            errorMessage(error);
                        });
                    }
                    this.isSubmitting = false;

                }
            });
        },
        async editItem(item, index) {
            const user = await useUsersStore().getUserById(item.id);
            this.editedItem = item;
            this.editedIndex = index;
            this.editedItem = user.data;
            this.dialog = true;
        },
        async deleteItem(item, index) {
            this.getUsers.splice(index, 1);
            await this.store.remove(item.id).then(() => {
                successMessage('Pracownik został usunięty');
                this.close();
            }).catch((error) => {
                errorMessage(error);
            });
        }
    }
};
</script>

<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title class="pa-4">
                    <span class="text-h6">Lista Postów</span>
                </v-card-title>
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="getPosts"
                        item-key="id"
                        class="elevation-1"
                    >
                        <template v-slot:top>
                            <v-toolbar flat>
                                <v-toolbar-title>Posty</v-toolbar-title>
                                <v-divider class="mx-4" inset vertical></v-divider>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click="createPost">Utwórz Post</v-btn>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon small class="mr-2" @click="editPost(item)">
                                mdi-pencil
                            </v-icon>
                            <v-icon small @click="deletePost(item)">
                                mdi-delete
                            </v-icon>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
                <v-card-text>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="editedItem.title"
                                label="Tytuł"
                                :rules="rules.title"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select
                                v-model="editedItem.status"
                                :items="statusOptions"
                                label="Status"
                                required
                            ></v-select>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea
                                v-model="editedItem.content"
                                label="Treść"
                                :rules="rules.content"
                                required
                            ></v-textarea>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="close">Anuluj</v-btn>
                    <v-btn color="primary" type="submit">Zapisz</v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-dialog>
</template>

