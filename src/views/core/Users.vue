<script>
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useAuthStore } from '@/stores/auth';
import DeleteAnswer from '@/components/ui-components/dialogs/DeleteAnswer.vue';
import { settingsDesktopStore } from '@/stores/core/settingsDesktop';
import { usersStore } from '@/stores/core/users';
import { errorMessage, successMessage } from '@/stores/notifications';

export default {
    name: 'Users',
    components: { DeleteAnswer, UiParentCard, BaseBreadcrumb },
    data: function() {
        return {
            page: { title: 'Użytkownicy' },
            breadcrumbs: [
                {
                    text: 'Panel',
                    disabled: false,
                    href: '#'
                },
                {
                    text: 'Użytkownicy',
                    disabled: true,
                    href: '#'
                }
            ],

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

            //Table
            loading: true,
            search: '',
            headers: [
                { title: 'Id', align: 'start', key: 'id' },
                { title: 'Email', align: 'start', key: 'email' },
                { title: 'Imię', align: 'start', key: 'firstName' },
                { title: 'Nazwisko', align: 'start', key: 'lastName' },
                { title: 'Status', align: 'start', key: 'status' },
                { title: 'Akcje', align: 'end', key: 'actions' }
            ],

            store: usersStore(),


            //Add/Edit
            dialog: false,
            editedIndex: -1,
            editedItem: {
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                roles: []
            },
            defaultItem: {
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                roles: [],
                status: 'enabled'
            }


        };
    },
    async mounted() {
        await this.store.fetch();
        this.loading = false;
    },
    async created() {
        await settingsDesktopStore().get();
    },
    computed: {
        getUsers: function() {
            return this.store.users;
        },
        formTitle: function() {
            return this.editedIndex === -1 ? 'Nowy użytkownik' : 'Edytuj użytkownika';
        }
    },

    methods: {
        useAuthStore,
        settingsDesktopStore,
        getStatus(status, type) {
            return this.settingsDesktopStore().settingsDesktop.userStatuses[status][type];
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
                                successMessage('Użytkownik został zaaktualizowany');
                                this.close();
                            }).catch((error) => {
                                errorMessage(error);
                            });

                    } else {
                        dataToPost.status = this.editedItem.status;
                        await this.store.save(dataToPost).then(() => {
                            successMessage('Użytkownik został dodany');
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
            const user = await usersStore().getUserById(item.id);
            this.editedItem = item;
            this.editedIndex = index;
            this.editedItem = user.data;
            this.dialog = true;
        },
        async deleteItem(item, index) {
            this.getUsers.splice(index, 1);
            await this.store.remove(item.id).then(() => {
                successMessage('Użytkownik został usunięty');
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

        <v-col cols="12" lg="8" md="6" class="text-right">
            <v-dialog v-model="dialog" max-width="500" persistent="true">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-account-multiple-plus</v-icon>
                        Dodaj użytkownika
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>

                    <v-form ref="form">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        v-model="editedItem.email"
                                        :rules="rules.email"
                                        :error-messages="errors?.email"
                                        label="Email"
                                        type="email"
                                    ></v-text-field>

                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        :rules="rules.firstName"
                                        :error-messages="errors?.firstName"
                                        v-model="editedItem.firstName"
                                        label="Imię"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                        variant="outlined"
                                        :hide-details="errors?.lastName === undefined"
                                        :rules="rules.lastName"
                                        :error-messages="errors?.lastName"
                                        v-model="editedItem.lastName"
                                        label="Nazwisko"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-select
                                        variant="outlined"
                                        hide-details
                                        :items="settingsDesktopStore().listStatus('userStatuses')"
                                        v-model="editedItem.status"
                                        label="Status"
                                        item-value="key"
                                        item-title="label"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-title class="pa-4">
                            <span class="text-h6 text-white">Uprawnienia</span>
                        </v-card-title>
                        <v-card-text>

                            <v-row>
                                <v-col cols="12" md="6" sm="6"
                                       v-for="(role, key) in settingsDesktopStore().settingsDesktop.userRoles"
                                       :key="role">
                                    <v-checkbox
                                        v-model="editedItem.roles"
                                        color="red"
                                        :label="role"
                                        :value="key"
                                        hide-details
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                        </v-card-text>

                        <v-card-actions class="pa-4">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="close">Anuluj</v-btn>
                            <v-btn
                                color="secondary"
                                :disabled="editedItem.email === '' || editedItem.firstName === '' || editedItem.lastName === ''"
                                variant="flat"
                                @click="onSubmit" :loading="isSubmitting"
                            >Zapisz
                            </v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">


            <UiParentCard title="Użytkownicy">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Szukaj" hide-details
                              class="mb-5" />
                <v-data-table items-per-page="5" :headers="headers" :items="getUsers" item-value="id"
                              :search="search"
                              density="compact"
                              :loading="loading"
                              class="border rounded-md">
                    <template v-slot:item.status="{ item }">
                        <v-chip size="small"
                                :color="settingsDesktopStore().getStatus('userStatuses',item.status, 'color')">
                            {{ settingsDesktopStore().getStatus('userStatuses', item.status, 'label') }}
                        </v-chip>
                    </template>
                    <template v-slot:item.actions="{ item ,index}">
                        <v-tooltip text="Edytuj">
                            <template v-slot:activator="{ props }">
                                <v-btn icon flat @click="editItem(item, index)" v-bind="props">
                                    <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                </v-btn>
                            </template>
                        </v-tooltip>
                        <v-tooltip text="Usuń">
                            <template v-slot:activator="{ props }">
                                <DeleteAnswer @delete="deleteItem(item, index)" v-bind="props"></DeleteAnswer>
                            </template>
                        </v-tooltip>
                    </template>
                </v-data-table>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

