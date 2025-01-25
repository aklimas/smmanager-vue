<script>
import BaseBreadcrumb from '@/components/shared/BaseBreadcrumb.vue';
import { socialMediaStore } from '@/stores/social-media/socialMedia';
import wysiwyg from 'vue-wysiwyg';

export default {
    name: 'CreatePost',
    components: { BaseBreadcrumb, wysiwyg },
    data: function() {
        return {
            page: { title: 'Utwórz Post' },
            breadcrumbs: [
                {
                    text: 'Social Media',
                    disabled: false,
                    href: '#'
                },
                {
                    text: 'Utwórz Post',
                    disabled: true,
                    href: '#'
                }
            ],
            store: socialMediaStore(),
            form: {
                style: '',
                hasHashtags: false,
                goal: '',
                topic: '',
                description: '',
                content: '',
                image: null,
                status: 'public',
                scheduleDate: null,
                scheduleTime: null
            },
            loading: true
        };
    },
    async mounted() {
        this.loading = false;
    },
    methods: {
        generateImage() {
            // Implementacja generowania zdjęcia
            alert('Generowanie zdjęcia...');
        },
        async submitForm() {
            try {
                this.loading = true;
                await this.store.createPost(this.form);
                alert('Post został zapisany.');
            } catch (error) {
                alert('Wystąpił błąd podczas zapisywania posta.');
                console.error(error);
            } finally {
                this.loading = false;
            }
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
            <v-form @submit.prevent="submitForm">
                <v-row>
                    <v-col cols="6">
                        <v-select
                            label="Jaki styl ma mieć post?"
                            v-model="form.style"
                            :items="['edukacyjny', 'refleksyjny', 'humorystyczny', 'inspirujący']"
                        ></v-select>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            
                        </v-sheet>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-switch
                    label="Czy ma mieć hasztagi?"
                    v-model="form.hasHashtags"
                ></v-switch>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            
                        </v-sheet>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-text-field
                    label="Jaki jest cel posta?"
                    v-model="form.goal"
                ></v-text-field>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            
                        </v-sheet>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-text-field
                    label="Temat posta"
                    v-model="form.topic"
                ></v-text-field>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            
                        </v-sheet>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <v-textarea
                    label="O czym ma być post"
                    v-model="form.description"
                ></v-textarea>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            
                        </v-sheet>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="6">
                        <wysiwyg
                    v-model="form.content"
                    :options="{ hideModules: { 'image': true } }"
                ></wysiwyg>
                    </v-col>
                    <v-col cols="6" >
                        <v-sheet border="success sm"  rounded class="pa-2 text-body-2">
                            
                        </v-sheet>
                    </v-col>
                </v-row>





                <v-file-input
                    label="Wgrywanie zdjęcia"
                    v-model="form.image"
                ></v-file-input>
                <v-btn @click="generateImage">Wygeneruj zdjęcie</v-btn>
                <v-radio-group
                    v-model="form.status"
                    row
                >
                    <v-radio label="Publiczny" value="public"></v-radio>
                    <v-radio label="Prywatny" value="private"></v-radio>
                </v-radio-group>
                <v-menu
                    ref="scheduleMenu"
                    v-model="form.scheduleDate"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="form.scheduleDate"
                            label="Harmonogram"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.scheduleDate"
                        @input="$refs.scheduleMenu.save(form.scheduleDate)"
                    ></v-date-picker>
                    <v-time-picker
                        v-model="form.scheduleTime"
                        @input="$refs.scheduleMenu.save(form.scheduleTime)"
                    ></v-time-picker>
                </v-menu>
                <v-btn type="submit" color="primary">Zapisz</v-btn>
            </v-form>
        </v-col>
    </v-row>
</template>

<style scoped lang="scss">
</style>