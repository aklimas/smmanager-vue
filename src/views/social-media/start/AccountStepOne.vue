<template>
    <v-row>
        <v-col cols="12" lg="4" md="6">
            <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="12">
            <v-form @submit.prevent="submitForm">
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            label="Jakie są wartości marki?"
                            v-model="form.brandValues"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            Wartości marki - definiują Twoją markę-wpływają na to jak jest postrzegana. Może to być np jakość, wygoda, elegancja, oryginalność, kreatywność. Zapisz ok. 3-5 słów- wartości Twojej marki.
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                    label="Jaki produkt oferujesz lub usługę?"
                    v-model="form.productOrService"
                    hide-details="auto"
                ></v-text-field>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            Jaki produkt oferujesz- Napisz najdokładniej jak potrafisz produkt/ produty ( max 3) na których chcesz się skupić podczas budowania swojej marki.
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                    label="Jaki jest Cel budowania marki?"
                    v-model="form.brandGoal"
                    hide-details="auto"
                ></v-text-field>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            Jaki jest cel budowania marki- Napisz jaki masz cel w związku z dodawanymi postami. Czy jest to cel sprzedażowy, budujący świadomość marki, zwiększający wiarygodność Twojej marki czy budowanie społeczności.
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                    <v-col cols="6">
                        <v-file-input
                    label="Wgrywanie materiałów (pdf/doc/txt/jpg/svg)"
                    v-model="form.materials"
                    multiple
                    :rules="[files => files.length <= 5 || 'Możesz wgrać maksymalnie 5 plików']"
                ></v-file-input>
                    </v-col>
                    <v-col cols="6" >
                        
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                    label="Link do strony internetowej"
                    v-model="form.websiteLink"
                    hide-details="auto"
                ></v-text-field>
                    </v-col>
                    <v-col cols="6" >

                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>

                <v-row>
                    <v-col cols="6">
                        <v-text-field
                    label="Jaki jest Twój styl, jeżeli chodzi o prowadzenie kont?"
                    v-model="form.accountStyle"
                    hide-details="auto"
                ></v-text-field>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            
Jaki jest Twój styl jeśli chodzi o prowadzenie-tam miała być lista rozwijalna( humorystyczny, profesjonalny, refleksyjny, angażujący społeczność)

                        </v-sheet>
                    </v-col>
                </v-row>
                <v-divider class="my-3"></v-divider>
                
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
                                closable
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
import { socialMediaStore } from '@/stores/social-media/socialMedia';

export default {
    name: 'AccountStepOne',
    components: { BaseBreadcrumb },
    data() {
        return {
            page: { title: 'Twój profil' },
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
                },
                {
                    text: 'O Twojej marce',
                    disabled: true,
                    href: '#'
                }
            ],
            store: socialMediaStore(),
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
        async submitForm() {
            try {
                await this.store.updateAccountSettings(this.form);
                alert('Ustawienia zostały zapisane.');
            } catch (error) {
                alert('Wystąpił błąd podczas zapisywania ustawień.');
                console.error(error);
            }
        }
    }
};
</script>

<style scoped lang="scss">
</style>