<script>

import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { settingsDesktopStore } from '@/stores/core/settingsDesktop';
import { packagesStore } from '@/stores/core/packages';
import { errorMessage, successMessage } from '@/stores/notifications';
import DeleteAnswer from '@/components/ui-components/dialogs/DeleteAnswer.vue';

export default {
    name: 'Packages',
    components: { DeleteAnswer, UiParentCard, BaseBreadcrumb },

    data: function () {
        return {
            page: { title: 'Pakiety' },
            breadcrumbs: [
                {
                    text: 'Panel',
                    disabled: false,
                    href: '#'
                },
                {
                    text: 'Pakiety',
                    disabled: true,
                    href: '#'
                }
            ],
            errors: null,

            dialog: false,
            loading: true,
            search: '',
            selected: null,
            editedIndex: -1,

            editedItem: {
                id: '',
                name: '',
                description: '',
                features: [],
                price: '',
                status: ''
            },
            defaultItem: {
                id: '',
                name: '',
                description: '',
                features: [],
                price: '',
                status: 'draft',
                freeDays: 0 // Dodane pole "Ilość darmowych dni"
            },

            headers: [
                { title: 'Id', align: 'start', key: 'id' },
                { title: 'Nazwa', align: 'start', key: 'name' },
                { title: 'Opis', align: 'start', key: 'description' },
                { title: 'Cena', align: 'start', key: 'price' },
                { title: 'Status', align: 'start', key: 'status' },
                { title: 'Akcje', align: 'end', key: 'actions' }
            ],

            headersHistory: [
                { title: 'Nazwa', align: 'start', key: 'name' },
                { title: 'Cena', align: 'start', key: 'price' },
                { title: 'Start', align: 'start', key: 'startDate' },
                { title: 'Koniec', align: 'start', key: 'endDate' },
                { title: 'Akcje', align: 'end', key: 'actions' }
            ],

            store: packagesStore(),
            //FORM
            rules: {
                name: [(v) => !!v || 'Nazwa jest wymagana', (v) => (v && v.length <= 180) || 'Imię może mieć maksymalnie 180 znaków'],
                price: [
                    (v) => !!v || 'Cena jest wymagana',
                    (v) => {
                        const normalizedPrice = v.toString().replace(',', '.');
                        return (!isNaN(normalizedPrice) && /^\d+(\.\d{1,2})?$/.test(normalizedPrice)) || 'Nie pawidłowa cena';
                    }
                ],
                freeDays: [(v) => !!v || 'Ilość darmowych dni jest wymagana', (v) => !isNaN(v) || 'Ilość darmowych dni musi być liczbą']
            },
            isSubmitting: false
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
        getPackages: function () {
            return this.store.packages;
        },
        formTitle: function () {
            return this.editedIndex === -1 ? 'Nowy pakiet' : 'Edytuj pakiet';
        }
    },

    methods: {
        settingsDesktopStore,
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
                    const dataToPost = {
                        name: this.editedItem.name,
                        description: this.editedItem.description,
                        price: parseFloat(this.editedItem.price.toString().replace(',', '.')),
                        suggested: false,
                        priority: 0,
                        features: this.editedItem.features,
                        status: this.editedItem.status,
                        freeDays: parseInt(this.editedItem.freeDays)
                    };

                    console.log('dataToPost', dataToPost);

                    if (this.editedIndex > -1) {
                        dataToPost.status = this.editedItem.status;
                        await this.store
                            .update(dataToPost, this.editedIndex, this.editedItem.id)
                            .then(() => {
                                successMessage('Pakiet został zaaktualizowany');
                                this.close();
                            })
                            .catch((error) => {
                                errorMessage(error);
                            });
                    } else {
                        await this.store
                            .save(dataToPost)
                            .then(() => {
                                successMessage('Pakiet został dodany');
                                this.close();
                            })
                            .catch((error) => {
                                errorMessage(error);
                            });
                    }
                    this.isSubmitting = false;
                }
            });
        },

        async editItem(item, index) {
            const user = await packagesStore().getPackageById(item.id);
            this.editedItem = item;
            this.editedIndex = index;
            this.editedItem = user.data;
            this.dialog = true;
        },
        async deleteItem(item, index) {
            this.getPackages.splice(index, 1);
            await this.store
                .remove(item.id)
                .then(() => {
                    successMessage('Pakiet został usunięty');
                    this.close();
                })
                .catch((error) => {
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
            <v-dialog v-model="dialog" fullscreen persistent="true">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" flat class="ml-auto">
                        <v-icon class="mr-2">mdi-plus</v-icon>
                        Dodaj pakiet
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="pa-4 bg-secondary">
                        <span class="title text-white">{{ formTitle }}</span>
                    </v-card-title>
                    <v-form ref="form">
                        <v-card-item>
                            <v-row>
                                <v-col>
                                    <v-card-text>
                                        <v-row>
                                            <v-col cols="12" sm="6">
                                                <v-text-field
                                                    variant="outlined"
                                                    v-model="editedItem.name"
                                                    :rules="rules.name"
                                                    :error-messages="errors?.name"
                                                    label="Nazwa"
                                                    type="text"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-textarea
                                                    label="Opis"
                                                    variant="outlined"
                                                    :error-messages="errors?.description"
                                                    v-model="editedItem.description"
                                                ></v-textarea>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field
                                                    variant="outlined"
                                                    :error-messages="errors?.price"
                                                    :rules="rules.price"
                                                    v-model="editedItem.price"
                                                    label="Cena"
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-text-field
                                                    v-model="editedItem.freeDays"
                                                    :rules="rules.freeDays"
                                                    label="Ilość darmowych dni"
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6">
                                                <v-select
                                                    variant="outlined"
                                                    :items="settingsDesktopStore().listStatus('packageStatuses')"
                                                    v-model="editedItem.status"
                                                    label="Status"
                                                    item-value="key"
                                                    item-title="label"
                                                ></v-select>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                    <v-card-title class="pa-4">
                                        <span class="text-h6 text-white">Funkcje</span>
                                    </v-card-title>
                                    <v-card-text>
                                        <v-row>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                sm="6"
                                                class="pa-0"
                                                v-for="(feature, key) in store.features"
                                                :key="feature"
                                            >
                                                <v-checkbox
                                                    v-model="editedItem.features"
                                                    color="red"
                                                    :label="feature"
                                                    :value="key"
                                                    hide-details
                                                    density="compact"
                                                ></v-checkbox>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-col>
                                <v-col>
                                    <v-card-title class="pa-4">
                                        <span class="text-h6 text-white">Historia</span>
                                    </v-card-title>
                                    <v-card-item>
                                        <v-data-table
                                            class="month-table"
                                            items-per-page="5"
                                            :headers="headersHistory"
                                            :items="editedItem.history"
                                            item-value="id"
                                            density="compact"
                                        >
                                            <template v-slot:item.actions="{ item, index }">
                                                <v-tooltip>
                                                    {{ item }}
                                                    <template v-slot:activator="{ props }">
                                                        <v-btn icon flat @click="editItem(item, index)" v-bind="props">
                                                            <PencilIcon stroke-width="1.5" size="20" class="text-primary" />
                                                        </v-btn>
                                                    </template>
                                                </v-tooltip>
                                            </template>
                                        </v-data-table>
                                    </v-card-item>
                                </v-col>
                            </v-row>
                        </v-card-item>

                        <v-card-actions class="pa-4">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="close">Anuluj</v-btn>
                            <v-btn
                                color="secondary"
                                :disabled="
                                    editedItem.name === '' ||
                                    editedItem.price === '' ||
                                    editedItem.price === null ||
                                    isNaN(editedItem.price)
                                "
                                variant="flat"
                                @click="onSubmit"
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
            <UiParentCard title="Pakiety">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Szukaj" hide-details class="mb-5" />
                <v-data-table
                    items-per-page="5"
                    :headers="headers"
                    :items="getPackages"
                    item-value="id"
                    :search="search"
                    density="compact"
                    :loading="loading"
                    class="border rounded-md"
                >
                    <template v-slot:item.status="{ item }">
                        <v-chip size="small" :color="settingsDesktopStore().getStatus('packageStatuses', item.status, 'color')">
                            {{ settingsDesktopStore().getStatus('packageStatuses', item.status, 'label') }}
                        </v-chip>
                    </template>
                    <template v-slot:item.actions="{ item, index }">
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
