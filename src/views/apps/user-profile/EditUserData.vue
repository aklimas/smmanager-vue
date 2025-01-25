<script>

import { useAuthStore } from '@/stores/auth';
import { usersStore } from '@/stores/core/users';

export default {
    name: 'EditUserData',
    props: ['editedItem'],
    data: function() {
        return {
            dialog: false,
            valid: true,
            errors: null,
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
            store: usersStore()
        };
    },
    methods: {

        onSubmit() {
            this.$nextTick(async () => {
                this.$refs.form.validate();
                if (this.$refs.form.isValid) {
                    this.isSubmitting = true;
                    let dataToPost = {
                        firstName: this.editedItem.firstName,
                        lastName: this.editedItem.lastName,
                        email: this.editedItem.email,
                        roles: this.editedItem.roles
                    };

                    await this.store.update(dataToPost, 0, this.editedItem.id)
                        .then(() => {
                            this.$moshaToast('Dane zostały zaaktualizowane', {
                                hideProgressBar: false,
                                showIcon: true,
                                position: 'bottom-right',
                                type: 'success',
                                transition: 'bounce',
                                swipeClose: true
                            });
                            this.dialog = false;
                            this.isSubmitting = false;
                        })
                        .catch((error) => {
                            console.log(error);
                            this.$moshaToast(error, {
                                hideProgressBar: false,
                                showIcon: true,
                                position: 'bottom-right',
                                type: 'danger',
                                transition: 'bounce',
                                swipeClose: true
                            });
                            this.isSubmitting = false;
                        });

                }
            })
        },
    }
};

</script>

<template>
    <v-dialog v-model="dialog" max-width="500" persistent="true">
        <template v-slot:activator="{ props }">
            <v-btn size="30" icon variant="flat" v-bind="props" class="mx-1 textSecondary">
                <v-avatar size="25">
                    <PencilMinusIcon class="textSecondary" size="20" />
                </v-avatar>
            </v-btn>
        </template>
        <v-card>
            <v-card-title class="pa-4 bg-secondary">
                <span class="title text-white">Edycja danych podstawowych</span>
            </v-card-title>
            <v-form ref="form" v-model="valid" lazy-validation>
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
                                :rules="rules.lastName"
                                :error-messages="errors?.lastName"
                                v-model="editedItem.lastName"
                                label="Nazwisko"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-form>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="error" @click="dialog=false">Anuluj</v-btn>
                <v-btn
                    color="secondary"
                    :disabled="editedItem.email == '' || editedItem.firstName == '' || editedItem.lastName == ''"
                    variant="flat"
                    @click="onSubmit" :loading="isSubmitting"
                >Zapisz
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style scoped lang="scss">

</style>