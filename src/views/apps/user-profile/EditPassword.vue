<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { router } from '@/router';

export default {
    name: 'EditPassword',
    props: ['id'],
    data: function() {
        return {
            dialog: false,
            //Values
            password1: '',
            password2: '',

            //Validate
            valid: false,
            rules: {
                password: [(v) => !!v || 'E-mail is required'],
                passwordRepeat: [(v) => !!v || 'E-mail is required']
            },

            //Returns
            error: '',
            success: ''
        };
    },
    created() {
        if (this.$route.query.token === undefined) {
            router.push({ path: '/' });
        }
    },
    methods: {
        async onSave() {

            if (this.password1 === this.password2) {
                if (this.$refs.form.validate()) {

                    this.success = '';
                    this.error = '';
                    let error;
                    let success = await useAuthStore().newPassword(this.password1, this.$props.id)
                        .then(() => {
                            this.$moshaToast('Hasło zostało zaaktualizowane', {
                                hideProgressBar: false,
                                showIcon: true,
                                position: 'bottom-right',
                                type: 'success',
                                transition: 'bounce',
                                swipeClose: true
                            });
                            this.dialog = false;
                        })
                        .catch((error) => {
                            console.log(error);
                            if (error && error.violations) {
                                this.errors = [];
                                error.violations.forEach((er) => {
                                    this.errors[er.propertyPath] = er.message;
                                    this.$moshaToast(er.message, {
                                        hideProgressBar: false,
                                        showIcon: true,
                                        position: 'bottom-right',
                                        type: 'danger',
                                        transition: 'bounce',
                                        swipeClose: true
                                    });
                                });
                            }else{
                                this.$moshaToast(error, {
                                    hideProgressBar: false,
                                    showIcon: true,
                                    position: 'bottom-right',
                                    type: 'danger',
                                    transition: 'bounce',
                                    swipeClose: true
                                });
                            }
                        });
                }
            } else {
                this.error = 'Hasła muszą być jednakowe';
            }


        }

    }
};

</script>
<template>
    <v-dialog v-model="dialog" max-width="500" persistent="true">
        <template v-slot:activator="{ props }">
            <v-list-item class="py-4 px-8 custom-text-primary" v-bind="props">
                <template v-slot:prepend>
                    <v-avatar size="48" color="lightprimary" class="mr-3" rounded="md">
                        <LockIcon></LockIcon>
                    </v-avatar>
                </template>
                <div>
                    <h6 class="text-subtitle-1 font-weight-semibold mb-2 custom-title">Zmiana hasła</h6>
                </div>
                <p class="text-subtitle-1 font-weight-regular textSecondary">Zmień swoje hasło</p>
            </v-list-item>
        </template>
        <v-card>
            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">Zmiana hasła</span>
            </v-card-title>
            <v-form ref="form" class="mt-sm-13 mt-8" v-model="valid" lazy-validation>
                <v-card-text>
                    <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Hasło</v-label>
                    <VTextField type="password" v-model="password1" :rules="rules.password" required></VTextField>
                    <v-label class="text-subtitle-1 font-weight-medium pb-2 text-lightText">Powtórz hasło</v-label>
                    <VTextField type="password" v-model="password2" :rules="rules.password" required></VTextField>

                    <div v-if="error" class="mt-2">
                        <v-alert color="error">{{ error }}</v-alert>
                    </div>
                    <div v-if="success" class="mt-2">
                        <v-alert color="success">{{ success }}</v-alert>
                    </div>
                </v-card-text>
            </v-form>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="error" @click="dialog=false">Anuluj</v-btn>
                <v-btn
                    color="secondary"
                    variant="flat"
                    @click="onSave"
                >Zapisz
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
