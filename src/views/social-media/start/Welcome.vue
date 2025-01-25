<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-form @submit.prevent="submitForm">
                <v-text-field
                    label="Jakie są wartości marki?"
                    v-model="form.brandValues"
                ></v-text-field>
                <v-text-field
                    label="Jaki produkt oferujesz lub usługę?"
                    v-model="form.productOrService"
                ></v-text-field>
                <v-text-field
                    label="Jaki jest Cel budowania marki?"
                    v-model="form.brandGoal"
                ></v-text-field>
                <v-file-input
                    label="Wgrywanie materiałów (pdf/doc/txt/jpg/svg)"
                    v-model="form.materials"
                    multiple
                    :rules="[files => files.length <= 5 || 'Możesz wgrać maksymalnie 5 plików']"
                ></v-file-input>
                <v-text-field
                    label="Link do strony internetowej"
                    v-model="form.websiteLink"
                ></v-text-field>
                <v-text-field
                    label="Jaki jest Twój styl, jeżeli chodzi o prowadzenie kont?"
                    v-model="form.accountStyle"
                ></v-text-field>
                <v-row>
                    <v-col cols="4">
                        <v-color-picker
                            v-model="newColor"
                            hide-canvas
                            show-swatches
                            hex-picker
                        ></v-color-picker>
                    </v-col>
                    <v-col cols="1" class="d-flex align-center">
                        <v-btn icon @click="addColor">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col cols="7">
                        <template v-for="color in form.colors" :key="color">
                            <v-chip
                                :style="{ backgroundColor: color }"
                                close
                                @click:close="removeColor(color)"
                            >
                                {{ color }}
                            </v-chip>
                        </template>
                    </v-col>
                </v-row>
                <v-btn type="submit" color="primary">Zapisz</v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { packagesStore } from '@/stores/core/packages';

export default {
    name: 'AccountSettings',
    components: { BaseBreadcrumb },
    data() {
        return {
            page: { title: 'Ustawienia' },
            breadcrumbs: [
                {
                    text: 'Social Media',
                    disabled: false,
                    href: '#'
                },
                {
                    text: 'Ustawienia',
                    disabled: true,
                    href: '#'
                }
            ],
            store: packagesStore(),
            form: {
                brandValues: '',
                productOrService: '',
                brandGoal: '',
                materials: [],
                websiteLink: '',
                accountStyle: '',
                colors: []
            },
            loading: true,
            newColor: '#ff00ff'
        };
    },
    async mounted() {
        this.loading = false;
    },
    methods: {
        addColor() {
            if (this.newColor && !this.form.colors.includes(this.newColor)) {
                this.form.colors.push(this.newColor);
            }
        },
        removeColor(color) {
            const index = this.form.colors.indexOf(color);
            if (index > -1) {
                this.form.colors.splice(index, 1);
            }
        },
        submitForm() {
            // Implementacja wysyłania formularza
            alert('Formularz został wysłany.');
        }
    }
};
</script>

<style scoped lang="scss">
</style>