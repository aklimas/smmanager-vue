<script>
import { socialMediaStore } from '@/stores/social-media/socialMedia';
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
export default {
    name: 'ListPages',
    components: { BaseBreadcrumb },
    data: function() {
        return {
            page: { title: 'Lista stron FB' },
            breadcrumbs: [
                {
                    text: 'Social Media',
                    disabled: false,
                    href: '#'
                },
                {
                    text: 'Lista stron',
                    disabled: true,
                    href: '#'
                }
            ],
            store: socialMediaStore(),
            selectedPage: null
        };
    },
    async mounted() {
        await this.fetchPages();
        this.loading = false;
    },
    methods: {
        async fetchPages() {
            await this.store.fetch();
        },
        selectPage(pageId) {
            this.selectedPage = pageId;
        },
        async saveSelectedPage() {
            if (this.selectedPage) {
                await this.store.saveSelectedPage(this.selectedPage);
                alert('Strona została zapisana.');
            } else {
                alert('Proszę wybrać stronę.');
            }
        }
    },
    computed: {
        pages() {
            return this.store.pages;
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
            <v-row>
                <v-col v-for="page in pages" :key="page.id" cols="12" sm="6" md="4">
                    <v-card
                        :class="{ 'selected-card': selectedPage === page.id }"
                        @click="selectPage(page.id)"
                    >
                        <v-row  no-gutters align="center">
                            <v-col cols="4">
                                <v-img :src="page.picture" height="50px" contain></v-img>
                            </v-col>
                            <v-col cols="8">
                                <v-card-title>{{ page.name }}</v-card-title>
                                <v-card-text>
                                    <div>ID: {{ page.id }}</div>
                                </v-card-text>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-row justify="center" class="mt-4">
                <v-btn color="primary" @click="saveSelectedPage">Zapisz</v-btn>
            </v-row>
</template>
<style scoped lang="scss">
.selected-card {
    box-shadow: 0 0 8px rgba(66, 165, 245, 0.5); /* Niebieski cień */

}
</style>