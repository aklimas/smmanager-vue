<script>
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { historyStore } from '@/stores/core/history';

export default {
    name: 'History',
    components: { UiParentCard, BaseBreadcrumb },
    data: function() {
        return {
            page: { title: 'Historia' },
            breadcrumbs: [
                {
                    text: 'Panel',
                    disabled: false,
                    href: '#'
                },
                {
                    text: 'Historia',
                    disabled: true,
                    href: '#'
                }
            ],

            //Table
            loading: true,
            search: '',
            headers: [
                { title: 'Id', align: 'start', key: 'id' },
                { title: 'User', align: 'start', key: 'user' },
                { title: 'Endpoint', align: 'start', key: 'endpoint' },
                { title: 'Type', align: 'start', key: 'type' },
                { title: 'Path', align: 'start', key: 'path' },
                { title: 'Value', align: 'start', key: 'value' },
                { title: 'Changes', align: 'end', key: 'changes' },
                { title: 'Date', align: 'end', key: 'date' }
            ],
            store: historyStore()

        };
    },
    async mounted() {
        await this.store.fetch();
        this.loading = false;
    },
    computed: {
        getHistory: function() {
            return this.store.history;
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
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <UiParentCard title="Historia">
                <v-text-field v-model="search" append-inner-icon="mdi-magnify" label="Szukaj" hide-details
                              class="mb-5" />
                <v-data-table items-per-page="5" :headers="headers" :items="getHistory" item-value="id"
                              :search="search"
                              density="compact"
                              :loading="loading"
                              class="border rounded-md">
                </v-data-table>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

